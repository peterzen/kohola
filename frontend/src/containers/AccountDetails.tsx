import * as React from "react"
import _ from "lodash"
import { connect } from "react-redux"
import { withRouter, RouteChildrenProps } from "react-router-dom"

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import {
    faPaperPlane,
    faCashRegister,
    faCoins,
} from "@fortawesome/free-solid-svg-icons"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Card, Alert, Col, Row, Tabs, Tab } from "react-bootstrap"

import { WalletAccount, Transaction } from "../middleware/models"
import AccountBalanceTotals from "../features/balances/AccountBalanceTotals"
import ReceiveDialog from "../features/transactions/ReceiveDialog"
import UTXOContainer from "../features/transactions/unspents/UTXOContainer"
import { IApplicationState } from "../store/types"
import { getAccountTransactions } from "../features/transactions/transactionsSlice"
import RecentTransactions from "../features/transactions/RecentTransactionsContainer"
import SendDialogContainer from "../features/transactions/SendTransaction/SendDialogContainer"
import {
    ReceiveTitle,
    CoinsTitle,
    SendTitle,
    RecentTxTitle,
} from "../features/transactions/shared"

class AccountDetails extends React.Component<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showNewAddressModal: false,
        }
    }

    render() {
        if (this.props.match == null) {
            return null
        }
        const account = this.props.lookupAccount(
            parseInt(this.props.match.params.accountNumber)
        )
        return (
            <div>
                {account != null && (
                    <div>
                        <Row>
                            <Col xs={8}>
                                <h2>
                                    <Button
                                        variant="link"
                                        size="lg"
                                        onClick={() => this.handleBack()}
                                        className="text-muted">
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </Button>
                                    &nbsp; Account: {account.getAccountName()}
                                </h2>
                            </Col>
                        </Row>

                        <Card>
                            <Card.Body>
                                <AccountBalanceTotals account={account} />
                            </Card.Body>
                        </Card>
                        <div className="mt-3">
                            <Tabs
                                id="accountdetails-tabs"
                                defaultActiveKey="transactions"
                                mountOnEnter={true}
                                unmountOnExit={false}>
                                <Tab
                                    eventKey="transactions"
                                    title={<RecentTxTitle />}>
                                    <RecentTransactions
                                        txList={this.props.txList(account)}
                                        showAccount={false}
                                    />
                                </Tab>
                                <Tab eventKey="utxo" title={<CoinsTitle />}>
                                    <UTXOContainer account={account} />
                                </Tab>
                                <Tab eventKey="send" title={<SendTitle />}>
                                    <SendDialogContainer
                                        defaultFromAccount={account}
                                    />
                                </Tab>
                                <Tab
                                    eventKey="receive"
                                    title={<ReceiveTitle />}>
                                    <ReceiveDialog account={account} />
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                )}
                {account == null && (
                    <Alert variant="danger">Account not found</Alert>
                )}
            </div>
        )
    }

    handleBack() {
        this.props.history.goBack()
    }
    showModal() {
        this.setState({ showNewAddressModal: true })
    }
    showReceiveDialog(account: WalletAccount) {
        this.showModal()
    }
}

interface OwnProps {
    txList: (account: WalletAccount) => Transaction[]
    lookupAccount: (accountNumber: number) => WalletAccount
}

interface InternalState {
    showNewAddressModal: boolean
}

interface DispatchProps {}

type Props = OwnProps &
    DispatchProps &
    RouteChildrenProps<{ accountNumber: string }>

const mapStateToProps = (state: IApplicationState) => {
    return {
        lookupAccount: (accountNumber: number) =>
            state.accounts.accounts[accountNumber],
        txList: (account: WalletAccount) =>
            getAccountTransactions(state, account),
    }
}

const mapDispatchToProps = {}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AccountDetails)
)
