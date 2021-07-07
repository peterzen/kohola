import * as React from "react"
import _ from "lodash"

import { Table, Button, Card } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

import { Amount } from "../../components/Shared/Amount"
import { MenuItems } from "./AccountToolsDropdown"
import {
    AccountBalance,
    IndexedWalletAccounts,
    WalletAccount,
    WalletBalance,
    WalletTotals,
} from "../../middleware/models"
import { IApplicationState } from "../../store/types"
import { connect } from "react-redux"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"

class AccountBalanceTable extends React.Component<Props, InternalState> {
    render() {
        return (
            <Card>
                <ComponentPlaceHolder
                    firstLaunchOnly={true}
                    className="p-x-20"
                    type="text"
                    rows={7}
                    ready={!this.props.loading}
                    showLoadingAnimation>
                    <Table hover>
                        <thead>
                            <tr className="text-right">
                                <th></th>
                                <th className="text-secondary">spendable</th>
                                <th className="text-secondary">total</th>
                                <th className="text-secondary">unconf'd</th>
                                <th className="text-secondary">
                                    immature
                                    <br />
                                    <small>stake/reward</small>
                                </th>
                                <th className="text-secondary">
                                    voting
                                    <br />
                                    authority
                                </th>
                                <th className="text-secondary">locked</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>{this.renderItems()}</tbody>
                        <tfoot>{this.renderTotals()}</tfoot>
                    </Table>
                </ComponentPlaceHolder>
            </Card>
        )
    }

    renderBalanceRow(props: {
        account: WalletAccount
        balance: AccountBalance
    }) {
        const { account, balance } = props
        if (balance == undefined) {
            return null
        }
        return (
            <tr
                key={account.getAccountNumber()}
                className="clickable p-4 text-right"
                onClick={() => {
                    this.props.menuHandler(
                        MenuItems[MenuItems.DETAILSVIEW],
                        account
                    )
                }}>
                <td className="text-left">{account.getAccountName()}</td>
                <td>
                    <Amount amount={balance.getSpendable()} />
                </td>
                <td>
                    <Amount amount={balance.getTotal()} />
                </td>
                <td className="text-secondary">
                    <Amount amount={balance.getUnconfirmed()} />
                </td>
                <td className="text-secondary">
                    <Amount
                        amount={
                            balance.getImmatureStakeGeneration() +
                            balance.getImmatureReward()
                        }
                    />
                </td>
                <td className="text-secondary">
                    <Amount amount={balance.getVotingAuthority()} />
                </td>
                <td className="text-secondary">
                    <Amount amount={balance.getLockedByTickets()} />
                </td>
                <td>
                    <Button variant="link" size="lg" className="m-0 p-0">
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
                </td>
                {/* <td>
					<AccountToolsDropdown
						account={account}
						menuHandler={this.props.menuHandler} />
				</td> */}
            </tr>
        )
    }

    renderItems() {
        const balances = this.props.balances
        return _.map(this.props.accounts, (account, accountNumber) => {
            return this.renderBalanceRow({
                account: account,
                balance: balances[parseInt(accountNumber)],
            })
        })
    }

    renderTotals() {
        const totals = this.props.walletTotals
        return (
            <tr key="totals" className="text-right">
                <th className="text-left">Total</th>
                <th>
                    <Amount amount={totals.spendable} />
                </th>
                <th>
                    <Amount amount={totals.total} />
                </th>
                <th className="text-secondary">
                    <Amount amount={totals.unconfirmed} />
                </th>
                <th className="text-secondary">
                    <Amount
                        amount={
                            totals.immature_coinbase + totals.immature_stake
                        }
                    />
                </th>
                <th className="text-secondary">
                    <Amount amount={totals.votingauth} />
                </th>
                <th className="text-secondary">
                    <Amount amount={totals.locked} />
                </th>
                <th></th>
            </tr>
        )
    }
}

interface StateProps {}

interface OwnProps {
    loading: boolean
    accounts: IndexedWalletAccounts
    balances: WalletBalance
    walletTotals: WalletTotals
    menuHandler: (evtKey: string, account: WalletAccount) => void
}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps

interface InternalState {}

const mapStateToProps = (state: IApplicationState): StateProps => {
    return {}
}

export default connect(mapStateToProps)(AccountBalanceTable)
