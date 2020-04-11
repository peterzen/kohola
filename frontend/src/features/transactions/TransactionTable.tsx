import * as React from "react"
import _ from "lodash"
import { connect } from "react-redux"

import TimeAgo from "react-timeago"
import { Table, Alert, Badge } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
// @ts-ignore
import Fade from "react-reveal/Fade"
import { TransitionGroup } from "react-transition-group"

import { Transaction, WalletAccount } from "../../middleware/models"
import { TransactionHash } from "../../components/Shared/shared"
import { lookupAccounts } from "../balances/accountSlice"
import { IApplicationState } from "../../store/types"
import { Amount } from "../../components/Shared/Amount"

export const TransactionMempoolStatusIcon: any = (props: {
    isMined: boolean
}) => {
    return (
        <span title="In the mempool" className="status-icon">
            {props.isMined ? "" : <FontAwesomeIcon icon={faClock} />}
        </span>
    )
}

const transitionGroupProps = {
    appear: true,
    enter: true,
    exit: true,
}

class TransactionTable extends React.Component<OwnProps> {
    render() {
        const showAccount = this.props.showAccount || false
        return (
            <div>
                {this.props.items.length > 0 && (
                    <Table hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Amount</th>
                                <th>Timestamp</th>
                                <th>Tx type</th>
                                <th>Hash</th>
                            </tr>
                        </thead>
                        <TransitionGroup
                            {...transitionGroupProps}
                            component="tbody"
                        >
                            {this.props.items.map((tx: Transaction) => (
                                <Fade slide cascade key={tx.getHash()}>
                                    <tr
                                        className="clickable"
                                        onClick={() =>
                                            this.props.onItemClick(tx)
                                        }
                                    >
                                        <td>
                                            <TransactionMempoolStatusIcon
                                                isMined={tx.isMined()}
                                            />
                                        </td>
                                        <td>
                                            <Amount
                                                amount={tx.getAmount()}
                                                rounding={6}
                                            />
                                        </td>
                                        {showAccount && (
                                            <td>
                                                {_.map(
                                                    this.props.lookupAccounts(
                                                        tx.getAccounts()
                                                    ),
                                                    (account) => {
                                                        if (
                                                            account == undefined
                                                        )
                                                            return null
                                                        return (
                                                            <Badge
                                                                key={account.getAccountName()}
                                                                variant="info"
                                                            >
                                                                {account.getAccountName()}
                                                            </Badge>
                                                        )
                                                    }
                                                )}
                                            </td>
                                        )}
                                        <td>
                                            <TimeAgo
                                                date={tx
                                                    .getTimestamp()
                                                    .toDate()}
                                            />
                                        </td>
                                        <td>{tx.getTypeAsString()}</td>
                                        <td>
                                            <TransactionHash tx={tx} />
                                        </td>
                                    </tr>
                                </Fade>
                            ))}
                        </TransitionGroup>
                    </Table>
                )}
                {this.props.items.length < 1 && (
                    <Alert variant="info">No transaction yet.</Alert>
                )}
            </div>
        )
    }
}

interface OwnProps {
    items: Transaction[]
    showAccount?: boolean
    onItemClick: (tx: Transaction) => void
    lookupAccounts: (accountNumbers: number[]) => WalletAccount[]
}

const mapStateToProps = (state: IApplicationState) => {
    return {
        lookupAccounts: (accountNumbers: number[]) => {
            return lookupAccounts(state, accountNumbers)
        },
    }
}

export default connect(mapStateToProps)(TransactionTable)
