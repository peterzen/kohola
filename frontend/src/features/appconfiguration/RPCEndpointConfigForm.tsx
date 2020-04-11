import * as React from 'react';
import _ from 'lodash';
import { sprintf } from 'sprintf-js';

import { Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faExclamationTriangle,
	faCircleNotch,
	faCheck
} from '@fortawesome/free-solid-svg-icons'

import { AppError } from '../../store/types';
import LorcaBackend from '../../middleware/lorca';
import GenericModal, { GenericModalProps } from '../../components/Shared/GenericModal';
import { RPCEndpoint, GRPCEndpoint } from '../../proto/walletgui_pb';
import { Networks } from '../../constants';
import { PasteButton } from '../../components/Shared/shared';

export const NetworkSelector = (props: { name: string, defaultValue: number, onChange: any }) => {
	return (
		<Form.Control
			name={props.name}
			defaultValue={props.defaultValue.toString()}
			onChange={props.onChange}
			as="select">
			<option value="0">MAINNET</option>
			<option value="1">TESTNET</option>
			<option value="2">SIMNET</option>
		</Form.Control>
	)
}

enum ConnectionCheckState {
	NONE,
	CHECKING,
	SUCCESS,
	FAILED,
}

const ConnectionCheck = (props: { status: ConnectionCheckState, message?: string }) => {
	let icon
	let msg
	let classN
	switch (props.status) {
		case ConnectionCheckState.CHECKING:
			icon = faCircleNotch
			msg = "Checking..."
			classN = "text-dark fa-spin"
			break;
		case ConnectionCheckState.SUCCESS:
			icon = faCheck
			msg = "Connection successful"
			classN = "text-success"
			break;
		case ConnectionCheckState.FAILED:
			icon = faExclamationTriangle
			msg = props.message || ""
			classN = "text-danger"
			break;
		default:
			return null
	}
	return (
		<div>
			<small className={classN}>{msg}</small>&nbsp;
			<FontAwesomeIcon icon={icon} className={classN} size="xs" />
		</div>
	)
}



export default class RPCEndpointConfigForm extends React.Component<IRPCFormProps, IRPCFormState> {
	constructor(props: IRPCFormProps) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			formRef: React.createRef(),
			formIsValidated: false,
			connectionCheckStatus: ConnectionCheckState.NONE,
			connectionCheckMessage: "",
			certBlob: this.props.endPointConfig.getCertBlob(),
			certFileName: this.props.endPointConfig.getCertFileName()
		}
	}
	render() {
		const endPoint = this.props.endPointConfig
		const onChange = _.bind(this.handleChange, this)
		return (
			<Form
				ref={this.state.formRef}
				validated={this.state.formIsValidated && !this.props.error}
				onSubmit={_.bind(this.handleFormSubmit, this)}
				className="m-0"
			>
				<Form.Group>
					{/* <Form.Label>Network</Form.Label> */}
					<NetworkSelector
						name="network"
						onChange={_.bind(this.onNetworkChange, this)}
						defaultValue={endPoint.getNetwork()} />
				</Form.Group>
				<Form.Group as={Row}>
					<Col sm={9}>
						<Form.Control
							autoComplete="off"
							required
							type="text"
							name="hostname"
							placeholder="Hostname or IP"
							onChange={onChange}
							defaultValue={endPoint.getHostname()} />
					</Col>
					<Col sm={3}>
						<Form.Control
							autoComplete="off"
							required
							name="port"
							type="text"
							placeholder="Port"
							onChange={onChange}
							defaultValue={endPoint.getPort().toString()} />
					</Col>
				</Form.Group>
				{(endPoint instanceof RPCEndpoint) && (
					<div>
						<Form.Group>
							{/* <Form.Label>Username</Form.Label> */}
							<Form.Control
								autoComplete="off"
								required
								name="username"
								placeholder="RPC username"
								onChange={onChange}
								defaultValue={endPoint.getUsername()} />
						</Form.Group>
						<Form.Group>
							{/* <Form.Label >Password</Form.Label> */}
							<Form.Control
								autoComplete="off"
								required
								name="password"
								type="password"
								placeholder="RPC password"
								onChange={onChange}
								defaultValue={endPoint.getPassword()} />
						</Form.Group>
					</div>
				)}

				<Form.Group className="certificate-input">
					<Form.Label>Client certificate</Form.Label>
					<Row>
						<Col sm={3}>
							<Button
								variant="secondary"
								size="sm"
								onClick={_.bind(this.browseFile, this)}>Browse...</Button>
						</Col>
						<Col sm={9}>
							<Form.Control
								autoComplete="false"
								name="cert_file_name"
								tabIndex={-1}
								size="sm"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleCertFileChange(e.currentTarget.value)}
								value={this.state.certFileName} />
						</Col>
					</Row>
					<Form.Control
						name="cert_blob"
						as="textarea"
						rows={6}
						placeholder="Paste the certificate content"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleCertBlobChange(e.currentTarget.value)}
						value={this.state.certBlob}
						className="mt-3"
					/>
					<div className="text-right">
						<PasteButton
							onClick={_.bind(this.onPasteBlob, this)}
							className="pastebutton-overlaid"
						/>
					</div>
					<div>
						<small className="form-text text-muted">
							Either select your cert file  or paste the blob into this field.  It will be saved in the configuration in encrypted form.
						</small>
					</div>
				</Form.Group>

				<Form.Group controlId="default-checkbox">
					<Form.Check
						name="default_checkbox"
						label="Default"
						disabled={true}
						title="Not implemented"
						onChange={onChange}
					/>
				</Form.Group>

				<div style={{ height: "2em" }}>
					<ConnectionCheck
						status={this.state.connectionCheckStatus}
						message={this.state.connectionCheckMessage} />
				</div>

				<div className="text-right">
					<Button variant="secondary"
						onClick={this.props.onCancel}>Cancel
					</Button>
					<Button
						disabled={!this.state.isDirty}
						type="submit"
						variant="primary">Save
					</Button>
				</div>
			</Form>
		)
	}

	onPasteBlob() {
		navigator.clipboard.readText()
			.then((text: string) => {
				this.setState({ certBlob: text }, () => {
					this.handleChange()
				});
			});
	}

	browseFile() {
		const w = (window as any)
		w.walletgui_FileOpenDialog()
			.then((file: string) => {
				this.setState({
					certFileName: file
				}, () => this.handleCertFileChange(file))
				// endPoint.setCertFileName(file)
			})
	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			formIsValidated: true,
			isDirty: false,
		})
		loadFormFields(this.state.formRef, this.props.endPointConfig)
		this.props.onFormComplete(this.props.endPointConfig)
		return false;
	}

	handleCertFileChange(certFileName: string) {
		this.setState({
			certFileName: certFileName
		})
		fetchCertBlob(certFileName, _.bind((r) => {
			this.setState({
				certBlob: r.error ? "" : r.spayload
			}, () => this.handleChange())
		}, this))
	}

	handleCertBlobChange(certBlob: string) {
		this.setState({
			certBlob: certBlob
		}, () => this.handleChange())
	}

	handleChange() {
		const ep = this.props.endPointConfig
		this.setState({
			isDirty: true
		})

		if (!this.state.formRef.current.checkValidity() ||
			(this.state.certBlob == "" && this.state.certFileName == "")) {
			this.setState({
				connectionCheckStatus: ConnectionCheckState.NONE,
				connectionCheckMessage: ""
			})
			return
		}
		this.setState({
			connectionCheckStatus: ConnectionCheckState.CHECKING
		})
		checkEndpointFn(this.state.formRef, ep, _.bind((r) => {
			this.setState({
				connectionCheckStatus: r.error ? ConnectionCheckState.FAILED : ConnectionCheckState.SUCCESS,
				connectionCheckMessage: r.error
			})
		}, this))
	}

	onNetworkChange(e: React.ChangeEvent<HTMLInputElement>) {
		const portInput = this.state.formRef.current.port
		switch (parseInt(e.currentTarget.value)) {
			case Networks.MAINNET:
				portInput.value = 9111
				break;
			case Networks.TESTNET:
				portInput.value = 19111
				break;
			case Networks.SIMNET:
				portInput.value = 19558
				break;
		}
		this.handleChange()
	}
}

export class EditEndpointModal extends React.Component<GenericModalProps & IRPCFormProps, IRPCFormState>{
	render() {
		return (
			<GenericModal
				title={this.props.title}
				show={this.props.show}
				onHide={this.props.onHide}
			>
				<RPCEndpointConfigForm {...this.props} />
			</GenericModal>
		)
	}
}

const generateEndpointLabel = (endpoint: GRPCEndpoint | RPCEndpoint) => {
	return sprintf(
		"%s:%d",
		endpoint.getHostname(),
		endpoint.getPort()
	)
}

const loadFormFields = (formRef: React.RefObject<any>, ep: GRPCEndpoint | RPCEndpoint) => {
	const f = formRef.current
	if (ep instanceof RPCEndpoint) {
		ep.setUsername(f.username.value)
		ep.setPassword(f.password.value)
	}
	ep.setHostname(f.hostname.value)
	ep.setPort(f.port.value)
	ep.setNetwork(f.network.value)
	ep.setCertFileName(f.cert_file_name.value)
	ep.setCertBlob(f.cert_blob.value)
	ep.setLabel(generateEndpointLabel(ep))
}

const checkEndpointFn = _.debounce(async (formRef, endpoint, onComplete) => {
	const tmpEndpointCfg = endpoint.clone()
	loadFormFields(formRef, tmpEndpointCfg)
	const r = await LorcaBackend.checkGRPCEndpointConnection(tmpEndpointCfg)
	onComplete(r)
}, 1000)

const fetchCertBlob = async (certFileName: string, onComplete: (r: any) => void) => {
	const r = await LorcaBackend.fetchCertBlob(certFileName)
	onComplete(r)
}

interface IRPCFormProps {
	title: string
	error: AppError | null
	endPointConfig: RPCEndpoint | GRPCEndpoint
	onCancel: () => void
	onFormComplete: (endpoint: GRPCEndpoint | RPCEndpoint) => void
}

interface IRPCFormState {
	connectionCheckStatus: ConnectionCheckState
	connectionCheckMessage: string
	formRef: React.RefObject<any>
	error: AppError | null
	formIsValidated: boolean
	isDirty: boolean
	certBlob: string
	certFileName: string
}
