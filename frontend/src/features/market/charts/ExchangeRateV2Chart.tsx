import React from "react";
import _ from "lodash"
import { connect } from "react-redux"

// @ts-ignore
import { Collection, TimeSeries, TimeEvent, IndexedEvent, TimeRange, count, sum } from "pondjs"
import { Charts, ChartContainer, ChartRow, YAxis, LineChart, Resizable, AreaChart, BarChart, Legend, styler } from "react-timeseries-charts"

import { ChartDataPoint, fetchExchangeChartData, getExchangeChartData, getMarketChartData, makeTimerange, getMarketCurrencyState } from "../marketSlice"
import { IApplicationState, AppError } from "../../../store/types"
import { GetMarketChartResponse } from "../../../proto/walletgui_pb";
import { Card, Alert } from "react-bootstrap";
import { ErrorAlert } from "../../../components/Shared/FormStatusAlerts";
import { sprintf } from "sprintf-js";


const style = styler([
	{ key: "btc", color: "#7ebdb4" },
	{ key: "usd", color: "#862a5c" },
	{ key: "eur", color: "#f4a548" },
	{ key: "default", color: "#f6d198" },
])



// TODO
// https://github.com/esnet/react-timeseries-charts/blob/master/src/website/packages/charts/examples/currency/Index.js



class ExchangeRateChartv2 extends React.Component<Props, InternalState>{
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
		this.setState({ mode: "linear" });
	}

	setModeLog = () => {
		this.setState({ mode: "log" });
	}

	handleTrackerChanged = (tracker: any) => {
		if (!tracker) {
			this.setState({ tracker, x: null, y: null });
		} else {
			this.setState({ tracker });
		}
	};

	handleTimeRangeChange = (timerange: any) => {
		this.setState({ timerange });
	};

	handleMouseMove = (x: any, y: any) => {
		this.setState({ x, y });
	}

	f(n: number) {
		return sprintf("%.6f", n)
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
			timerange,
			priceSeries,
			// volumeSeries
		} = this.props

		return (
			<div>
				{priceSeries == undefined || priceSeries.count() < 1 && (
					<Alert variant="secondary">price series</Alert>
				)}

				{priceSeries != undefined && priceSeries.count() > 0 && (
					<div>
						<Resizable>
							<ChartContainer
								timeRange={priceSeries.timerange()}
								hideWeekends={false}
								timeAxisAngledLabels={true}
								timeAxisHeight={65}
								enablePanZoom={true}

								showGrid={false}
								maxTime={priceSeries.timerange().end()}
								minTime={priceSeries.timerange().begin()}
								onTrackerChanged={this.handleTrackerChanged}
								onBackgroundClick={() => this.setState({ selection: null })}
								onTimeRangeChanged={this.handleTimeRangeChange}
								onMouseMove={(x, y) => this.handleMouseMove(x, y)}
								minDuration={1000 * 60 * 60 * 24 * 30}
							// timeAxisStyle={{ axis: { fill: "none", stroke: "none" } }}
							>
								<ChartRow height="300">
									{this.props.currencies.map(currency => (
										<YAxis
											key={currency}
											id={`axis-${currency}`}
											label={`${currency}`}
											min={priceSeries.min(currency)}
											max={priceSeries.max(currency)}
											format=",.0f"
											width="60"
											type={this.state.mode}
										/>
									))}
									<Charts>
										{this.props.currencies.map(currency => (
											<LineChart
												key={currency}
												axis={`axis-${currency}`}
												style={style}
												breakLine={false}
												// style={{ value: { normal: { stroke: "steelblue" } } }}
												columns={[currency]}
												series={priceSeries}
												interpolation="curveBasis"

												highlight={this.state.highlight}
												onHighlightChange={highlight =>
													this.setState({ highlight })
												}
												selection={this.state.selection}
												onSelectionChange={selection =>
													this.setState({ selection })
												}
											/>
										))}
										<CrossHairs x={this.state.x} y={this.state.y} />
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
						<div >
							<Legend
								type="line"
								align="right"
								style={style}
								highlight={this.state.highlight}
								onHighlightChange={highlight => this.setState({ highlight })}
								selection={this.state.selection}
								onSelectionChange={selection => this.setState({ selection })}
								categories={_.map(this.props.currencies, c => Object.assign({}, {
									key: c,
									label: `DCR-${c.toUpperCase()}`,
									value: (this.getTrackedValue(this.props.priceSeries, c) || "") + " "
								}))}
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
			cursor: "default"
		}

		const linkStyleActive = {
			color: "steelblue",
			cursor: "pointer"
		}

		return (
			<div>
				<div>
					<span
						style={this.state.mode === "log" ? linkStyleActive : linkStyle}
						onClick={this.setModeLinear}
					>
						Linear
                        </span>
					<span> | </span>
					<span
						style={this.state.mode === "linear" ? linkStyleActive : linkStyle}
						onClick={this.setModeLog}
					>
						Log
                        </span>
				</div>

				<div className="">
					{this.renderChart()}
				</div>
				{/* <ErrorAlert error={this.props.error} /> */}
			</div>
		)
	}

	shouldComponentUpdate(nextProps: Props, nextState: any) {
		return nextProps.priceSeries != undefined
	}

	componentDidMount() {
		_.each(this.props.currencies, currency => this.props.fetchExchangeChartData(currency, this.props.days))
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
	const timerange = makeTimerange(ownProps.days)

	const seriesList = _.compact(_.map(ownProps.currencies, currency =>
		getMarketCurrencyState(state, currency)?.priceSeries))

	const combinedSeries = TimeSeries.timeSeriesListMerge({
		name: "combined",
		seriesList: seriesList,
	})

	// const currencyData = getMarketCurrencyState(state, ownProps.currencyCode)

	// if (currencyData == undefined) return {}
	// console.log("currencyData", currencyData)
	// const priceSeries = getPriceSeries(currencyData.marketPriceData)
	// const volumeSeries = getVolumeSeries(exchangeRateData)


	// let croppedSeries
	// if (priceSeries.count()) {
	// 	croppedSeries = priceSeries.crop(timerange)
	// }
	debugger
	return {
		// error: currencyData.getMarketChartError,
		timerange: timerange,
		priceSeries: combinedSeries,
		// volumeSeries: currencyData.volumeSeries,
	}
}

const mapDispatchToProps = {
	fetchExchangeChartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateChartv2)



class CrossHairs extends React.Component {
	render() {
		// @ts-ignore 
		const { x, y } = this.props;
		const style = { pointerEvents: "none", stroke: "#ccc" };
		if (!_.isNull(x) && !_.isNull(y)) {
			return (
				<g>
					<line style={style} x1={0} y1={y} x2={this.props.width} y2={y} />
					<line style={style} x1={x} y1={0} x2={x} y2={this.props.height} />
				</g>
			)
		} else {
			return <g />
		}
	}
}
