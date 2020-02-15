import * as React from 'react';
import _ from 'lodash';

import { Row, Col, Form, Button, Card, InputGroup } from 'react-bootstrap';
import { PasteButton, InfoTooltip, AccountSelector } from '../Shared/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faExclamationTriangle,
	faPlus, faMinus,
	faCircleNotch,
	faCheck
} from '@fortawesome/free-solid-svg-icons'
import { AppError, IApplicationState } from '../../store/types';
import { sprintf } from 'sprintf-js';
import LorcaBackend from '../../datasources/lorca';
import { Ticket, WalletAccount, IndexedWalletAccounts } from '../../models';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { getAccounts } from '../../store/accounts/selectors';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { PurchaseTicketsRequest } from '../../proto/api_pb';
import { purchaseTicketAttempt } from '../../store/staking/actions';
import PassphraseEntryDialog, { askPassphrase } from '../Shared/PassphraseEntryDialog';




class PurchaseTicketForm extends React.Component<Props, InternalState> {
	constructor(props) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			formRef: React.createRef(),
			formIsValidated: false,
			purchaseTicketRequest: new PurchaseTicketsRequest(),
		}
		console.log("###PROPZ", this.props)
	}
	render() {
		const onChange = _.bind(this.handleChange, this)
		return (
			<Card >
				<Card.Body>
					<Card.Title>Purchase tickets</Card.Title>
					<Form
						ref={this.state.formRef}
						validated={this.state.formIsValidated && !this.props.error}
						onSubmit={_.bind(this.handleFormSubmit, this)}
						className="m-0"
					>
						<Form.Group as={Row}>
							<Col sm={4}>
								<Form.Label>From account</Form.Label>

								{/* <Form.Control
									autoComplete="off"
									required
									name="port"
									type="text"
									placeholder="Port"
									onChange={onChange}
								// defaultValue={endPoint.getPort().toString()}
								/> */}
							</Col>
							<Col sm={8}>
								<AccountSelector
									value={1}
									onChange={_.bind(this.handleChange, this)}
									accounts={this.props.accounts} />
							</Col>
						</Form.Group>
						<Form.Group as={Row}>
							<Col sm={4}>
								<Form.Label >
									# of tickets
								</Form.Label>
							</Col>
							<InputGroup as={Col} sm={6}>
								<InputGroup.Prepend>
									<Button variant="outline-secondary" >
										<FontAwesomeIcon icon={faMinus} />
									</Button>
								</InputGroup.Prepend>
								<Form.Control
									required
									name="num_tickets"
									type="number"
									className="ml-3 mr-3"
									tabIndex={-1}
									defaultValue="1" />
								<InputGroup.Append>
									<Button variant="outline-secondary" >
										<FontAwesomeIcon icon={faPlus} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</Form.Group>

						<Form.Group as={Row} className="p-2">
							<Col sm={4}>
								<Form.Label>Fee</Form.Label>
							</Col>
							<InputGroup as={Col} sm={4}>
								<RangeSlider
									variant="secondary"
									tooltip="off"
									size="sm"
									defaultValue={50}
									className="pr-3"
									title="b lah"
								// onChange={changeEvent => console.log(changeEvent.target.value)}
								/>
								<InputGroup.Append>
								</InputGroup.Append>
							</InputGroup>
							<Col sm={4}>
								40 atoms/B
							</Col>
						</Form.Group>
					</Form>
					<PassphraseEntryDialog show={false}/>
				</Card.Body>
				<Card.Footer className="text-right">
					<Button
						type="submit"
						onClick={_.bind(this.handleFormSubmit, this)}
						variant="outline-primary">
						Purchase
						</Button>
				</Card.Footer>
			</Card >
		)
	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			formIsValidated: true,
			isDirty: false,
		})
		const request = new PurchaseTicketsRequest()
		loadFormFields(this.state.formRef, request)
		this.setState({
			purchaseTicketRequest: request
		})
		console.log("formSubmit", request.toObject())
		askPassphrase()
			.then((passphrase) => {
				return request.setPassphrase(new Uint8Array(Buffer.from(passphrase)))
			})
			.then((r) => {
				// debugger
				console.log("askPassphrase", request.toObject())
				this.props.purchaseTicketAttempt(request)
			})
			.catch((err) => {
				console.error(err)
				console.log("askPassphrase", request.toObject())
				// debugger
			})
		// this.props.onFormComplete()

		return false;
	}

	handleChange() {
		console.log("handleChange")
		// const ep = this.props.purchaseTicketRequest
		// this.setState({
		// 	isDirty: true
		// })
		if (!this.state.formRef.current.checkValidity()) {
			return
		}
		// this.setState({
		// 	connectionCheckStatus: ConnectionCheckState.CHECKING
		// })
		// checkEndpointFn(this.state.formRef, ep, _.bind((r) => {
		// 	this.setState({
		// 		connectionCheckStatus: r.error ? ConnectionCheckState.FAILED : ConnectionCheckState.SUCCESS,
		// 		connectionCheckMessage: r.error
		// 	})
		// }, this))
	}
}



const loadFormFields = (formRef: React.RefObject<any>, r: PurchaseTicketsRequest) => {
	const f = formRef.current
	r.setNumTickets(f.num_tickets.value)
	r.setRequiredConfirmations(1)
	// if (ep instanceof RPCEndpoint) {
	// 	ep.setUsername(f.username.value)
	// 	ep.setPassword(f.password.value)
	// }
	// ep.setHostname(f.hostname.value)
	// ep.setPort(f.port.value)
	// ep.setNetwork(f.network.value)
	// ep.setCertFileName(f.cert_file_name.value)
	// ep.setLabel(generateEndpointLabel(ep))
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		...state.staking,
		// txInfo: state.transactions.txInfo,
		// errorSignTransaction: state.transactions.errorSignTransaction,
		// errorPublishTransaction: state.transactions.errorPublishTransaction,
		// errorConstructTransaction: state.transactions.errorConstructTransaction,
		// signTransactionResponse: state.transactions.signTransactionResponse,
		// publishTransactionResponse: state.transactions.publishTransactionResponse,
		// constructTransactionRequest: state.transactions.constructTransactionRequest,
		// constructTransactionResponse: state.transactions.constructTransactionResponse,
		// currentStep: state.transactions.sendTransactionCurrentStep,
		accounts: getAccounts(state),
	};
}

interface OwnProps {
	// txInfo: HumanreadableTxInfo,
	// constructTransactionRequest: ConstructTransactionRequest | null,
	// constructTransactionResponse: ConstructTransactionResponse | null
	// signTransactionResponse: SignTransactionResponse | null,
	// publishTransactionResponse: PublishTransactionResponse | null,
	// errorConstructTransaction: AppError | null
	// errorSignTransaction: AppError | null,
	// errorPublishTransaction: AppError | null,
	// currentStep: SendTransactionSteps
	accounts: IndexedWalletAccounts
}



interface DispatchProps {
	// cancelSign(): any,
	purchaseTicketAttempt(...arguments: any): Promise<any>
	// constructTransactionAttempt(...arguments: any): Promise<any>
	// signTransactionAttempt(...arguments: any): Promise<any>purchaseTicketRequest
	// publishTransactionAttempt(...arguments: any): Promise<any>
}

type Props = DispatchProps & OwnProps & IPurchaseTicketFormProps



interface InternalState {
}

interface IPurchaseTicketFormProps {
	title: string
	error: AppError | null
	accounts: WalletAccount[]
	// onFormComplete: () => void
}

interface InternalState {
	formRef: React.RefObject<any>
	error: AppError | null
	formIsValidated: boolean
	isDirty: boolean
	purchaseTicketRequest: PurchaseTicketsRequest
}



const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	purchaseTicketAttempt: purchaseTicketAttempt,
	// constructTransactionAttempt: constructTransactionAttempt,
	// signTransactionAttempt: signTransactionAttempt,
	// publishTransactionAttempt: publishTransactionAttempt,
	// cancelSign: cancelSignTransaction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTicketForm);
