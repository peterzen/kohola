import * as React from 'react';
import _ from 'lodash';

import { Row, Col, Form, Button, Card } from 'react-bootstrap';
import { RPCEndpoint, GRPCEndpoint } from '../../proto/dcrwalletgui_pb';
import { PasteButton, InfoTooltip } from '../Shared/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faExclamationTriangle,
	faCircleNotch,
	faCheck
} from '@fortawesome/free-solid-svg-icons'
import { AppError } from '../../store/types';
import { sprintf } from 'sprintf-js';
import LorcaBackend from '../../datasources/lorca';

const placeHolderCert = `-----BEGIN CERTIFICATE-----
MIICRTCCAaegAwIBAgIRAMVLEv8v0Ji22D2hebnX7w
MB4GA1UEChMXZGNyZCBhdXRvZ2VuZXJhdGVkIGNlcn
HhcNMTkxMjA1MTcxNzEwWhcNMjkxMjAzMTcxNzEwWj
...............................`



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


interface IRPCFormProps {
	title: string
	error: AppError | null
	endPointConfig: RPCEndpoint | GRPCEndpoint
	onFormComplete: () => void
}

interface IRPCFormState {
	connectionCheckStatus: ConnectionCheckState
	connectionCheckMessage: string
	formRef: React.RefObject<any>
	error: AppError | null
	formIsValidated: boolean
	isDirty: boolean
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
			connectionCheckMessage: ""
		}
	}
	render() {
		const endPoint = this.props.endPointConfig
		const onChange = _.bind(this.handleChange, this)
		return (
			<Card>
				<Card.Body>
					<Card.Title>{this.props.title}</Card.Title>
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
								onChange={onChange}
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
										variant="outline-secondary"
										size="sm"
										onClick={_.bind(this.browseFile, this)}>Browse...</Button>
								</Col>
								<Col sm={9}>
									<Form.Control
										required
										name="cert_file_name"
										tabIndex={-1}
										size="sm"
										defaultValue={endPoint.getCertFileName()} />
								</Col>
							</Row>
							{/* <Form.Control
								name="cert_blob"
								as="textarea"
								rows={6}
								placeholder={placeHolderCert}
								onChange={onChange}
								defaultValue={endPoint.getCertBlob()}
								className="mt-3"
							/>
							<div className="text-right">
								<PasteButton
									className="pastebutton-overlaid"
									tabIndex={-1} />
							</div>
							<div>
								<small className="form-text text-muted">
									Either select your cert file  or paste the blob into this field.  It will be saved in the configuration in encrypted form.
								</small>
							</div> */}
						</Form.Group>

						<Row>
							<Col sm={9}>
								<ConnectionCheck
									status={this.state.connectionCheckStatus}
									message={this.state.connectionCheckMessage} />
							</Col>
							<Col sm={3} className="text-right">
								<Button
									disabled={!this.state.isDirty}
									type="submit"
									variant="outline-primary">Save
						</Button>
							</Col>
						</Row>
					</Form>

				</Card.Body>
			</Card>

		)
	}

	browseFile() {
		const w = (window as any)
		w.walletgui_FileOpenDialog()
			.then((file: string) => {
				console.log("FILE", file)
				this.state.formRef.current.cert_file_name.value = file
				this.handleChange()
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
		console.log("formSubmit", this.props.endPointConfig.toObject())
		this.props.onFormComplete()

		return false;
	}

	handleChange() {
		console.log("handleChange")
		const ep = this.props.endPointConfig
		this.setState({
			isDirty: true
		})
		if (!this.state.formRef.current.checkValidity()) {
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
}

const generateEndpointLabel = (endpoint: GRPCEndpoint | RPCEndpoint) => {
	const networks = {
		0: 'MAINNET',
		1: 'TESTNET',
		2: 'SIMNET'
	}
	return sprintf(
		"%s:%d (%s)",
		endpoint.getHostname(),
		endpoint.getPort(),
		networks[endpoint.getNetwork()]
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
	ep.setLabel(generateEndpointLabel(ep))
}

const checkEndpointFn = _.debounce(async (formRef, endpoint, onComplete) => {
	const tmpEndpointCfg = endpoint.clone()
	loadFormFields(formRef, tmpEndpointCfg)
	const r = await LorcaBackend.checkGRPCEndpointConnection(tmpEndpointCfg)
	onComplete(r)
}, 1000)