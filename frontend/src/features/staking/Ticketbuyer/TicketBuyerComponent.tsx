import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Row, Col, Form, InputGroup, Card, Fade, Button, Tab, Nav } from 'react-bootstrap';

import { AccountSelector } from '../../../components/Shared/shared';
import FeeChooserInput from '../FeeChooserInput';
import { AppError, IApplicationState } from '../../../store/types';
import OnOffIndicator from '../../../components/Shared/OnOffIndicator';
import { RunTicketBuyerRequest, RunTicketBuyerResponse } from '../../../proto/api_pb';
import { saveTicketbuyerRequestDefaults, getAppConfig } from '../../appconfiguration/settingsSlice';
import { ErrorAlert } from '../../../components/Shared/FormStatusAlerts';
import { runTicketBuyer, stopTicketBuyer } from '../stakingSlice';
import PassphraseEntryDialog, { askPassphrase } from '../../../components/Shared/PassphraseEntryDialog';
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Ticketbuyer extends React.Component<Props, InternalState> {

	constructor(props: Props) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			formRef: React.createRef(),
			votingTab: "voting_account",
			formIsValidated: false,
			ticketbuyerRequest: props.ticketbuyerRequest,
		}
	}

	componentDidMount() {
		this.setState({
			votingTab: this.determineActiveVotingTab(this.props.ticketbuyerRequest),
			ticketbuyerRequest: this.props.ticketbuyerRequest
		})
	}

	render() {
		const onChange = _.bind(this.handleChange, this)
		const request = this.state.ticketbuyerRequest
		return (
			<div>
				<Card>
					<Card.Header>
						<Row className="mt-3">
							<Col sm={4}>
								<Card.Title>Ticketbuyer</Card.Title>
							</Col>
							<Col sm={4} className="text-center pt-2">
								<OnOffIndicator
									status={this.props.isTicketBuyerRunning}
									onMessage="Ticketbuyer is running"
									offMessage="Ticketbuyer is not running" />
								<ErrorAlert error={this.props.runTicketBuyerError} />
							</Col>
							<Col sm={4}>
								<span className="float-right">
									<Button
										variant="primary"
										disabled={this.props.isTicketBuyerRunning}
										onClick={() => this.startTicketbuyer()}
									><FontAwesomeIcon icon={faPlay} /> Start</Button>
									<Button
										variant="secondary"
										disabled={!this.props.isTicketBuyerRunning}
										onClick={() => this.stopTicketbuyer()}
									><FontAwesomeIcon icon={faStop} /> Stop</Button>
								</span>
							</Col>
						</Row>
					</Card.Header>

					<Card.Body>
						<Form
							ref={this.state.formRef}
							validated={this.state.formIsValidated}
							onSubmit={_.bind(this.handleFormSubmit, this)}
							className={this.props.inProgress ? "in-progress" : ""}>

							<fieldset disabled={this.props.isTicketBuyerRunning || this.props.runTicketBuyerAttempting}>
								<Row className="mb-4">
									<Col sm={6} >
										<Form.Group>
											<Form.Label>Purchase account</Form.Label>
											<AccountSelector
												defaultValue={request.getAccount()}
												name="account"
												tabIndex={1}
												onChange={onChange}
											/>
											<small className="form-text text-muted">
												Tickets will be purchased from this account
											</small>
										</Form.Group>
									</Col>

									<Col sm={5}>
										<Form.Label>Balance to maintain</Form.Label>
										<InputGroup>
											<Form.Control
												autoComplete="off"
												required
												name="balance_to_maintain"
												type="text"
												placeholder="Amount"
												onChange={onChange}
												tabIndex={2}
												defaultValue={request.getBalanceToMaintain()} />
											<InputGroup.Append>
												<InputGroup.Text>DCR</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
									</Col>
								</Row>

								<h5>Voting</h5>

								<Tab.Container
									activeKey={this.state.votingTab}
									onSelect={(tab: string) => this.activateVotingTab(tab)}
									id="ticketbuyer-voting-tabs">

									<Row>
										<Col sm={3}>
											<Nav variant="pills" className="flex-column">
												<Nav.Item>
													<Nav.Link disabled={this.props.isTicketBuyerRunning} eventKey="voting_account">Voting account</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link disabled={this.props.isTicketBuyerRunning} eventKey="voting_address">Voting address</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link disabled={this.props.isTicketBuyerRunning} eventKey="pool">VSP (pool address)</Nav.Link>
												</Nav.Item>
											</Nav>
										</Col>
										<Col sm={9}>
											<Tab.Content>
												<Tab.Pane eventKey="voting_account">
													<Form.Group>
														<AccountSelector
															defaultValue={request.getVotingAccount()}
															name="voting_account"
															tabIndex={3}
															onChange={onChange}
															enableAccountCreate={true}
														/>
														<small className="form-text text-muted">
															The account that will be used for the voting address
														</small>
													</Form.Group>
												</Tab.Pane>

												<Tab.Pane eventKey="voting_address" title="Voting address">
													<Form.Group>
														<Form.Label>Voting address</Form.Label>
														<Form.Control
															autoComplete="off"
															name="voting_address"
															type="text"
															placeholder="Ds....."
															onChange={onChange}
															defaultValue={request.getVotingAddress()} />
													</Form.Group>
												</Tab.Pane>

												<Tab.Pane eventKey="pool" title="VSP (pool address)">
													<Form.Group>
														<Form.Label>Pool address</Form.Label>
														<Form.Control
															autoComplete="off"
															name="pool_address"
															type="text"
															placeholder="Ds....."
															onChange={onChange}
															defaultValue={request.getPoolAddress()} />
													</Form.Group>

													<Form.Group className="mt-5">
														<Form.Label>Pool fees</Form.Label>
														<FeeChooserInput
															value={1}
															defaultValue={request.getPoolFees()}
															onChange={(value: number) => this.onFeeChange(value)}
														/>
													</Form.Group>
												</Tab.Pane>
											</Tab.Content>
										</Col>
									</Row>
								</Tab.Container>

								<div className="text-right mt-5">
									<Button
										disabled={!this.state.isDirty}
										type="submit"
										variant="primary">Save settings</Button>
								</div>
							</fieldset>
						</Form>
					</Card.Body>
				</Card>
				<PassphraseEntryDialog show={false} />
			</div>
		)
	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			formIsValidated: true,
			isDirty: false,
		})
		this.props.saveTicketbuyerRequestDefaults(this.state.ticketbuyerRequest)
		return false;
	}

	startTicketbuyer() {
		const request = this.state.ticketbuyerRequest
		const cancelError = new AppError(0, "Please unlock wallet with your passphrase")

		askPassphrase()
			.then((passphrase) => {
				if (passphrase == "") {
					throw cancelError
				}
				return request.setPassphrase(new Uint8Array(Buffer.from(passphrase)))
			})
			.then((r) => {
				return this.props.runTicketBuyer(request)
			})
			.catch((err) => {
				this.setState({ error: err })
				console.error(err)
				console.log("askPassphrase", request.toObject())
				// debugger
			})
	}

	stopTicketbuyer() {
		this.props.stopTicketBuyer()
	}

	handleChange() {
		this.setState({
			isDirty: true
		})
		if (!this.state.formRef.current.checkValidity()) {
			return
		}
		loadFormFields(this.state.formRef, this.state.ticketbuyerRequest)
	}
	onFeeChange(value: number) {
		this.state.ticketbuyerRequest.setPoolFees(value)
	}
	activateVotingTab(tab: string) {
		const ref = this.state.formRef.current
		switch (tab) {
			case "voting_account":
				ref.pool_address.value = ""
				ref.voting_address.value = ""
				break;
			case "voting_address":
				ref.voting_account.value = ""
				ref.pool_address.value = ""
				break;
			case "pool":
				ref.voting_account.value = ""
				ref.voting_address.value = ""
				break;
		}
		this.setState({
			isDirty: true,
			votingTab: tab
		})
		this.render()
	}
	determineActiveVotingTab(req: RunTicketBuyerRequest): string {
		if (req.getPoolAddress() != "") {
			return "pool"
		}
		if (req.getVotingAddress() != "") {
			return "voting_address"
		}
		return "voting_account"
	}
}


interface InternalState {
	error: AppError | null
	isDirty: boolean
	formRef: React.RefObject<any>
	votingTab: string
	formIsValidated: boolean
	ticketbuyerRequest: RunTicketBuyerRequest
}

interface OwnProps {
	error: AppError | null
	inProgress: boolean
	ticketbuyerRequest: RunTicketBuyerRequest
	runTicketBuyerError: AppError | null
	runTicketBuyerResponse: RunTicketBuyerResponse
	isTicketBuyerRunning: boolean
	runTicketBuyerAttempting: boolean
}



const mapStateToProps = (state: IApplicationState) => {
	const request = getAppConfig(state).getRunAutoBuyerRequestDefaults() || new RunTicketBuyerRequest()
	// console.error("runTicketBuyerError", state.staking.runTicketBuyerError)
	return {
		error: state.appconfiguration.setConfigError,
		inProgress: state.appconfiguration.setConfigAttempting,
		ticketbuyerRequest: request,
		runTicketBuyerResponse: state.staking.runTicketBuyerResponse,
		runTicketBuyerError: state.staking.runTicketBuyerError,
		isTicketBuyerRunning: state.staking.isTicketBuyerRunning,
		runTicketBuyerAttempting: state.staking.runTicketBuyerAttempting,
	}
}

interface DispatchProps {
	runTicketBuyer: typeof runTicketBuyer
	stopTicketBuyer: typeof stopTicketBuyer
	saveTicketbuyerRequestDefaults: typeof saveTicketbuyerRequestDefaults
}

type Props = OwnProps & DispatchProps

const mapDispatchToProps = {
	runTicketBuyer,
	stopTicketBuyer,
	saveTicketbuyerRequestDefaults,
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticketbuyer)


const loadFormFields = (formRef: React.RefObject<any>, obj: RunTicketBuyerRequest) => {
	const f = formRef.current
	obj.setAccount(f.account.value)
	obj.setPoolAddress(f.pool_address.value)
	obj.setVotingAccount(f.voting_account.value)
	obj.setVotingAddress(f.voting_address.value)
	obj.setBalanceToMaintain(f.balance_to_maintain.value)
	obj.setPassphrase("")
	return obj
}
