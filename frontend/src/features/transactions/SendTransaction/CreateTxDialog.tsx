import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import {
    Form,
    Button,
    InputGroup,
    FormControl,
    Row,
    Col,
    Dropdown,
} from "react-bootstrap"
import { faEye, faSave, faExchangeAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    IndexedWalletAccounts,
    WalletAccount,
} from "../../../middleware/models"

import { isValidAddress } from "../../../helpers/validators"
import {
    ATOMS_DIVISOR,
    DEFAULT_REQUIRED_CONFIRMATIONS,
} from "../../../constants"
import { AppError, IApplicationState } from "../../../store/types"
import DialogAlert from "./DialogAlert"

import { getCurrentNetwork } from "../../app/appSlice"
import { AccountSelector, PasteButton } from "../../../components/Shared/shared"
import FeeChooserInput from "../FeeChooserInput"
import UTXOSelectorWidget, {
    calculateTotalUTXOAmount,
} from "../unspents/UTXOSelectorWidget"
import { getVisibleAccounts } from "../../balances/accountSlice"
import {
    getCurrentExchangeRate,
    haveExchangeRateData,
} from "../../market/marketSlice"
import { getAccountBalance } from "../../balances/walletBalanceSlice"
import {
    UnspentOutput,
    CreateTransactionRequest,
} from "../../../proto/walletgui_pb"
import { AuthoredTransactionMetadata } from "../models"
import { Amount } from "../../../components/Shared/Amount"
import { createTransaction } from "../actions"

class ConstructTxDialog extends React.Component<Props, ISendDialogFormData> {
    formRef: React.RefObject<any> = React.createRef()
    feeRateRef: React.RefObject<any> = React.createRef()
    updateTxMetadata: () => void

    constructor(props: Props) {
        super(props)
        this.state = {
            error: null,
            amount: 0,
            feeRate: 0,
            estimatedFee: 0,
            selectedUTXOs: [],
            sourceAccount:
                this.props.defaultFromAccount || this.props.accounts[0],
            sendAllToggle: false,
            spendableFunds: 0,
            formIsValidated: false,
            amountAltCurrency: 0,
            destinationAddress: [],
            estimatedSignedSize: 0,
            manualInputSelection: false,
            requiredConfirmations: DEFAULT_REQUIRED_CONFIRMATIONS,
            selectedAltCurrencyCode: "usd",
        }
        this.updateTxMetadata = _.debounce(this._updateTxMetadata, 500)
    }

    render() {
        return (
            <div>
                <Form
                    ref={this.formRef}
                    className="mb-0"
                    validated={this.state.formIsValidated && !this.props.error}
                    onSubmit={_.bind(this.handleFormSubmit, this)}>
                    <Form.Group controlId="destinationAddressControl" as={Row}>
                        <Form.Label column sm={3}>
                            Pay to
                        </Form.Label>
                        <Col sm={9}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    required
                                    autoComplete="off"
                                    tabIndex={1}
                                    type="text"
                                    size="lg"
                                    placeholder="Ds....."
                                    defaultValue={
                                        this.state.destinationAddress[0]
                                    }
                                    onChange={_.bind(
                                        this.handleDestinationAddressChange,
                                        this
                                    )}
                                    name="destinationAddress"
                                />
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
                        <Form.Label column sm={3}>
                            From
                        </Form.Label>
                        <Col sm={9}>
                            <Row>
                                <Col sm={6}>
                                    <strong>
                                        {this.state.sourceAccount.getAccountName()}{" "}
                                        <Amount
                                            amount={this.props.getSpendableBalance(
                                                this.state.sourceAccount
                                            )}
                                            rounding={8}
                                            showCurrency
                                        />
                                    </strong>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group
                                        controlId="manualUTXOSelectionToggleControl"
                                        className="">
                                        <Form.Check
                                            type="switch"
                                            name="manualUTXOSelectionToggle"
                                            tabIndex={3}
                                            // checked={this.state.manualInputSelection}
                                            onChange={(
                                                e: React.ChangeEvent<
                                                    HTMLInputElement
                                                >
                                            ) =>
                                                this.handleManualInputToggleChange(
                                                    e.currentTarget.checked
                                                )
                                            }
                                            label="Manual UTXO selection"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {this.state.manualInputSelection && (
                                <div>
                                    <UTXOSelectorWidget
                                        onSelectionChange={(
                                            utxos: UnspentOutput[]
                                        ) =>
                                            this.handleUTXOSelectionChange(
                                                utxos
                                            )
                                        }
                                        account={this.state.sourceAccount}
                                    />
                                </div>
                            )}
                        </Col>
                    </Row>

                    {/* 
				<Row>
					<Form.Label column sm={3}>From</Form.Label>
					<Col sm={9}>
						<Row>
							<Col sm={5}>
								<Form.Group controlId="sourceAccount">
									<AccountSelector
										name="account"
										defaultValue={this.state.sourceAccount?.getAccountNumber()}
										onChange={(e: React.FormEvent<HTMLInputElement>) => {
											this.setState({
												sourceAccount: this.props.accounts[parseInt(e.currentTarget.value)]
											})
										}} />
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
									onSelectionChange={(utxos: UnspentOutput[]) => this.handleUTXOSelectionChange(utxos)}
									account={this.state.sourceAccount}
								/>
							</div>
						)}
					</Col>
				</Row> */}

                    <Form.Group as={Row}>
                        <Form.Label column sm={3}>
                            Amount
                        </Form.Label>
                        <Col sm={9}>
                            <Row>
                                <Col xs={4}>
                                    <InputGroup className="mt-2">
                                        <FormControl
                                            required
                                            autoComplete="off"
                                            tabIndex={2}
                                            placeholder="Amount"
                                            type="number"
                                            step="any"
                                            min={0}
                                            max={this.state.spendableFunds}
                                            aria-label="Amount"
                                            name="amount"
                                            aria-describedby="amountControl"
                                            id="amountControl"
                                            size="lg"
                                            onChange={(
                                                e: React.ChangeEvent<
                                                    HTMLInputElement
                                                >
                                            ) =>
                                                this.handleAmountInputChange(
                                                    "amount",
                                                    parseFloat(
                                                        e.currentTarget.value
                                                    )
                                                )
                                            }
                                        />
                                        <InputGroup.Append>
                                            <InputGroup.Text className="ml-2">
                                                <small>DCR</small>
                                            </InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                                <Col xs={2} className="pt-3 text-center">
                                    <span className="text-muted">
                                        <FontAwesomeIcon icon={faExchangeAlt} />
                                    </span>
                                </Col>
                                <Col xs={4}>
                                    <InputGroup className="mt-1">
                                        <FormControl
                                            disabled={
                                                !this.props.haveExchangeRateData
                                            }
                                            autoComplete="off"
                                            tabIndex={2}
                                            placeholder={`Amount (${this.state.selectedAltCurrencyCode.toUpperCase()})`}
                                            type="number"
                                            step={1 / ATOMS_DIVISOR}
                                            aria-label={`Amount (${this.state.selectedAltCurrencyCode.toUpperCase()})`}
                                            name="amountAltCurrency"
                                            id="amountControlAltCurrency"
                                            size="lg"
                                            aria-describedby="amountControlAltCurrency"
                                            onChange={(
                                                e: React.ChangeEvent<
                                                    HTMLInputElement
                                                >
                                            ) =>
                                                this.handleAmountInputChange(
                                                    "amountAltCurrency",
                                                    parseFloat(
                                                        e.currentTarget.value
                                                    )
                                                )
                                            }
                                        />
                                        <InputGroup.Append>
                                            <Dropdown
                                                onSelect={(evtKey: string) =>
                                                    this.handleAltCurrencySelectorChange(
                                                        evtKey
                                                    )
                                                }>
                                                <Dropdown.Toggle
                                                    variant="secondary"
                                                    id="alt-currency-selector">
                                                    {this.state.selectedAltCurrencyCode.toUpperCase()}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="btc">
                                                        BTC
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="usd">
                                                        USD
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="eur">
                                                        EUR
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </InputGroup.Append>
                                    </InputGroup>
                                    <small className="form-text text-muted">
                                        Rate:{" "}
                                        {this.props
                                            .altCurrencyExchangeRate(
                                                this.state
                                                    .selectedAltCurrencyCode
                                            )
                                            ?.toFixed(8)}
                                    </small>
                                </Col>
                                <Col xs={2}>
                                    <Button tabIndex={-1} variant="link">
                                        <Form.Group
                                            controlId="sendAllControl"
                                            className="m-0">
                                            <Form.Check
                                                name="sendAllToggle"
                                                tabIndex={3}
                                                type="checkbox"
                                                onChange={(
                                                    e: React.ChangeEvent<
                                                        HTMLInputElement
                                                    >
                                                ) =>
                                                    this.handleSourceChange(
                                                        e.currentTarget.checked
                                                    )
                                                }
                                                label="Max"
                                            />
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
                        <Form.Label column sm={3}>
                            Fee
                        </Form.Label>
                        <Col sm={6}>
                            Estimated size: {this.state.estimatedSignedSize}{" "}
                            bytes
                            <br />
                            Fee:{" "}
                            <Amount
                                amount={this.state.estimatedFee}
                                showCurrency
                            />
                            {/* <FeeChooserInput
                                inputRef={this.feeRateRef}
                                value={this.state.feeRate}
                                txSizeEstimate={this.state.estimatedSignedSize}
                                onChange={(feeRate: number) => this.handleFeeRateChange(feeRate)} /> */}
                        </Col>
                    </Form.Group>

                    <Row>
                        <Col sm={3}></Col>
                        <Col sm={9}>
                            <DialogAlert error={this.props.error} />
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col xs={6}>
                            <Button
                                onClick={() => this.resetFields()}
                                tabIndex={-1}
                                variant="secondary">
                                Clear
                            </Button>
                        </Col>
                        <Col xs={6} className="text-right">
                            {/* <Button tabIndex={4} variant="secondary">
                                <FontAwesomeIcon icon={faEye} /> Preview
                            </Button> */}
                            <Button
                                tabIndex={4}
                                variant="primary"
                                type="submit">
                                <FontAwesomeIcon icon={faEye} /> Preview &amp;
                                Sign
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }

    handleAmountInputChange(fieldName: string, value: number) {
        const form = this.formRef.current
        const exchangeRate = this.props.altCurrencyExchangeRate(
            this.state.selectedAltCurrencyCode
        )
        let amount = 0
        const normalizeValue = (value: number) =>
            Math.floor(value * ATOMS_DIVISOR) / ATOMS_DIVISOR
        switch (fieldName) {
            case "amount":
                form.amount.value = amount = normalizeValue(value)
                if (exchangeRate == undefined) break
                const altValue = value * exchangeRate
                form.amountAltCurrency.value = altValue.toFixed(2)
                break

            case "amountAltCurrency":
                if (exchangeRate == undefined) return
                const dcrValue = value / exchangeRate
                form.amount.value = amount = normalizeValue(dcrValue)
                break
        }
        this.setState(
            {
                amount: amount,
            },
            () => {
                this.updateTxMetadata()
            }
        )
    }

    handleSourceChange(sendAllFlag: boolean = this.state.sendAllToggle) {
        const form = this.formRef.current
        form.amount.disabled = form.amountAltCurrency.disabled = sendAllFlag
        let spendableFunds = 0
        if (this.state.manualInputSelection == true) {
            spendableFunds =
                calculateTotalUTXOAmount(this.state.selectedUTXOs) /
                ATOMS_DIVISOR
        } else {
            spendableFunds =
                this.props.getSpendableBalance(this.state.sourceAccount) /
                ATOMS_DIVISOR
        }
        if (sendAllFlag == true) {
            this.handleAmountInputChange("amount", spendableFunds)
        }
        this.setState(
            {
                sendAllToggle: sendAllFlag,
                spendableFunds: spendableFunds,
            },
            () => {
                this.updateTxMetadata()
            }
        )
    }

    handleManualInputToggleChange(state: boolean) {
        this.setState(
            {
                manualInputSelection: state,
                selectedUTXOs: [],
            },
            () => {
                this.handleSourceChange()
            }
        )
    }

    handleUTXOSelectionChange(utxos: UnspentOutput[]) {
        this.setState(
            {
                selectedUTXOs: utxos,
            },
            () => {
                this.handleSourceChange()
            }
        )
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
        this.setState(
            {
                destinationAddress: [address],
            },
            () => {
                this.updateTxMetadata()
            }
        )
        return true
    }

    handleFeeRateChange(feeRate: number) {
        this.setState({
            feeRate: feeRate,
        })
        this.updateTxMetadata()
    }

    handleAltCurrencySelectorChange(currency: string) {
        this.setState({
            selectedAltCurrencyCode: currency,
        })
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.createTransaction()
        if (this.props.error == null) {
            this.props.onCompleted()
        }
        return false
    }

    componentDidMount() {
        this.handleSourceChange(false)
    }

    async _updateTxMetadata() {
        const f = this.formRef.current
        const txInfo = this.props.txInfo
        let estimatedFee = 0
        if (txInfo != undefined && txInfo.constructedTx != undefined) {
            estimatedFee =
                txInfo.constructedTx.getTotalPreviousOutputAmount() -
                txInfo.constructedTx.getTotalOutputAmount()
        }
        if (f.amount.value && f.destinationAddress.value) {
            await this.createTransaction()
            this.setState({
                estimatedFee: estimatedFee,
                estimatedSignedSize:
                    this.props.txInfo != null
                        ? this.props.txInfo.estimatedSignedSize
                        : 0,
            })
        }
    }

    resetFields() {
        const f = this.formRef.current
        f.destinationAddress.value = ""
        f.amount.value = ""
        f.amountAltCurrency.value = ""
        f.manualUTXOSelectionToggle.checked = false
        f.sendAllToggle.checked = false
        this.handleManualInputToggleChange(false)
        this.handleSourceChange(false)
        f.destinationAddress.focus()
    }

    createTransaction() {
        const s = this.state
        const request = new CreateTransactionRequest()
        request.setFeeRate(s.feeRate)
        request.setSendAllFlag(s.sendAllToggle)
        request.setSourceOutputsList(s.selectedUTXOs)
        const amountsMap = request.getAmountsMap()
        // TODO implement multiple output addresses
        amountsMap.set(
            s.destinationAddress[0],
            Math.floor(s.amount * ATOMS_DIVISOR)
        )
        // console.log("SELECTED UTXOS", f.selectedUTXOs.map(u => u.toObject()))
        // console.log("REQUEST", request.toObject())
        return this.props.createTransaction(request)
    }
}

interface OwnProps {
    error: AppError | null
    txInfo: AuthoredTransactionMetadata | null
    onCancel: () => void
    onCompleted: () => void
    defaultFromAccount?: WalletAccount
    onStepChangeSubscribe: (fn: () => void) => void
}

export interface ISendDialogFormData {
    error: AppError | null
    amount: number
    feeRate: number
    estimatedFee: number
    sendAllToggle: boolean
    selectedUTXOs: UnspentOutput[]
    sourceAccount: WalletAccount
    spendableFunds: number
    formIsValidated: boolean
    amountAltCurrency: number
    destinationAddress: string[]
    estimatedSignedSize: number
    manualInputSelection: boolean
    requiredConfirmations: number
    selectedAltCurrencyCode: string
}

interface StateProps {
    accounts: IndexedWalletAccounts
    activeNetwork: number
    getSpendableBalance: (account: WalletAccount) => number
    haveExchangeRateData: boolean
    altCurrencyExchangeRate: (currencyCode: string) => number | undefined
}

const mapStateToProps = (state: IApplicationState): StateProps => {
    return {
        accounts: getVisibleAccounts(state),
        activeNetwork: getCurrentNetwork(state),
        getSpendableBalance: (account: WalletAccount) => {
            return getAccountBalance(
                state,
                account.getAccountNumber()
            ).getSpendable()
        },
        haveExchangeRateData: haveExchangeRateData(state),
        altCurrencyExchangeRate: (currencyCode: string) => {
            return getCurrentExchangeRate(state, currencyCode)
        },
    }
}

interface DispatchProps {
    createTransaction: typeof createTransaction
}

const mapDispatchToProps = {
    createTransaction,
}

type Props = OwnProps & StateProps & DispatchProps

export default connect(mapStateToProps, mapDispatchToProps)(ConstructTxDialog)
