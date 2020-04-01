import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { IndexedWalletAccounts, WalletAccount } from "../../../middleware/models"

import { AccountSelector, PasteButton } from "../../../components/Shared/shared"

import { isValidAddress } from "../../../helpers/validators"
import { ATOMS_DIVISOR, DEFAULT_REQUIRED_CONFIRMATIONS } from "../../../constants"
import { AppError, IApplicationState } from "../../../store/types";
import DialogAlert from "./DialogAlert";

import { Form, Button, InputGroup, FormControl, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { getCurrentNetwork } from "../../app/appSlice"
import FeeChooserInput from "../../staking/FeeChooserInput"
import UTXOSelectorWidget, { calculateTotalUTXOAmount } from "../../unspents/UTXOSelectorWidget"
import { getVisibleAccounts } from "../../balances/accountSlice"
import { UnspentOutputResponse } from "../../../proto/api_pb"
import { getCurrentExchangeRate, haveExchangeRateData } from "../../market/marketSlice"
import { getAccountBalance } from "../../balances/walletBalanceSlice"

class ConstructTxDialog extends React.Component<Props, ISendDialogFormData>{
	constructor(props: Props) {
		super(props)
		this.state = {
			error: null,
			amount: 0,
			amountAltCurrency: 0,
			formRef: React.createRef(),
			selectedUTXOs: [],
			sourceAccount: this.props.accounts[0],
			sendAllToggle: false,
			formIsValidated: false,
			destinationAddress: [],
			manualInputSelection: false,
			requiredConfirmations: DEFAULT_REQUIRED_CONFIRMATIONS,
			selectedAltCurrencyCode: "usd",
		}
	}

	render() {
		return (
			<Form
				ref={this.state.formRef}
				className="mb-0"
				validated={this.state.formIsValidated && !this.props.error}
				onSubmit={_.bind(this.handleFormSubmit, this)}
			>
				<Form.Group controlId="destinationAddressControl" as={Row}>
					<Form.Label column sm={3}>Pay to</Form.Label>
					<Col sm={9}>
						<InputGroup className="mb-3">
							<FormControl
								required
								autoComplete="off"
								tabIndex={1}
								type="text"
								size="lg"
								placeholder="Ds....."
								onChange={_.bind(this.handleDestinationAddressChange, this)}
								name="destinationAddress" />
							<InputGroup.Append>
								<PasteButton />
							</InputGroup.Append>
						</InputGroup>
						<Form.Control.Feedback type="invalid">
							Invalid address
					</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Row>
					<Form.Label column sm={3}>From</Form.Label>
					<Col sm={9}>
						<Row>
							<Col sm={5}>
								<Form.Group controlId="sourceAccount">
									{/* <Form.Label>Source account</Form.Label> */}
									<AccountSelector
										name="account"
										defaultValue={this.state.sourceAccount?.getAccountNumber()}
										onChange={(e: React.FormEvent<HTMLInputElement>) => {
											this.setState({
												sourceAccount: this.props.accounts[parseInt(e.currentTarget.value)]
											})
										}} />
									{/* <small className="form-text text-muted">Source account</small> */}
								</Form.Group>
							</Col>
							<Col sm={{ span: 5, offset: 1 }}>
								<Form.Group
									controlId="manualUTXOSelectionToggleControl"
									className="">
									<Form.Check
										type="switch"
										name="manualUTXOSelectionToggle"
										tabIndex={3}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleManualInputToggleChange(e.currentTarget.checked)}
										label="Manual UTXO selection" />
								</Form.Group>
							</Col>
						</Row>
						{this.state.manualInputSelection && (
							<div>
								<UTXOSelectorWidget
									onSelectionChange={(utxos: UnspentOutputResponse[]) => this.handleUTXOSelectionChange(utxos)}
									account={this.state.sourceAccount}
								/>
							</div>
						)}
					</Col>
				</Row>


				<Form.Group controlId="amountControl" as={Row}>
					<Form.Label column sm={3}>Amount (DCR)</Form.Label>
					<Col sm={9}>
						<Row>
							<Col xs={5} sm={{ span: 4 }}>
								<InputGroup className="mb-3">
									<FormControl
										required
										autoComplete="off"
										tabIndex={2}
										placeholder="Amount (DCR)"
										type="number"
										step={1 / ATOMS_DIVISOR}
										aria-label="Amount"
										name="amount"
										aria-describedby="amountControlDCR"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleAmountInputChange(
											"amount", parseFloat(e.currentTarget.value)
										)}
									/>
									<InputGroup.Append>
										<InputGroup.Text>DCR</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
							</Col>
							<Col xs={5} sm={{ span: 4, offset: 2 }}>
								<InputGroup className="mb-3" >
									<FormControl
										disabled={!this.props.haveExchangeRateData}
										autoComplete="off"
										tabIndex={2}
										placeholder="Amount (USD)"
										type="number"
										step={1 / ATOMS_DIVISOR}
										aria-label="Amount (USD)"
										name="amountAltCurrency"
										aria-describedby="amountControlAltCurrency"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleAmountInputChange(
											"amountAltCurrency", parseFloat(e.currentTarget.value)
										)}
									/>
									<InputGroup.Append>
										<InputGroup.Text>USD</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
								<small className="form-text text-muted">Estimated value, based on rate {this.props.altCurrencyExchangeRate(this.state.selectedAltCurrencyCode)?.toFixed(6)}</small>
							</Col>
							<Col xs={2}>
								<Button
									tabIndex={-1}
									variant="link">
									<Form.Group
										controlId="sendAllControl"
										className="m-0">
										<Form.Check
											name="sendAllToggle	"
											tabIndex={3}
											type="checkbox"
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleSendAllToggle(e.currentTarget.checked)}
											label="Max" />
									</Form.Group>
								</Button>
							</Col>
						</Row>

						<Form.Control.Feedback type="invalid">
							Invalid amount
						</Form.Control.Feedback>
					</Col>
				</Form.Group>

				<Form.Group controlId="feeControl" as={Row}>
					<Form.Label column sm={3}>Fee</Form.Label>
					<Col sm={4}>
						<FeeChooserInput defaultValue={0} onChange={() => { }} />
					</Col>
				</Form.Group>


				<DialogAlert error={this.props.error} />
				<div className="mt-5 text-right">
					<Button
						onClick={() => this.props.onCancel()}
						tabIndex={-1}
						variant="secondary"
					>Cancel</Button>
					<Button
						tabIndex={4}
						variant="primary"
						type="submit">Create tx</Button>
				</div>
			</Form>
		)
	}

	handleManualInputToggleChange(state: boolean) {
		this.setState({
			manualInputSelection: state,
			selectedUTXOs:[],
		})
		setTimeout(() => {
			this.handleSendAllToggle()
		}, 0)
	}

	handleAmountInputChange(fieldName: string, value: number) {
		const form = this.state.formRef.current
		const exchangeRate = this.props.altCurrencyExchangeRate(this.state.selectedAltCurrencyCode) || 0
		switch (fieldName) {
			case "amount":
				const altValue = value * exchangeRate
				this.setState({
					amount: value,
				})
				form.amount.value = value
				form.amountAltCurrency.value = altValue.toFixed(2)
				break

			case "amountAltCurrency":
				const dcrValue = value / exchangeRate
				this.setState({
					amount: dcrValue,
				})
				form.amount.value = dcrValue
				break
		}
	}

	handleSendAllToggle(currentState: boolean=this.state.sendAllToggle) {
		const form = this.state.formRef.current
		form.amount.disabled = form.amountAltCurrency.disabled = currentState
		let spendableFunds = 0
		if (this.state.manualInputSelection == true) {
			spendableFunds = calculateTotalUTXOAmount(this.state.selectedUTXOs) / ATOMS_DIVISOR
		} else {
			spendableFunds = this.props.getSpendableBalance(this.state.sourceAccount) / ATOMS_DIVISOR
		}
		if (currentState == true) {
			this.handleAmountInputChange("amount", spendableFunds)
		}
		this.setState({
			sendAllToggle: currentState,
		})
	}

	handleUTXOSelectionChange(utxos: UnspentOutputResponse[]) {
		this.setState({
			selectedUTXOs: utxos
		})
		// we have to wait for the update threads triggered by setState() to finish
		setTimeout(() => {
			this.handleSendAllToggle()
		}, 0)
	}

	handleDestinationAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
		const address = e.currentTarget.value.trim()
		if (!address.length) {
			return
		}
		const v = isValidAddress(this.props.activeNetwork, address)

		if (v != null) {
			e.currentTarget.setCustomValidity(v.message)
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
	onCancel: () => void
	onFormComplete: (formData: ISendDialogFormData) => void
}


export interface ISendDialogFormData {
	error: AppError | null
	amount: number
	formRef: React.RefObject<any>
	sendAllToggle: boolean
	selectedUTXOs: UnspentOutputResponse[]
	sourceAccount: WalletAccount
	formIsValidated: boolean
	amountAltCurrency: number
	destinationAddress: string[]
	manualInputSelection: boolean
	requiredConfirmations: number
	selectedAltCurrencyCode: string
}

interface StateProps {
	accounts: IndexedWalletAccounts
	activeNetwork: number
	haveExchangeRateData: boolean
	getSpendableBalance: (account: WalletAccount) => number
	altCurrencyExchangeRate: (currencyCode: string) => number | undefined
}

const mapStateToProps = (state: IApplicationState): StateProps => {
	return {
		accounts: getVisibleAccounts(state),
		activeNetwork: getCurrentNetwork(state),
		haveExchangeRateData: haveExchangeRateData(state),
		getSpendableBalance: (account: WalletAccount) => {
			return getAccountBalance(state, account.getAccountNumber()).getSpendable()
		},
		altCurrencyExchangeRate: (currencyCode: string) => {
			return getCurrentExchangeRate(state, currencyCode)
		}
	}
}

type Props = OwnProps & StateProps

export default connect(mapStateToProps)(ConstructTxDialog);

