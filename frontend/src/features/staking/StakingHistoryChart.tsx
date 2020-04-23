import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Row, Col } from "react-bootstrap"
import { ChartTimeframe } from "../../components/Shared/IntervalChooser"
import { IApplicationState } from "../../store/types"

import { StakingHistory } from "../../proto/walletgui_pb"
import {
	ITxTypeCountsChartdataTimelineItem,
	getStakingHistoryCountEvents,
	IRewardDataChartdataTimelineItem,
	getStakingHistoryRewardData,
	onTimeFrameChanged,
	aggregateChartDataBy,
	sumTxTypeCountsChartdata,
	sumRewardDataChartdata,
} from "./stakingSlice"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Legend } from "recharts"

class StakingHistoryChart extends React.PureComponent<Props, InternalState> {
	render() {
		const rewardData = this.props.rewardData
		return (
			<Row>
				<Col sm={6}>
					<div style={{ width: "100%", height: "250px" }} className="p-2">
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
								/>
								<YAxis
									domain={["auto", "auto"]}
									yAxisId="right"
									orientation="right"
								/>
								<Bar
									dataKey="sumRewardCredits"
									fill="#8884d8"
									name="Σ Reward"
									yAxisId="left"
								/>
								<Bar
									dataKey="rewardPercent"
									fill="#82ca9d"
									name="ROI %"
									yAxisId="right"
								/>
								<Legend />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</Col>
				<Col sm={6}>
					<div style={{ width: "100%", height: "250px" }} className="p-2">
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
		)
	}
}

interface InternalState {
}

interface OwnProps {
	timeframe:ChartTimeframe
	stakingHistory: StakingHistory.StakingHistoryLineItem[]
}

interface StateProps {
	txTypeCounts: ITxTypeCountsChartdataTimelineItem[]
	rewardData: IRewardDataChartdataTimelineItem[]
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps&StateProps

const mapStateToProps = (state: IApplicationState, ownProps:OwnProps) :StateProps=> {
	return {
		txTypeCounts: aggregateChartDataBy(
			state.staking.selectedTimeframe,
			getStakingHistoryCountEvents(
				ownProps.stakingHistory,
				ownProps.timeframe.days
			),
			sumTxTypeCountsChartdata
		),
		rewardData: aggregateChartDataBy(
			state.staking.selectedTimeframe,
			getStakingHistoryRewardData(
				ownProps.stakingHistory,
				ownProps.timeframe.days
			),
			sumRewardDataChartdata
		),
	}
}

const mapDispatchToProps = {
	onTimeFrameChanged,
}

export default connect(mapStateToProps, mapDispatchToProps)(StakingHistoryChart)
