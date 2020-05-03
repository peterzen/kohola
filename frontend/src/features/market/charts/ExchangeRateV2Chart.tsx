import React from "react"
import _ from "lodash"
import { connect } from "react-redux"

import { Alert } from "react-bootstrap"
import { sprintf } from "sprintf-js"

import {
	TimeSeries,
	TimeRange,
} from "pondjs"

import {
	Charts,
	ChartContainer,
	ChartRow,
	YAxis,
	LineChart,
	Resizable,
	Legend,
	styler,
} from "react-timeseries-charts"

import {
	fetchExchangeChartData,
	getMarketCurrencyState,
} from "../marketSlice"

import { IApplicationState } from "../../../store/types"
import { CrossHairs } from "./CrossHairs"
import { makeTimerange } from "../../../helpers/pondjs"

const style = styler([
	{ key: "btc", color: "#7ebdb4" },
	{ key: "usd", color: "#862a5c" },
	{ key: "eur", color: "#f4a548" },
	{ key: "default", color: "#f6d198" },
])

// TODO
// https://github.com/esnet/react-timeseries-charts/blob/master/src/website/packages/charts/examples/currency/Index.js

class ExchangeRateChartv2 extends React.Component<Props, InternalState> {
	state = {
		x: null,
		y: null,
		mode: "linear",
		tracker: null,
		timerange: null,
		selection: null,
		highlight: null,
	}

	setModeLinear = () => {
		this.setState({ mode: "linear" })
	}

	setModeLog = () => {
		this.setState({ mode: "log" })
	}

	handleTrackerChanged = (tracker: Date | null) => {
		if (!tracker) {
			this.setState({ tracker, x: null, y: null })
		} else {
			this.setState({ tracker })
		}
	}

	handleTimeRangeChange = (timerange: TimeRange) => {
		this.setState({ timerange })
	}

	handleMouseMove = (x: number | null, y: number | null) => {
		this.setState({ x, y })
	}

	f(n: number) {
		return sprintf("%.6f", n || 0)
	}

	getTrackedValue(series: TimeSeries, currency: string) {
		if (this.state.tracker != null) {
			const index = series.bisect(this.state.tracker!)
			const trackerEvent = series.at(index)
			return this.f(trackerEvent.get(currency))
		}
		return
	}

	renderChart = () => {
		const {
			priceSeries,
			// volumeSeries
		} = this.props

		const timerange = priceSeries.timerange()

		return (
			<div>
				{/* {priceSeries == undefined ||
					(priceSeries.count() < 1 && (
						<Alert variant="secondary">price series</Alert>
					))} */}

				{priceSeries != undefined && priceSeries.count() > 0 && (
					<div>
						<Resizable>
							<ChartContainer
								timeRange={timerange}
								hideWeekends={false}
								timeAxisAngledLabels={true}
								timeAxisHeight={65}
								enablePanZoom={true}
								showGrid={false}
								maxTime={timerange.end()}
								minTime={timerange.begin()}
								onTrackerChanged={this.handleTrackerChanged}
								onBackgroundClick={() =>
									this.setState({ selection: null })
								}
								onTimeRangeChanged={this.handleTimeRangeChange}
								onMouseMove={(x: number, y: number) =>
									this.handleMouseMove(x, y)
								}
								minDuration={1000 * 60 * 60 * 24 * 30}
							// timeAxisStyle={{ axis: { fill: "none", stroke: "none" } }}
							>
								<ChartRow height="300">
									{this.props.currencies.map((currency) => (
										<YAxis
											key={currency}
											id={`axis-${currency}`}
											label={`${currency}`}
											min={priceSeries.min(currency)}
											max={priceSeries.max(currency)}
											format=",.0f"
											width="0"
											type={this.state.mode}
											visible={false}
										/>
									))}
									<Charts>
										{this.props.currencies.map(
											(currency) => (
												<LineChart
													key={currency}
													axis={`axis-${currency}`}
													style={style}
													breakLine={false}
													// style={{ value: { normal: { stroke: "steelblue" } } }}
													columns={[currency]}
													series={priceSeries}
													interpolation="curveBasis"
													highlight={
														this.state.highlight
													}
													onHighlightChange={(
														highlight: string
													) =>
														this.setState({
															highlight,
														})
													}
													selection={
														this.state.selection
													}
													onSelectionChange={(
														selection: string
													) =>
														this.setState({
															selection,
														})
													}
												/>
											)
										)}
										<CrossHairs
											x={this.state.x!}
											y={this.state.y!}
										/>
									</Charts>
								</ChartRow>
								{/* <ChartRow height="120" axisMargin={0}>
									<Charts>
										<LineChart
											axis="volume-axis"
											style={{ volume: { normal: { fill: "steelblue" } } }}
											columns={["volume"]}
											series={volumeSeries}
										/>
									</Charts>
									<YAxis
										id="volume-axis"
										label="Volume"
										min={volumeSeries.min("volume")}
										max={volumeSeries.max("volume")}
										width="60"
									/>
								</ChartRow> */}
							</ChartContainer>
						</Resizable>
						<div>
							<Legend
								type="line"
								align="right"
								style={style}
								highlight={this.state.highlight}
								onHighlightChange={(highlight: string) =>
									this.setState({ highlight })
								}
								selection={this.state.selection}
								onSelectionChange={(selection: string) =>
									this.setState({ selection })
								}
								categories={_.map(this.props.currencies, (c) =>
									Object.assign(
										{},
										{
											key: c,
											label: `DCR-${c.toUpperCase()}`,
											value:
												(this.getTrackedValue(
													this.props.priceSeries,
													c
												) || "") + " ",
										}
									)
								)}
							/>
						</div>
					</div>
				)}
			</div>
		)
	}

	render() {
		const linkStyle = {
			fontWeight: 600,
			color: "grey",
			cursor: "default",
		}

		const linkStyleActive = {
			color: "steelblue",
			cursor: "pointer",
		}

		return (
			<div>
				<div className="text-right mr-4">
					<span style={
						this.state.mode === "log"
							? linkStyleActive
							: linkStyle}
						onClick={this.setModeLinear}
					>
						Linear
                    </span>
					<span> | </span>
					<span
						style={
							this.state.mode === "linear"
								? linkStyleActive
								: linkStyle
						}
						onClick={this.setModeLog}
					>
						Log
                    </span>
				</div>

				<div className="">{this.renderChart()}</div>
				{/* <ErrorAlert error={this.props.error} /> */}
			</div>
		)
	}

	// shouldComponentUpdate(nextProps: Props, nextState: any) {
	// 	return nextProps.priceSeries != undefined
	// }

	componentDidMount() {
		_.each(this.props.currencies, (currency) =>
			this.props.fetchExchangeChartData(currency, this.props.days)
		)
	}
}

interface OwnProps {
	days: number
	currencies: string[]
	currencyCode: string
}

interface StateProps {
	timerange: TimeRange
	priceSeries: TimeSeries
	// volumeSeries: TimeSeries
	// error: AppError | null
}

interface DispatchProps {
	fetchExchangeChartData: typeof fetchExchangeChartData
}

type Props = OwnProps & StateProps & DispatchProps

interface InternalState {
	x: number | null
	y: number | null
	mode: string
	tracker: Date | null
	timerange: TimeRange | null

	selection: string | null
	highlight: string | null
}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
	debugger
	const timerange = makeTimerange(ownProps.days)

	const seriesList = _.compact(
		_.map(
			ownProps.currencies,
			(currency) => getMarketCurrencyState(state, currency)?.priceSeries
		)
	)

	let combinedSeries = TimeSeries.timeSeriesListMerge({
		name: "combined",
		seriesList: seriesList,
	})

	console.log("timerange", timerange.humanize())
	if (combinedSeries.count() > 0) {
		combinedSeries = combinedSeries.crop(timerange)
	}
	return {
		// error: currencyData.getMarketChartError,
		timerange: timerange,
		priceSeries: combinedSeries,
		// priceSeries: combinedSeries.crop(timerange),
		// volumeSeries: currencyData.volumeSeries,
	}
}

const mapDispatchToProps = {
	fetchExchangeChartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateChartv2)
