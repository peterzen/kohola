import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Spinner, Row, Col, Form, InputGroup, Modal, Button, Tabs, Tab, Card } from 'react-bootstrap';

import { AccountSelector } from '../../components/Shared/shared';
import { AppError, IApplicationState } from '../../store/types';





class MixerSettingsForm extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			formRef: React.createRef(),
			formIsValidated: false,
			mixerRunning:false
		}
	}

	render() {
		const onChange = _.bind(this.handleChange, this)
		return (
			<div>
				<Form
					ref={this.state.formRef}
					validated={this.state.formIsValidated}
					onSubmit={_.bind(this.handleFormSubmit, this)}
					className="m-0">

					<Form.Group >
						<div className="p-2">
							<Form.Check
								custom
								type="switch"
								id="mixer_enabled"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									this.toggleMixer(e.currentTarget.checked)}
								label="Run mixer"
							/>
						</div>
					</Form.Group>

					<fieldset disabled={this.state.mixerRunning}>
						<Form.Group as={Row} className="p-2">
							<Col sm={4}>
								<Form.Label>Mixed account</Form.Label>
							</Col>
							<Col xs={5}>
								<AccountSelector
									value={-1}
									name="mixed_account"
									onChange={onChange}
								/>
								<small className="form-text text-muted">
									The account where the mixed funds should end up
								</small>
							</Col>
							<Col xs={3}>
								<Form.Control
									tabIndex={0}
									name="mixed_account_branch"
									defaultValue="1"
									onChange={onChange}
									as="select">
									{_.map([0, 1], (n) => <option key={n} value={n}>{n}</option>)}
								</Form.Control>
								<small className="form-text text-muted">Branch</small>
							</Col>
						</Form.Group>


						<Form.Group as={Row} className="p-2">
							<Col sm={4}>
								<Form.Label>Change account</Form.Label>
							</Col>
							<Col xs={5}>
								<AccountSelector
									value={-1}
									name="change_account"
									onChange={onChange}
								/>
								<small className="form-text text-muted">
									The account that will be used for any unmixed change that is waiting to be mixed.
								</small>
							</Col>

						</Form.Group>

						<Form.Group as={Row}>
						<Col sm={4}>
								<Form.Label>CSPP server</Form.Label>
							</Col>
							<Col sm={5}>
								<Form.Control
									autoComplete="off"
									required
									type="text"
									name="cspp_server_host"
									placeholder="Hostname or IP"
									onChange={onChange}
									defaultValue="" />
							</Col>
							<Col sm={3}>
								<Form.Control
									autoComplete="off"
									required
									name="cspp_server_port"
									type="text"
									placeholder="Port"
									onChange={onChange}
									defaultValue="" />
							</Col>
						</Form.Group>
					</fieldset>
				</Form>
			</div>
		)
	}

	toggleMixer(flag: boolean) {
		this.setState({
			mixerRunning:flag
		})
	}

	onChange() {

	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			formIsValidated: true,
			isDirty: false,
		})
		// loadFormFields(this.state.formRef, this.props.endPointConfig)
		// this.props.onFormComplete(this.props.endPointConfig)
		return false;
	}

	handleChange() {
		this.setState({
			isDirty: true
		})
		if (!this.state.formRef.current.checkValidity()) {
			return
		}
	}
}




interface InternalState {
	formRef: React.RefObject<any>
	error: AppError | null
	formIsValidated: boolean
	isDirty: boolean

	mixerRunning:boolean
}

interface OwnProps {
}

type Props = OwnProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.accounts
	}
}

export default connect(mapStateToProps)(MixerSettingsForm)


