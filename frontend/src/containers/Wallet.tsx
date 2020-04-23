import * as React from "react"
import { connect } from "react-redux"
import { withRouter, RouteChildrenProps } from "react-router-dom"
import _ from "lodash"

// @ts-ignore
import Fade from "react-reveal/Fade"
import { Card } from "react-bootstrap"



import {
    Transaction,
    WalletAccount,
    IndexedWalletAccounts,
    WalletBalance,
    WalletTotals,
} from "../middleware/models"

import { IApplicationState } from "../store/types"
import { loadTransactionsAttempt } from "../features/transactions/actions"
import { getWalletTransactions } from "../features/transactions/transactionsSlice"
import { MenuItems } from "../features/balances/AccountToolsDropdown"
import RecentTransactions from "../features/transactions/RecentTransactionsContainer"
import AccountBalanceTable from "../features/balances/AccountBalanceTable"
import WalletTotalsComponent from "../features/balances/WalletTotalsComponent"
import { getVisibleAccounts } from "../features/balances/accountSlice"
import {
    getWalletBalances,
    getWalletTotals,
} from "../features/balances/walletBalanceSlice"

class Wallet extends React.PureComponent<Props> {
    render() {
        return (
            <div>

                <WalletTotalsComponent
                    totals={this.props.walletTotals}
                />
                <div className="mt-3" />
                <AccountBalanceTable
                    menuHandler={_.bind(this.menuHandler, this)}
                    accounts={this.props.accounts}
                    balances={this.props.balances}
                    walletTotals={this.props.walletTotals}
                />
                <div className="mt-3" />
                <RecentTransactions
                    txList={this.props.txList}
                    showAccount={true}
                />
            </div>
        )
    }
    menuHandler(evtKey: keyof MenuItems, selectedAccount: WalletAccount) {
        this.setState({ selectedAccount: selectedAccount })
        switch (evtKey) {
            case MenuItems[MenuItems.DETAILSVIEW]:
                this.props.history.push(
                    "/account/" + selectedAccount.getAccountNumber()
                )
                break
        }
    }
    componentDidMount() {
        // this.props.loadTransactionsAttempt()
    }
}

interface OwnProps {
    txList: Transaction[]
    accounts: IndexedWalletAccounts
    balances: WalletBalance
    walletTotals: WalletTotals
    accountsLoading: boolean
}

interface DispatchProps {
    loadTransactionsAttempt: typeof loadTransactionsAttempt
}

type Props = OwnProps & DispatchProps & RouteChildrenProps<any>

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        txList: getWalletTransactions(state),
        accounts: getVisibleAccounts(state),
        balances: getWalletBalances(state),
        walletTotals: getWalletTotals(state),
        accountsLoading:
            state.accounts.getAccountsAttempting ||
            state.transactions.getTransactionsAttempting,
    }
}

const mapDispatchToProps = {
    loadTransactionsAttempt,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wallet))
