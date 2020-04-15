import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import _ from "lodash"

import {
    loadStakingHistory,
    getStakingHistorySparklineData,
    ITxTypeCountsChartdataTimelineItem,
    getStakingHistoryCountEvents,
    IRewardDataChartdataTimelineItem,
    getStakingHistoryRewardData,
} from "./stakingSlice"
import { StakingHistory } from "../../proto/walletgui_pb"
import { AppError, IApplicationState } from "../../store/types"
import { Table, Card, Row, Col } from "react-bootstrap"
import ReactTimeago from "react-timeago"
import { Amount } from "../../components/Shared/Amount"
import { TransactionType, ATOMS_DIVISOR } from "../../constants"
import { rawHashToHex } from "../../helpers/byteActions"

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"
import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)

// @TODO add dropdown to control this
const days = 7

class StakingHistoryTable extends React.Component<Props> {
    render() {
        const rewardData = this.props.rewardData.map(item => {
            return {
                ...item,
                sumRewardCredits: item.sumRewardCredits / ATOMS_DIVISOR
            }
        })
        return (
            <Card>
                <Card.Header>
                    <Card.Title>Staking returns</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col sm={6}>
                            <div style={{ width: "100%", height: "250px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={rewardData}
                                        margin={{
                                            top: 0,
                                            right: 0,
                                            left: 20,
                                            bottom: 0,
                                        }}
                                    >
                                        <XAxis
                                            dataKey="timestamp"
                                            minTickGap={20}
                                        />
                                        <YAxis domain={["auto", "auto"]} />
                                        <Line
                                            type="monotone"
                                            dataKey="sumRewardCredits"
                                            dot={false}
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="rewardPercent"
                                            dot={false}
                                            stroke="#82ca9d"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div style={{ width: "100%", height: "250px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={this.props.txTypeCounts}
                                        margin={{
                                            top: 0,
                                            right: 0,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <XAxis
                                            dataKey="timestamp"
                                            minTickGap={20}
                                        />
                                        <YAxis domain={["auto", "auto"]} />
                                        <Line
                                            type="monotone"
                                            dataKey="voteCounts"
                                            dot={false}
                                            stroke="#8884d8"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="purchasedCounts"
                                            dot={false}
                                            stroke="#82ca9d"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="revocationCounts"
                                            dot={false}
                                            stroke="#ff7300"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
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
    componentDidMount() {
        this.props.loadStakingHistory(moment.default().unix(), moment.default().subtract("days",17).unix())
    }
}

interface OwnProps {
    stakingHistory: StakingHistory | null
    getStakingHistoryError: AppError | null
    getStakingHistoryAttempting: boolean
    txTypeCounts: ITxTypeCountsChartdataTimelineItem[]
    rewardData: IRewardDataChartdataTimelineItem[]
}

interface DispatchProps {
    loadStakingHistory: typeof loadStakingHistory
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    const stakingHistory = getStakingHistorySparklineData(state, days)

    return {
        stakingHistory: state.staking.stakingHistory,
        getStakingHistoryError: state.staking.getStakingHistoryError,
        getStakingHistoryAttempting: state.staking.getStakingHistoryAttempting,
        txTypeCounts: getStakingHistoryCountEvents(stakingHistory, days),
        rewardData: getStakingHistoryRewardData(stakingHistory, days),
    }
}

const mapDispatchToProps = {
    loadStakingHistory,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StakingHistoryTable)
)