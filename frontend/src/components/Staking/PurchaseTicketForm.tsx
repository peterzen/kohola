import * as React from 'react';
import _ from 'lodash';

import { Row, Col, Form, Button, Card, InputGroup, Alert } from 'react-bootstrap';
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
import { Ticket, WalletAccount, IndexedWalletAccounts, WalletBalance } from '../../models';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import { getAccounts } from '../../store/accounts/selectors';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { PurchaseTicketsRequest } from '../../proto/api_pb';
import { purchaseTicketAttempt } from '../../store/staking/actions';
import PassphraseEntryDialog, { askPassphrase } from '../Shared/PassphraseEntryDialog';
import { accountHasEnoughFunds } from '../../store/accounts/actions';
import { getWalletBalances } from '../../store/walletbalance/selectors';


/*
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
const AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input ref={node => (input = node)} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}
export default connect()(AddTodo)
*/

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
							</Col>
							<Col sm={8}>
								<AccountSelector
									defaultValue={1}
									name="account_select"
									onChange={_.bind(this.handleAccountChange, this)}
									balances={this.props.balances} />
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
									<Button variant="outline-secondary"
										onClick={_.bind(this.handleNumTixDown, this)}>
										<FontAwesomeIcon icon={faMinus} />
									</Button>
								</InputGroup.Prepend>
								<Form.Control
									required
									name="num_tickets"
									type="number"
									className="ml-3 mr-3"
									tabIndex={-1}
									onChange={_.bind(this.handleChange, this)}
									defaultValue="1" />
								<InputGroup.Append>
									<Button
										variant="outline-secondary"
										onClick={_.bind(this.handleNumTixUp, this)}
									><FontAwesomeIcon icon={faPlus} />
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
									title="fee rate"
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
					<PassphraseEntryDialog show={false} />
				</Card.Body>
				<Card.Footer className="text-right">
					{this.props.error != null && (
						<Alert variant="danger">{this.props.error.message}</Alert>
					)}

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

	handleNumTixDown() {
		this.state.formRef.current.num_tickets.stepDown()
		return true
	}
	handleNumTixUp() {
		this.state.formRef.current.num_tickets.stepUp()
		return true
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
		const cancelError = new Error()
		askPassphrase()
			.then((passphrase) => {
				if (passphrase == "") {
					throw cancelError
				}
				return request.setPassphrase(new Uint8Array(Buffer.from(passphrase)))
			})
			.then((r) => {
				// debugger
				console.log("askPassphrase", request.toObject())
				return this.props.purchaseTicketAttempt(request)
				// debugger
			})
			.then((r) => {
				// this.setState({ error: err })
				console.log("response", r)
			})
			.catch((err) => {
				this.setState({ error: err })
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

	handleAccountChange() {
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
	r.setAccount(f.account_select.value)
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
		error: state.staking.errorPurchaseTickets,
		// txInfo: state.transactions.txInfo,
		// errorSignTransaction: state.transactions.errorSignTransaction,
		// errorPublishTransaction: state.transactions.errorPublishTransaction,
		// errorConstructTransaction: state.transactions.errorConstructTransaction,
		// signTransactionResponse: state.transactions.signTransactionResponse,
		// publishTransactionResponse: state.transactions.publishTransactionResponse,
		// constructTransactionRequest: state.transactions.constructTransactionRequest,
		// constructTransactionResponse: state.transactions.constructTransactionResponse,
		// currentStep: state.transactions.sendTransactionCurrentStep,
		balances: getWalletBalances(state)
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
	error: AppError | null,
	// currentStep: SendTransactionSteps
	balances: WalletBalance
}



interface DispatchProps {
	// cancelSign(): any,
	purchaseTicketAttempt(...arguments: any): Promise<any>
}

type Props = DispatchProps & OwnProps & IPurchaseTicketFormProps



interface InternalState {
}

interface IPurchaseTicketFormProps {
	title: string
	error: AppError | null
	hasEnoughFunds: (account: WalletAccount, amount: number) => boolean
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
	hasEnoughFunds: accountHasEnoughFunds,
	purchaseTicketAttempt: purchaseTicketAttempt,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTicketForm);
