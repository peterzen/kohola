import _ from "lodash"
import * as React from "react"

import { IndexedWalletAccounts, WalletAccount } from "../../../models"

import { Form, Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';
import { LoadingButton, PasteButton, AccountSelector } from "../../Shared/shared"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPaste,
} from '@fortawesome/free-solid-svg-icons'
import { isValidAddress } from "../../../helpers/validators"
import { ATOMS_DIVISOR, DEFAULT_REQUIRED_CONFIRMATIONS } from "../../../constants"
import { AppError } from "../../../store/types";
import DialogAlert from "./DialogAlert";

export default class SendDialogForm extends React.Component<OwnProps, ISendDialogFormData>{
	constructor(props: OwnProps) {
		super(props)
		this.state = {
			error: null,
			amount: 0,
			amountRef: React.createRef(),
			sourceAccount: this.props.accounts[0],
			sendAllToggle: false,
			formIsValidated: false,
			destinationAddress: [],
			requiredConfirmations: DEFAULT_REQUIRED_CONFIRMATIONS,
		}
	}

	render() {
		return (
			<Form
				validated={this.state.formIsValidated && !this.props.error}
				onSubmit={_.bind(this.handleFormSubmit, this)}
			>
				<Form.Group controlId="sourceAccount">
					<Form.Label>Select source account</Form.Label>
					<AccountSelector
						name="account"
						value={this.state.sourceAccount.getAccountNumber()}
						onChange={() => {
							this.setState({
								sourceAccount: this.props.accounts[parseInt(e.currentTarget.value)]
							})
						}} />
				</Form.Group>
				<Form.Group controlId="destinationAddressControl">
					<Form.Label>Destination address</Form.Label>
					<InputGroup className="mb-3">
						<FormControl
							required
							autoComplete="off"
							tabIndex={1}
							type="text"
							placeholder="Ds....."
							onChange={_.bind(this.handleDestinationAddressChange, this)}
							name="destinationAddress" />
						<InputGroup.Append>
							{/* <PasteButton tabIndex={-1} /> */}
						</InputGroup.Append>
					</InputGroup>
					<Form.Control.Feedback type="invalid">
						Invalid address
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="amountControl">
					<Form.Label>Amount (DCR)</Form.Label>
					<InputGroup className="mb-3">
						<FormControl
							required
							autoComplete="off"
							tabIndex={2}
							placeholder="0.1"
							type="number"
							step={1 / ATOMS_DIVISOR}
							aria-label="Amount"
							name="amount"
							aria-describedby="amountControl1"
							ref={this.state.amountRef}
							onChange={() => this.setState({
								amount: this.state.amountRef.current.value
							})}
						/>
						<InputGroup.Append>
							<Button
								tabIndex={-1}
								variant="outline-secondary">
								<Form.Group
									controlId="sendAllControl"
									className="m-0">
									<Form.Check
										name="sendAllToggle	"
										tabIndex={3}
										type="checkbox"
										onChange={_.bind(this.handleSendAllToggle, this)}
										label="Max" />
								</Form.Group>
							</Button>
						</InputGroup.Append>
					</InputGroup>
					<Form.Control.Feedback type="invalid">
						Invalid amount
					</Form.Control.Feedback>
				</Form.Group>
				<DialogAlert error={this.props.error} />
				<Row>
					<Col className="text-right">
						<Button
							tabIndex={4}
							variant="primary"
							type="submit">Create tx</Button>
					</Col>
				</Row>
			</Form>
		)
	}

	handleSendAllToggle(e: React.ChangeEvent<HTMLInputElement>) {
		const currentState = e.currentTarget.checked;
		this.state.amountRef.current.disabled = currentState
		if (currentState == true) {
			this.state.amountRef.current.value = this.state.sourceAccount.getTotalBalance() / ATOMS_DIVISOR
		}
		this.setState({
			sendAllToggle: currentState,
			amount: this.state.amountRef.current.value
		})
	}

	handleDestinationAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
		const address = e.currentTarget.value.trim()
		if (!address.length) {
			return
		}
		const v = isValidAddress(address)

		if (v != null) {
			e.currentTarget.setCustomValidity(v.msg)
			return false
		}
		e.currentTarget.setCustomValidity("")
		this.setState({
			destinationAddress: [address]
		})
		return true;
	}

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({ formIsValidated: true })
		this.props.onFormComplete(this.state)
		return false;
	}
}


interface OwnProps {
	error: AppError | null
	accounts: IndexedWalletAccounts
	onFormComplete: (formData: ISendDialogFormData) => void
}


export interface ISendDialogFormData {
	error: AppError | null
	amount: number
	amountRef: React.RefObject<any>
	sendAllToggle: boolean | undefined
	sourceAccount: WalletAccount
	formIsValidated: boolean
	destinationAddress: string[]
	requiredConfirmations: number
}
