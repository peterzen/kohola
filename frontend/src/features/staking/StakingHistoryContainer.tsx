import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

// @ts-ignore
import Fade from "react-reveal/Fade"
import { Card, Row, Col, Dropdown } from "react-bootstrap"
import IntervalChooser, { ChartTimeframe, defaultTimeframe, stakingTimeframes } from "../market/IntervalChooser"
import { IApplicationState } from "../../store/types"

import { StakingHistory } from "../../proto/walletgui_pb"
import StakingHistoryTable from "./StakingHistoryTable"
import { getOrderedStakingHistory ,
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
  
class StakingHistoryContainer extends React.PureComponent<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			selectedTimeframe: defaultTimeframe,
		}
	}

	render() {
		return (
			<Card>
				<Card.Header>
					<div className="float-right">
						<IntervalChooser
							onChange={(timeframe: ChartTimeframe) => this.setState({ selectedTimeframe: timeframe })}
							selectedValue={this.state.selectedTimeframe}
						/>
					</div>
					<Card.Title>Staking returns</Card.Title>
				</Card.Header>
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
				<StakingHistoryTable stakingHistoryItems={this.props.getHistory(this.state.selectedTimeframe)} />
			</Card>

		)
	}
}

interface InternalState {
	selectedTimeframe: ChartTimeframe
}

interface OwnProps {
	getHistory: (timeframe: ChartTimeframe) => StakingHistory.StakingHistoryLineItem[]
        txTypeCounts: ITxTypeCountsChartdataTimelineItem[]
    rewardData: IRewardDataChartdataTimelineItem[]
}

interface DispatchProps {
onTimeFrameChanged: typeof onTimeFrameChanged
  }

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState) => {
      const stakingHistory = getStakingHistorySparklineData(
        state,
        state.staking.selectedTimeframe.days
    )

    return {
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
		getHistory: (timeframe: ChartTimeframe) => {
			return getOrderedStakingHistory(state, timeframe.days)
		}
	}
}

const mapDispatchToProps = {
    onTimeFrameChanged,
}

export default connect(mapStateToProps, mapDispatchToProps)(StakingHistoryContainer)
