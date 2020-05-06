import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { sprintf } from "sprintf-js"
import _ from "lodash"

import { Card } from "react-bootstrap"

import { TimeSeries, sum, TimeEvent, IndexedEvent, Collection } from "pondjs"
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
import {
    timeframes,
    ChartTimeframe,
} from "../../components/Shared/IntervalChooser"
import { colorScheme } from "../staking/StakingHistory/StakingHistoryChart"

const style = styler([
    { key: "credit", color: colorScheme[3], width: 5 },
    { key: "debit", color: colorScheme[1] },
    { key: "credit_sum", color: colorScheme[3], width: 5 },
    { key: "value_sum", color: colorScheme[1] },
    { key: "balance", color: colorScheme[4] },
])

function f(n: number) {
    return sprintf("%.6f", n || 0)
}

class BalanceHistoryChart extends PureComponent<Props> {
    render() {
        const series = this.props.series
        if (!series?.timerange()) return null
        return (
            <div style={{
                position: "absolute",
                width: "100%",
                bottom: -10,
            }}>
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
                                    min={series.min("balance")}
                                    max={series.max("balance")}
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
                                        columns={["balance"]}
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
    timeframe: ChartTimeframe
    currentBalance: number
    txHistorySeries: TimeSeries | undefined
}

interface StateProps {
    series: TimeSeries | undefined
    loading: boolean
}

type Props = OwnProps & StateProps

// const tally = (currentBalance: number) => {
//     let sum = currentBalance
//     debugger
//     return (args: any) => {
//         sum = sum - _.sum(args)
//         return sum
//     }
// }
const mapStateToProps = (
    state: IApplicationState,
    ownProps: OwnProps
): StateProps => {


    // const coll = ownProps.txHistorySeries?.pipeline()
    //     .windowBy("1d")           // 1 day fixed windows
    //     .emitOn("eachEvent")      // emit result on each event
    //     .aggregate({
    //         debit_sum: { debit: sum() },
    //         credit_sum: { credit: sum() },
    //     })
    //     .asIndexedEvents({ duration: "1d" })
    //     .toEventList()


    const rollup = ownProps.txHistorySeries
        ?.map((event: TimeEvent) => {
            const data = event.data()
            return event.setData(
                // @ts-ignore
                data.set("value", data.get("credit") + data.get("debit"))
            )
        })
        .fixedWindowRollup({
            windowSize: ownProps.timeframe.windowSize,
            toTimeEvents: true,
            aggregation: {
                value_sum: { value: sum() },
            },
        })
        .align({
            fieldSpec: ["value_sum"],
            period: ownProps.timeframe.windowSize,
            method: "hold",
            limit: 8,
        })
        .pipeline()
        .asIndexedEvents({ duration: "1d" })
        .toEventList()

    let tally = ownProps.currentBalance
    const xform = _.chain(rollup as IndexedEvent[])
        .orderBy((e) => e.indexAsString(), ["desc"])
        .map((e) => {
            const d = e.data()
            const newE = e.setData(d.set("balance", tally))
            tally = tally - d.get("value_sum")
            return newE
        })
        .value()

    const series = new TimeSeries({
        name: "balance-history",
        columns: ["index", "balance"],
        collection: new Collection(xform).sortByTime(),
    })

    return {
        series: series,
        loading: state.accounts.getAccountsAttempting,
    }
}




export default connect(mapStateToProps)(BalanceHistoryChart)
