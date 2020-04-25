import * as React from "react"
import { connect } from "react-redux"
import _, { chain } from "lodash"

import { Row, Col } from "react-bootstrap"
import { ChartTimeframe } from "../../components/Shared/IntervalChooser"
import { IApplicationState } from "../../store/types"
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, BarChart, styler } from "react-timeseries-charts";
import { TimeSeries, Collection, IndexedEvent, TimeEvent, TimeRange, count, sum, Pipeline, TimeRangeEvent, EventOut } from "pondjs"


import { getChartData } from "./mixerSlice"
import { ATOMS_DIVISOR } from "../../constants"

class MixerStatsChart extends React.PureComponent<Props, InternalState> {
	render() {
		if (this.props.chartData == undefined) return null
		if (this.props.chartData.range() == undefined) return null

		const style = styler([
			{ key: "tx_count", color: "#A5C8E1" },
			{ key: "value_sum", color: "orange" },
		])
		return (

			<div className="p-3">
				<Resizable>
					<ChartContainer
						timeRange={this.props.chartData.timerange()}
						// showGrid={true}

						enablePanZoom={true}
						width={800}>
						<ChartRow height="400">
							<YAxis
								id="tx-count-axis"
								label="# of transactions"
								min={0}
								max={this.props.chartData.max("tx_count")}
								width="60"
								type="linear"
								format="d" />
							<Charts>
								<LineChart
									axis="tx-count-axis"
									smooth={true}
									series={this.props.chartData}
									style={style}
									columns={["tx_count"]}
									yScale={() => 1}
								/>
								<BarChart
									axis="value-sum-axis"
									style={style}
									series={this.props.chartData}
									columns={["value_sum"]}
									yScale={() => 1}
								/>
							</Charts>
							<YAxis
								id="value-sum-axis"
								label="Value"
								min={0}
								max={0.01}
								width="80"
								type="linear"
								format="d" />
						</ChartRow>
					</ChartContainer>
				</Resizable>
			</div>
		)
	}
}

interface InternalState {
}

interface OwnProps {
	timeframe: ChartTimeframe
	// stakingHistory: StakingHistory.StakingHistoryLineItem[]
}

interface StateProps {
	chartData: TimeSeries
	// txTypeCounts: ITxTypeCountsChartdataTimelineItem[]
	// rewardData: IRewardDataChartdataTimelineItem[]
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps & StateProps

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps): StateProps => {
	// const stakingHistory = getFilteredTransactions(state, days)


	const chain = getChartData(state, ownProps.timeframe.days)
	// if (chain == undefined) {
	// 	return null
	// }

	const events = _.map(chain.value(), t => new TimeEvent(t.getTimestamp(), {
		denomination: t.getAmount() / ATOMS_DIVISOR,
	}))
	const collection = new Collection(events, false)

	const series = new TimeSeries({
		name: "denoms",
		columns: ["time", "value"],
		collection: collection.sortByTime()
	})
	console.log("SERIES", series)

	const rollup = series.fixedWindowRollup({
		windowSize: "1d",
		toTimeEvents: false,
		aggregation: {
			tx_count: { denomination: count() },
			value_sum: { denomination: sum() },
		}
	})

	console.log("ROLLUP", rollup)

	return {
		chartData: rollup
	}
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MixerStatsChart)
