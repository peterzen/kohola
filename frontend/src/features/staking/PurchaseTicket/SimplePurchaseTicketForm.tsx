import * as React from "react"
import _ from "lodash"
import { connect } from "react-redux"

import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { AccountSelector } from "../../../components/Shared/shared"
import { TxConfirmationPanel } from "../../transactions/TxConfirmationPanel"
import { WalletBalance, TicketPrice } from "../../../middleware/models"
import {
    PurchaseTicketsRequest,
    PurchaseTicketsResponse,
} from "../../../proto/api_pb"
import PassphraseEntryDialog, {
    askPassphrase,
} from "../../../components/Shared/PassphraseEntryDialog"
import { AppError, IApplicationState } from "../../../store/types"
import { purchaseTicket, getTicketPrice } from "../stakingSlice"
import { getWalletBalances } from "../../balances/walletBalanceSlice"
import { SteppableNumberInput } from "../../../components/Shared/SteppableNumberInput"
import { Amount } from "../../../components/Shared/Amount"
import PurchaseTicketSettings from "./PurchaseTicketSettings"
import { ErrorAlert } from "../../../components/Shared/FormStatusAlerts"

class PurchaseTicketForm extends React.Component<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isDirty: false,
            buyingPower: 0,
            remainingBalance: -1,
            formRef: React.createRef(),
            formIsValidated: false,
            purchaseTicketRequest: new PurchaseTicketsRequest(),
            showSettings: false,
        }
    }

    render() {
        const showForm = this.props.purchaseTicketResponse == undefined
        const showConfirmation = !showForm

        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>Purchase tickets</Card.Title>
                        {showForm && (
                            <Form
                                ref={this.state.formRef}
                                validated={
                                    this.state.formIsValidated &&
                                    !this.props.error
                                }
                                onSubmit={_.bind(this.handleFormSubmit, this)}
                                className="m-0">
                                <Row>
                                    <Col>
                                        <div className="text-right">
                                            <h4>
                                                <small>Current price:</small>{" "}
                                                <Amount
                                                    amount={this.props.ticketPrice.getTicketPrice()}
                                                    showCurrency
                                                />
                                            </h4>
                                        </div>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <AccountSelector
                                        defaultValue={-1}
                                        name="account_select"
                                        onChange={_.bind(
                                            this.handleChange,
                                            this
                                        )}
                                    />
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Col sm={8}>
                                        <SteppableNumberInput
                                            className="ml-3 mr-3"
                                            placeholder="# of tix"
                                            name="num_tickets"
                                            max={this.state.buyingPower}
                                            onChange={_.bind(
                                                this.handleChange,
                                                this
                                            )}
                                        />
                                        <br />
                                        Remaining balance:{" "}
                                        <Amount
                                            amount={this.state.remainingBalance}
                                        />
                                    </Col>
                                    <Col>
                                        Buying power: {this.state.buyingPower}
                                        <br />
                                    </Col>
                                </Form.Group>
                            </Form>
                        )}

                        {showConfirmation &&
                            this.props.purchaseTicketResponse != null && (
                                <TxConfirmationPanel
                                    hashes={this.props.purchaseTicketResponse.getTicketHashesList_asU8()}
                                />
                            )}
                        <PassphraseEntryDialog show={false} />
                    </Card.Body>
                    <Card.Footer>
                        <ErrorAlert error={this.props.error} />

                        {showForm && (
                            <Row>
                                <Col xs={6}>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => this.showSettings()}>
                                        <FontAwesomeIcon icon={faCog} />{" "}
                                        Settings
                                    </Button>
                                </Col>
                                <Col xs={6} className="text-right">
                                    <Button
                                        type="submit"
                                        disabled={!this.state.formIsValidated}
                                        onClick={_.bind(
                                            this.handleFormSubmit,
                                            this
                                        )}
                                        variant="primary">
                                        Purchase
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Card.Footer>
                </Card>
                <PurchaseTicketSettings
                    onHide={() => this.setState({ showSettings: false })}
                    showModal={this.state.showSettings}
                />
            </>
        )
    }

    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            formIsValidated: true,
            isDirty: false,
        })

        const request = new PurchaseTicketsRequest()
        loadFormFields(this.state.formRef, request)
        this.setState({
            purchaseTicketRequest: request,
        })
        const cancelError = new Error()
        askPassphrase()
            .then((passphrase) => {
                if (passphrase == "") {
                    throw cancelError
                }
                return request.setPassphrase(
                    new Uint8Array(Buffer.from(passphrase))
                )
            })
            .then((r) => {
                console.log("askPassphrase", request.toObject())
                return this.props.purchaseTicket(request)
            })
            .catch((err) => {
                console.error(err)
                console.log("askPassphrase", request.toObject())
                // debugger
            })
        return false
    }

    handleChange() {
        const f = this.state.formRef.current
        this.setState({
            formIsValidated: !(
                f.num_tickets.value < 1 || f.account_select.value < 0
            ),
        })
        loadFormFields(this.state.formRef, this.state.purchaseTicketRequest)
        this.getEstimate()
        // console.log("loadfFormFields", this.state.purchaseTicketRequest.toObject())
    }

    getEstimate() {
        const s = this.state
        const f = this.state.formRef.current
        const ticketPrice = this.props.ticketPrice.getTicketPrice()
        const req = this.state.purchaseTicketRequest
        const accountSpendableBalance =
            req.getAccount() > -1
                ? this.props.balances[req.getAccount()].getSpendable()
                : 0
        const buyingPower =
            req.getAccount() > -1
                ? Math.floor(accountSpendableBalance / ticketPrice)
                : 0
        this.setState({
            buyingPower: buyingPower,
            remainingBalance:
                accountSpendableBalance - f.num_tickets.value * ticketPrice, // what about fees?
        })
    }

    showSettings() {
        this.setState({
            showSettings: true,
        })
    }
}

const loadFormFields = (
    formRef: React.RefObject<any>,
    r: PurchaseTicketsRequest
) => {
    const f = formRef.current
    r.setNumTickets(parseInt(f.num_tickets.value))
    r.setAccount(parseInt(f.account_select.value))
    r.setRequiredConfirmations(1)
}

interface OwnProps {
    error: AppError | null
    balances: WalletBalance
    ticketPrice: TicketPrice
    purchaseTicketResponse: PurchaseTicketsResponse | null
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        error: state.staking.errorPurchaseTickets,
        purchaseTicketResponse: state.staking.purchaseTicketResponse,
        balances: getWalletBalances(state),
        ticketPrice: getTicketPrice(state),
    }
}

interface DispatchProps {
    purchaseTicket: typeof purchaseTicket
}

const mapDispatchToProps = {
    purchaseTicket: purchaseTicket,
}

interface InternalState {
    formRef: React.RefObject<any>
    formIsValidated: boolean
    buyingPower: number
    remainingBalance: number
    isDirty: boolean
    purchaseTicketRequest: PurchaseTicketsRequest
    showSettings: boolean
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTicketForm)
