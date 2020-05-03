import React, { PureComponent } from "react"
import { connect } from "react-redux"

import { Card } from "react-bootstrap"

import { TimeSeries, sum, TimeEvent } from "pondjs"
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable,
    BarChart,
    styler,
} from "react-timeseries-charts"

import { WalletTotals } from "../../middleware/models"
import { IApplicationState } from "../../store/types"
import { makeTxHistoryChartSeries } from "../transactions/transactionsSlice"
import { timeframes, ChartTimeframe } from "../../components/Shared/IntervalChooser"
import { colorScheme } from "../staking/StakingHistory/StakingHistoryChart"
import { sprintf } from "sprintf-js"


const style = styler([
    { key: "credit", color: colorScheme[3], width: 5 },
    { key: "debit", color: colorScheme[1] },
    { key: "credit_sum", color: colorScheme[3], width: 5 },
    { key: "value_sum", color: colorScheme[1] },
])

function f(n: number) {
    return sprintf("%.6f", n || 0)
}

class BalanceHistoryChart extends PureComponent<Props> {
    render() {
        const series = this.props.series
        return (
            <div>
                {series != undefined && (
                    <Resizable>
                        <ChartContainer
                            timeRange={series.timerange()}
                            // showGrid={true}
                            padding={0}
                            timeAxisTickCount={5}
                            timeAxisHeight={0}
                            hideTimeAxis={true}
                            timeAxisStyle={{ axis: { display: "none" } }}
                            enablePanZoom={false}
                        >
                            <ChartRow height="100">
                                <YAxis
                                    id="y"
                                    label="Amount"
                                    min={series.min("value_sum")}
                                    max={series.max("value_sum")}
                                    width={0}
                                    type="linear"
                                    hideAxisLine={true}
                                    visible={false}
                                    // format="d"
                                    format=",.0f"

                                />
                                <Charts>
                                    {/* <BarChart
                                            axis="y"
                                            style={style}
                                            series={series}
                                            columns={["debit_sum"]}

                                        /> */}
                                    <BarChart
                                        axis="y"
                                        style={style}
                                        series={series}
                                        columns={["value_sum"]}
                                    />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Resizable>
                )}
            </div>
        )
    }
}

interface OwnProps {
}


interface StateProps {
    series: TimeSeries | undefined
    loading: boolean
    timeframe: ChartTimeframe
}

type Props = OwnProps & StateProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    const timeframe = timeframes[1]
    const series = makeTxHistoryChartSeries(state, timeframe)
    const rollup = series?.map((event: TimeEvent) => {
        const data = event.data()
        // @ts-ignore
        return event.setData(data.set("value", data.get("credit") - data.get("debit")))
    })
        .fixedWindowRollup({
            windowSize: "3d",//this.props.timeframe.windowSize,
            toTimeEvents: false,
            aggregation: {
                value_sum: { value: sum() },
            },
        })
    return {
        series: rollup,
        loading: state.accounts.getAccountsAttempting,
        timeframe: timeframe,
    }
}

export default connect(mapStateToProps)(BalanceHistoryChart)
