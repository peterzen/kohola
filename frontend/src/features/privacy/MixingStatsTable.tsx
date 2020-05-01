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
import { lookupAccounts } from "../balances/accountSlice"
import { IApplicationState } from "../../store/types"
import { Amount } from "../../components/Shared/Amount"
import TransactionMempoolStatusIcon from "../transactions/TransactionMempoolStatusIcon"
import TransactionHash from "../transactions/TransactionHash"
import { isTxMixed } from "../transactions/transactionsSlice"

const transitionGroupProps = {
    appear: true,
    enter: true,
    exit: true,
}

class MixingStatsTable extends React.Component<Props> {
    render() {
		const showAccount = this.props.showAccount || false
		const txList = this.props.transactions
        return (
            <div>
                {txList.length > 0 && (
                    <Table hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th className="text-secondary">Denomination</th>
                                <th className="text-secondary">Timestamp</th>
                                <th className="text-secondary">Hash</th>
                            </tr>
                        </thead>
                        <TransitionGroup
                            {...transitionGroupProps}
                            component="tbody"
                        >
                            {txList.map((tx: Transaction) => (
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
                                        <td>
                                            <TimeAgo
                                                date={tx
                                                    .getTimestamp()
                                                    .toDate()}
                                            />
                                        </td>
                                        <td>
                                            <TransactionHash tx={tx} />
                                        </td>
                                    </tr>
                                </Fade>
                            ))}
                        </TransitionGroup>
                    </Table>
                )}
                {/* {this.props.items.length < 1 && (
                    <Alert variant="info">No transaction yet.</Alert>
                )} */}
            </div>
        )
    }
}


interface StateProps {
    isTxMixed: (tx: Transaction) => boolean
    lookupAccounts: (accountNumbers: number[]) => WalletAccount[]
}

interface OwnProps {
    transactions: Transaction[]
    showAccount?: boolean
    onItemClick: (tx: Transaction) => void
}

type Props = StateProps & OwnProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    return {
        isTxMixed: (tx: Transaction) => {
            return isTxMixed(state, tx)
        },
        lookupAccounts: (accountNumbers: number[]) => {
            return lookupAccounts(state, accountNumbers)
        },
    }
}

export default connect(mapStateToProps)(MixingStatsTable)
