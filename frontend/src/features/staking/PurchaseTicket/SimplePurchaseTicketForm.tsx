import * as React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { AccountSelector, Amount } from '../../../components/Shared/shared';
import { TxConfirmationPanel } from "../../../components/Shared/TxConfirmationPanel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faPlus, faMinus,
} from '@fortawesome/free-solid-svg-icons'
import { IApplicationState } from '../../../store/store';
import { WalletBalance, TicketPrice } from '../../../models';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { PurchaseTicketsRequest, PurchaseTicketsResponse } from '../../../proto/api_pb';
import PassphraseEntryDialog, { askPassphrase } from '../../../components/Shared/PassphraseEntryDialog';
import { getWalletBalances } from '../../walletbalance/selectors';

import { AppError } from '../../../store/types';
import { purchaseTicket, getTicketPrice } from '../stakingSlice';
import { Row, Col, Form, Button, Card, InputGroup, Alert, FormControl } from 'react-bootstrap';

interface IIntegerInputControlProps {
	name: string,
	max: number,
	onChange: () => void
}

export const IntegerInputControl = (props: IIntegerInputControlProps) => {

	let ref: FormControl<"input"> | null
	const t = () => ref

	const stepDown = (e: any) => {
		t().value > 0 && t().stepDown();
		props.onChange()
	}
	const stepUp = (e: any) => {
		t().value < props.max && t().stepUp();
		props.onChange()
	}

	return (
		<>
			<InputGroup {...props} >
				<InputGroup.Prepend>
					<Button variant="outline-secondary"
						tabIndex={-1}
						onClick={stepDown}>
						<FontAwesomeIcon icon={faMinus} />
					</Button>
				</InputGroup.Prepend>
				<Form.Control
					name={props.name}
					type="number"
					size="lg"
					ref={(rr: any) => { ref = rr }}
					{...props}
				/>
				<InputGroup.Append>
					<Button
						tabIndex={-1}
						variant="outline-secondary"
						onClick={stepUp}
					><FontAwesomeIcon icon={faPlus} />
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</>
	)
}

class PurchaseTicketForm extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			buyingPower: 0,
			remainingBalance: -1,
			formRef: React.createRef(),
			formIsValidated: false,
			purchaseTicketRequest: new PurchaseTicketsRequest(),
		}
	}

	render() {

		const showForm = this.props.purchaseTicketResponse == undefined
		const showConfirmation = !showForm

		return (
			<Card >
				<Card.Body>
					<Card.Title>Purchase tickets</Card.Title>
					{showForm &&
						<Form
							ref={this.state.formRef}
							validated={this.state.formIsValidated && !this.props.error}
							onSubmit={_.bind(this.handleFormSubmit, this)}
							className="m-0"
						>
							<Row>
								<Col>
									<div className="text-right">
										<h4>
											<small>Current price:</small> <Amount amount={this.props.ticketPrice.getTicketPrice()} showCurrency />
										</h4>
									</div>
								</Col>
							</Row>
							<Form.Group >
								<AccountSelector
									value={-1}
									name="account_select"
									onChange={_.bind(this.handleChange, this)}
								/>
							</Form.Group>
							<Form.Group as={Row}>
								<Col sm={8}>
									<IntegerInputControl
										className="ml-3 mr-3"
										placeholder="# of tix"
										name="num_tickets"
										max={this.state.buyingPower}
										onChange={_.bind(this.handleChange, this)}
									/>
									<br />

									Remaining balance: <Amount amount={this.state.remainingBalance} />

								</Col>
								<Col>
									Buying power: {this.state.buyingPower}<br />
								</Col>
							</Form.Group>

							<Row>
								<Col sm={4}>
								</Col>
								<Col>
								</Col>
							</Row>

							{/* <Form.Group as={Row} className="p-2">
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
						</Form.Group> */}
						</Form>}
					{showConfirmation && this.props.purchaseTicketResponse != null &&
						<TxConfirmationPanel hashes={this.props.purchaseTicketResponse.getTicketHashesList_asU8()} />
					}
					<PassphraseEntryDialog show={false} />
				</Card.Body>
				<Card.Footer className="text-right">
					{this.props.error != null && (
						<Alert variant="danger">{this.props.error}</Alert>
					)}

					{showForm &&
						<Button
							type="submit"
							disabled={!this.state.formIsValidated}
							onClick={_.bind(this.handleFormSubmit, this)}
							variant="outline-primary">
							Purchase
						</Button>
					}
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
		const cancelError = new Error()
		askPassphrase()
			.then((passphrase) => {
				if (passphrase == "") {
					throw cancelError
				}
				return request.setPassphrase(new Uint8Array(Buffer.from(passphrase)))
			})
			.then((r) => {
				console.log("askPassphrase", request.toObject())
				return this.props.purchaseTicket(request)
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
		return false;
	}

	handleChange(e: any) {
		const f = this.state.formRef.current
		this.setState({
			formIsValidated: !(f.num_tickets.value < 1 || f.account_select.value < 0)
		})
		loadFormFields(this.state.formRef, this.state.purchaseTicketRequest)
		this.getEstimate()
		console.log("loadfFormFields", this.state.purchaseTicketRequest.toObject())
	}

	getEstimate() {
		const s = this.state
		const f = this.state.formRef.current
		const ticketPrice = this.props.ticketPrice.getTicketPrice()
		const req = this.state.purchaseTicketRequest
		const accountSpendableBalance = req.getAccount() > -1 ? this.props.balances[req.getAccount()].getSpendable() : 0
		const buyingPower = req.getAccount() > -1 ? Math.floor(accountSpendableBalance / ticketPrice) : 0
		this.setState({
			buyingPower: buyingPower,
			remainingBalance: accountSpendableBalance - (f.num_tickets.value * ticketPrice)  // what about fees?
		})
	}

}


const loadFormFields = (formRef: React.RefObject<any>, r: PurchaseTicketsRequest) => {
	const f = formRef.current
	r.setNumTickets(parseInt(f.num_tickets.value))
	r.setAccount(parseInt(f.account_select.value))
	r.setRequiredConfirmations(1)
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		...state.staking,
		error: state.staking.errorPurchaseTickets,
		purchaseTicketResponse: state.staking.purchaseTicketResponse,
		balances: getWalletBalances(state),
		ticketPrice: getTicketPrice(state),
	};
}

interface OwnProps {
	error: AppError | null
	balances: WalletBalance
	ticketPrice: TicketPrice
	purchaseTicketResponse: PurchaseTicketsResponse | null
}


interface DispatchProps {
	purchaseTicket(...arguments: any): void
}

type Props = DispatchProps & OwnProps & IPurchaseTicketFormProps


interface IPurchaseTicketFormProps {
	error: AppError | null
}

interface InternalState {
	formRef: React.RefObject<any>
	error: AppError | null
	formIsValidated: boolean
	buyingPower: number
	remainingBalance: number
	isDirty: boolean
	purchaseTicketRequest: PurchaseTicketsRequest
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	purchaseTicket: purchaseTicket,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTicketForm);
