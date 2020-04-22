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
import { Card, Row, Col } from "react-bootstrap"
import { ATOMS_DIVISOR } from "../../constants"

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
import StakingHistoryTable from "./StakingHistoryTable"

class StakingHistoryContainer extends React.Component<Props> {
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
                <StakingHistoryTable />
            </Card>
        )
    }
    componentDidMount() {
        this.props.loadStakingHistory(
            moment.default().unix(),
            moment.default().subtract("days", this.props.selectedTimeframe.days).unix()
        )
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
    connect(mapStateToProps, mapDispatchToProps)(StakingHistoryContainer)
)
