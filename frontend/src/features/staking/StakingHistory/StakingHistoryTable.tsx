import * as React from "react"
import _ from "lodash"
import moment from "../../../helpers/moment-helper"

import { Table } from "react-bootstrap"
import ReactTimeago from "react-timeago"
import { TransitionGroup } from "react-transition-group"
// @ts-ignore
import Fade from "react-reveal/Fade"

import { Amount } from "../../../components/Shared/Amount"
import { TransactionType, transitionGroupProps } from "../../../constants"
import { rawHashToHex } from "../../../helpers/byteActions"
import { StakingHistory } from "../../../proto/walletgui_pb"

export default class StakingHistoryTable extends React.Component<Props> {
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th className="text-secondary">TxType</th>
                        <th className="text-secondary">Timestamp</th>
                        <th className="text-secondary">RewardCredit</th>
                        <th className="text-secondary">TicketCostCredit</th>
                        <th className="text-secondary">TicketCostDebit</th>
                        <th className="text-secondary">FeeDebit</th>
                    </tr>
                </thead>
                <TransitionGroup {...transitionGroupProps} component="tbody">
                    {this.props.stakingHistory.map((item) => (
                        <Fade
                            slide
                            cascade
                            key={rawHashToHex(item.getTxHash_asU8()) || ""}>
                            <tr>
                                <td>{TransactionType[item.getTxType()]}</td>
                                <td>
                                    <ReactTimeago
                                        date={moment
                                            .unix(item.getTimestamp())
                                            .toDate()}
                                    />
                                </td>
                                <td>
                                    <Amount
                                        amount={item.getRewardCredit()}
                                        showCurrency={false}
                                    />
                                </td>
                                <td>
                                    <Amount
                                        amount={item.getTicketCostCredit()}
                                        showCurrency={false}
                                    />
                                </td>
                                <td>
                                    <Amount
                                        amount={item.getTicketCostDebit()}
                                        showCurrency={false}
                                    />
                                </td>
                                <td>
                                    <Amount
                                        amount={item.getFeeDebit()}
                                        showCurrency={false}
                                    />
                                </td>
                            </tr>
                        </Fade>
                    ))}
                </TransitionGroup>
            </Table>
        )
    }
}

interface OwnProps {
    stakingHistory: StakingHistory.StakingHistoryLineItem[]
}

interface DispatchProps {}

type Props = OwnProps
