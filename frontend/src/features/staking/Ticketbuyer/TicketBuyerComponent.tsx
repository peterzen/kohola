import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Row, Col, Form, InputGroup, Card, Fade } from 'react-bootstrap';

import { AccountSelector } from '../../../components/Shared/shared';
import FeeChooserInput from '../FeeChooserInput';
import { AppError, IApplicationState } from '../../../store/types';
import OnOffIndicator from '../../../components/Shared/OnOffIndicator';




class Ticketbuyer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			formRef: React.createRef(),
			formIsValidated: false,
			ticketbuyerRunning: false
		}
	}

	render() {
		const onChange = _.bind(this.handleChange, this)
		return (
			<div>
				<Card>
					<Card.Header>
						<Card.Title>Ticketbuyer</Card.Title>
					</Card.Header>
					<Card.Body>
						<Form
							ref={this.state.formRef}
							validated={this.state.formIsValidated}
							onSubmit={_.bind(this.handleFormSubmit, this)}
							className="m-0">


							<Form.Group as={Row} className="pt-3 pb-3">
								<Col sm={4} >
									<Form.Check
										custom
										type="switch"
										id="ticketbuyer_enabled"
										label="Run tickerbuyer"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											this.toggleTicketbuyer(e.currentTarget.checked)}
									/>
								</Col>
								<Col sm={8}>
									<Fade in={this.state.ticketbuyerRunning}>
										<span><OnOffIndicator status={this.state.ticketbuyerRunning} /> <strong>Ticketbuyer is running</strong></span>
									</Fade>
								</Col>
							</Form.Group>

							<fieldset disabled={this.state.ticketbuyerRunning}>
								<Form.Group as={Row} >
									<Col sm={4}>
										<Form.Label>Purchase account</Form.Label>
									</Col>
									<Col sm={8}>
										<AccountSelector
											value={-1}
											name="account"
											onChange={onChange}
										/>
										<small className="form-text text-muted">
											Tickets will be purchased from this account
									</small>
									</Col>
								</Form.Group>

								<Form.Group as={Row}>
									<Col sm={4}>
										<Form.Label>Balance to maintain</Form.Label>
									</Col>

									<Col sm={6}>
										<InputGroup>
											<Form.Control
												autoComplete="off"
												required
												name="balance_to_maintain"
												type="text"
												placeholder="Amount"
												onChange={onChange}
												defaultValue="" />
											<InputGroup.Append>
												DCR
										</InputGroup.Append>
										</InputGroup>
									</Col>
								</Form.Group>

								<Form.Group as={Row} >
									<Col sm={4}>
										<Form.Label>Voting account</Form.Label>
									</Col>
									<Col sm={8}>
										<AccountSelector
											value={-1}
											name="account"
											onChange={onChange}
										/>
										<small className="form-text text-muted">
											The account that will be used for the voting address
									</small>
									</Col>
								</Form.Group>

								<Form.Group as={Row} >
									<Col sm={4}>
										<Form.Label>Voting address</Form.Label>
									</Col>
									<Col sm={8}>
										<Form.Control
											autoComplete="off"
											required
											name="voting_address"
											type="text"
											placeholder="Ds....."
											onChange={onChange}
											defaultValue="" />
									</Col>
								</Form.Group>

								<Form.Group as={Row} >
									<Col sm={4}>
										<Form.Label>Pool address</Form.Label>
									</Col>
									<Col sm={8}>
										<Form.Control
											autoComplete="off"
											required
											name="pool_address"
											type="text"
											placeholder="Ds....."
											onChange={onChange}
											defaultValue="" />
									</Col>
								</Form.Group>

								<Form.Group as={Row} >
									<Col sm={4}>
										<Form.Label>Pool fees</Form.Label>
									</Col>
									<Col sm={8}>
										<FeeChooserInput
											name="pool_fees"
											defaultValue={40}
											onChange={onChange}
										/>
									</Col>
								</Form.Group>
							</fieldset>
						</Form>
					</Card.Body>
				</Card>
			</div>
		)
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

	toggleTicketbuyer(flag: boolean) {
		this.setState({
			ticketbuyerRunning: flag
		})
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
	ticketbuyerRunning: boolean
}

interface OwnProps {
}

type Props = OwnProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.accounts
	}
}

export default connect(mapStateToProps)(Ticketbuyer)


