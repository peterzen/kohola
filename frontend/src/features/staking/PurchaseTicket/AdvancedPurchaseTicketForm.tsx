import * as React from 'react';
import _ from 'lodash';

import { AccountSelector } from '../../../components/Shared/shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faPlus, faMinus,
} from '@fortawesome/free-solid-svg-icons'
import { WalletBalance } from '../../../models';

import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { PurchaseTicketsRequest } from '../../../proto/api_pb';
import PassphraseEntryDialog, { askPassphrase } from '../../../components/Shared/PassphraseEntryDialog';
import { getWalletBalances } from '../../walletbalance/selectors'

import { Row, Col, Form, Button, Card, InputGroup, Alert } from 'react-bootstrap';
import { AppError } from '../../../store/types';
import { IApplicationState } from '../../../store/store';
import { purchaseTicket } from '../stakingSlice';


class PurchaseTicketForm extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			error: null,
			isDirty: false,
			formRef: React.createRef(),
			formIsValidated: false,
			purchaseTicketRequest: new PurchaseTicketsRequest(),
		}
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
									value={1}
									name="account_select"
									onChange={_.bind(this.handleAccountChange, this)}
								/>
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
										onClick={() => { this.state.formRef.current.num_tickets.value > 0 && this.state.formRef.current.num_tickets.stepDown() }}>
										<FontAwesomeIcon icon={faMinus} />
									</Button>
								</InputGroup.Prepend>
								<Form.Control
									required
									name="num_tickets"
									type="number"
									className="ml-3 mr-3"
									// tabIndex={-1}
									onChange={_.bind(this.handleChange, this)}
									defaultValue="1" />
								<InputGroup.Append>
									<Button
										variant="outline-secondary"
										onClick={() => { this.state.formRef.current.num_tickets.stepUp() }}
									><FontAwesomeIcon icon={faPlus} />
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</Form.Group>

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

	handleChange() {
		console.log("handleChange")
		if (!this.state.formRef.current.checkValidity()) {
			return
		}
	}

	handleAccountChange() {
		console.log("handleChange")
		if (!this.state.formRef.current.checkValidity()) {
			return
		}
	}
}



const loadFormFields = (formRef: React.RefObject<any>, r: PurchaseTicketsRequest) => {
	const f = formRef.current
	r.setNumTickets(f.num_tickets.value)
	r.setAccount(f.account_select.value)
	r.setRequiredConfirmations(1)
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		...state.staking,
		error: state.staking.errorPurchaseTickets,
		balances: getWalletBalances(state)
	};
}

interface OwnProps {
	error: AppError | null,
	balances: WalletBalance
}

interface IPurchaseTicketFormProps {
	error: AppError | null
}

interface InternalState {
	formRef: React.RefObject<any>
	error: AppError | null
	formIsValidated: boolean
	isDirty: boolean
	purchaseTicketRequest: PurchaseTicketsRequest
}

interface DispatchProps {
	purchaseTicket(...arguments: any): void
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	purchaseTicket: purchaseTicket,
}, dispatch)

type Props = DispatchProps & OwnProps & IPurchaseTicketFormProps

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTicketForm);
