import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import _ from "lodash"

import { loadStakingHistory } from "./stakingSlice"
import { StakingHistory } from "../../proto/walletgui_pb"
import { IApplicationState } from "../../store/types"
import { Table, Card } from "react-bootstrap"
import ReactTimeago from "react-timeago"
import { Amount } from "../../components/Shared/Amount"
import { TransactionType } from "../../constants"
import { rawHashToHex } from "../../helpers/byteActions"

import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)

class StakingHistoryTable extends React.Component<Props> {
    render() {
        return (
            <Card>
                <Table>
                    <thead>
                        <tr>
                            <th>TxType</th>
                            <th>Timestamp</th>
                            <th>RewardCredit</th>
                            <th>TicketCostCredit</th>
                            <th>TicketCostDebit</th>
                            <th>FeeDebit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.stakingHistory
                            ?.getLineItemsList()
                            .map((item) => (
                                <tr
                                    key={
                                        rawHashToHex(item.getTxHash_asU8()) ||
                                        ""
                                    }
                                >
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
                            ))}
                    </tbody>
                </Table>
            </Card>
        )
    }
}

interface OwnProps {
    stakingHistory: StakingHistory | null
}

type Props = OwnProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        stakingHistory: state.staking.stakingHistory,
    }
}

const mapDispatchToProps = {
    loadStakingHistory,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StakingHistoryTable)
)
