import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"


import { IApplicationState } from "../../store/types"
import { getAccounts } from "../../store/accounts/selectors"
import { IndexedWalletAccounts, WalletAccount } from "../../models"


import { Row, Form, Button, Col, InputGroup, ToggleButton, FormControl, FormCheck } from 'react-bootstrap';
import { LoadingButton } from "../Shared/shared"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPaste,
} from '@fortawesome/free-solid-svg-icons'
import { isValidAddress } from "../../helpers/validators"
import { ATOMS_DIVISOR, DEFAULT_FEE, DEFAULT_REQUIRED_CONFIRMATIONS } from "../../constants"
import { ConstructTransactionRequest } from "../../proto/api_pb"
import { constructTransactionAttempt } from "../../store/transactions/actions"
import { ConstructTxOutput } from "../../datasources/models"


class SendDialog extends React.Component<Props, InternalState>{
	constructor(props: Props) {
		super(props)
		this.state = {
			sourceAccount: this.props.accounts[0],
			amount: 0,
			destinationAddress: [],
			feePerKb: DEFAULT_FEE,
			requiredConfirmations: DEFAULT_REQUIRED_CONFIRMATIONS,
			outputSelectionAlgorithm: ConstructTransactionRequest.OutputSelectionAlgorithm.UNSPECIFIED,
			sendAllToggle: false,

			formIsValidated: false,
			formRef: React.createRef(),
			amountRef: React.createRef(),
			constructedTx: new ConstructTransactionRequest()
		}
	}

	accountSelectOptions() {
		return _.map(this.props.accounts, (a, n) =>
			<option key={n} value={a.getAccountNumber()}>{a.getAccountName()} ({a.getTotalBalance() / ATOMS_DIVISOR} DCR)</option>
		)
	}

	render() {
		return (
			<Row>
				<Col>
					<Form
						ref={this.state.formRef}
						validated={this.state.formIsValidated}
						onSubmit={_.bind(this.handleFormSubmit, this)}
					>
						<Form.Group controlId="sourceAccount">
							<Form.Label>Select source account</Form.Label>
							<Form.Control
								tabIndex={0}
								value={this.state.sourceAccount.getAccountNumber().toString()}
								onChange={_.bind(this.handleSourceSelectChange, this)}
								as="select">
								{this.accountSelectOptions()}
							</Form.Control>
						</Form.Group>
						<Form.Group controlId="destinationAddressControl">
							<Form.Label>Destination address</Form.Label>
							<div>SseN9XYdBWYQdjFyq1hENB2k91Mvo1VMZ48</div>
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
									<Button variant="secondary"
										tabIndex={-1}>
										<FontAwesomeIcon icon={faPaste} />
									</Button>
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
									onChange={_.bind(this.handleAmountInputChange, this)}
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
						<Button
							tabIndex={4}
							variant="primary"
							type="submit">Create tx</Button>
						{/* <LoadingButton
							label="Create transaction"
							loadingLabel="Creating tx"
							onClick={this.handleSubmitBtn}
						/> */}
					</Form>
				</Col>
				<Col>
				</Col>
			</Row>
		)
	}

	handleSubmitBtn(e: React.FormEvent<FormControl>) {
		return true;
	}

	handleSourceSelectChange(e: React.FormEvent<HTMLSelectElement>) {
		this.setState({
			sourceAccount: this.props.accounts[parseInt(e.currentTarget.value)]
		})
		console.log(e.currentTarget.value, this.state.sourceAccount.getAccountName())
	}

	handleSendAllToggle(e: React.ChangeEvent<HTMLInputElement>) {
		console.log(e.currentTarget.checked)
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

	handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		console.log(this.state.formRef)
		const form = e.currentTarget;
		e.preventDefault();
		e.stopPropagation();
		// if (form.checkValidity() === false) {
		// }
		this.setState({ formIsValidated: true })
		console.log("FORM OK", this.state)
		const outputs: ConstructTxOutput[] = [{
			destination: this.state.destinationAddress[0],
			amount: this.state.amount * ATOMS_DIVISOR
		}]
		this.props.constructTransactionAttempt(
			this.state.sourceAccount.getAccountNumber(),
			this.state.requiredConfirmations,
			outputs,
			this.state.sendAllToggle
		)
		return false;
	}

	handleAmountInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log("AMOUNT CHANGE", e.currentTarget.value)
		this.setState({
			amount: this.state.amountRef.current.value
		})
	}

	handleDestinationAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log(e.currentTarget.value)
		const address = e.currentTarget.value.trim()
		if (!address.length) {
			return
		}
		const v = isValidAddress(address)
		// debugger
		console.log(v)

		if (v != null) {
			e.currentTarget.setCustomValidity(v.msg)
			return false
		}
		e.currentTarget.setCustomValidity("")
		this.setState({
			destinationAddress: [address]
		})
		console.log("OK")
		return true;
	}
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		...state.walletbalance,
		accounts: getAccounts(state),
	};
}

interface OwnProps {
	accounts: IndexedWalletAccounts
}


interface DispatchProps {
	constructTransactionAttempt(...arguments: any): void
}

type Props = DispatchProps & OwnProps

interface InternalState {
	sourceAccount: WalletAccount,
	amount: number,
	destinationAddress: string[],
	sendAllToggle: boolean | undefined,
	requiredConfirmations: number,
	outputSelectionAlgorithm: typeof ConstructTransactionRequest.OutputSelectionAlgorithm,
	feePerKb: number,

	formIsValidated: boolean,
	formRef: React.RefObject<any>,
	amountRef: React.RefObject<any>,
	constructedTx: ConstructTransactionRequest
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	constructTransactionAttempt: constructTransactionAttempt
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(SendDialog);
