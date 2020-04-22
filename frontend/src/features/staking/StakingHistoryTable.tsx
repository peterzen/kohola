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
    onTimeFrameChanged,
    aggregateChartDataBy,
    sumTxTypeCountsChartdata,
    sumRewardDataChartdata,
} from "./stakingSlice"
import { StakingHistory } from "../../proto/walletgui_pb"
import { AppError, IApplicationState } from "../../store/types"
import { Table, Card, Row, Col } from "react-bootstrap"
import ReactTimeago from "react-timeago"
import { Amount } from "../../components/Shared/Amount"
import { TransactionType, ATOMS_DIVISOR } from "../../constants"
import { rawHashToHex } from "../../helpers/byteActions"

import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Legend,
} from "recharts"
import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import IntervalChooser, {
    ChartTimeframe,
    stakingTimeframes,
} from "../market/IntervalChooser"

class StakingHistoryTable extends React.Component<Props> {
    render() {
        const rewardData = this.props.rewardData.map((item) => {
            return {
                ...item,
                sumRewardCredits: item.sumRewardCredits / ATOMS_DIVISOR,
            }
        })
        return (
            <Card>
                <Card.Header>
                    <Card.Title>Staking returns</Card.Title>
                </Card.Header>
                <Card.Body>
                    <div className="text-right">
                        <IntervalChooser
                            onChange={this.props.onTimeFrameChanged}
                            timeframes={stakingTimeframes}
                            selectedValue={this.props.selectedTimeframe}
                        />
                    </div>
                    <Row>
                        <Col sm={6}>
                            <div style={{ width: "100%", height: "250px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={rewardData}
                                        margin={{
                                            top: 0,
                                            right: 0,
                                            left: 20,
                                            bottom: 0,
                                        }}
                                    >
                                        <XAxis dataKey="timestamp" />
                                        <YAxis
                                            domain={["auto", "auto"]}
                                            yAxisId="left"
                                            orientation="left"
                                            stroke="#8884d8"
                                        />
                                        <YAxis
                                            domain={["auto", "auto"]}
                                            yAxisId="right"
                                            orientation="right"
                                            stroke="#82ca9d"
                                        />
                                        <Bar
                                            dataKey="sumRewardCredits"
                                            fill="#8884d8"
                                            name="Sum(RewardCredit)"
                                            yAxisId="left"
                                        />
                                        <Bar
                                            dataKey="rewardPercent"
                                            fill="#82ca9d"
                                            name="Return%"
                                            yAxisId="right"
                                        />
                                        <Legend />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div style={{ width: "100%", height: "250px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
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
                                        <Bar
                                            dataKey="voteCounts"
                                            fill="#8884d8"
                                            name="VOTE"
                                        />
                                        <Bar
                                            dataKey="purchasedCounts"
                                            fill="#82ca9d"
                                            name="TICKET_PURCHASE"
                                        />
                                        <Bar
                                            dataKey="revocationCounts"
                                            fill="#ff7300"
                                            name="REVOCATION"
                                        />
                                        <Legend />
                                    </BarChart>
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
    selectedTimeframe: ChartTimeframe
    txTypeCounts: ITxTypeCountsChartdataTimelineItem[]
    rewardData: IRewardDataChartdataTimelineItem[]
}

interface DispatchProps {
    loadStakingHistory: typeof loadStakingHistory
    onTimeFrameChanged: typeof onTimeFrameChanged
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    const stakingHistory = getStakingHistorySparklineData(
        state,
        state.staking.selectedTimeframe.days
    )

    return {
        stakingHistory: state.staking.stakingHistory,
        getStakingHistoryError: state.staking.getStakingHistoryError,
        getStakingHistoryAttempting: state.staking.getStakingHistoryAttempting,
        selectedTimeframe: state.staking.selectedTimeframe,
        txTypeCounts: aggregateChartDataBy(
            state.staking.selectedTimeframe,
            getStakingHistoryCountEvents(
                stakingHistory,
                state.staking.selectedTimeframe.days
            ),
            sumTxTypeCountsChartdata
        ),
        rewardData: aggregateChartDataBy(
            state.staking.selectedTimeframe,
            getStakingHistoryRewardData(
                stakingHistory,
                state.staking.selectedTimeframe.days
            ),
            sumRewardDataChartdata
        ),
    }
}

const mapDispatchToProps = {
    loadStakingHistory,
    onTimeFrameChanged,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StakingHistoryTable)
)
