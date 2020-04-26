import React, { PureComponent } from "react"
import { connect } from "react-redux"

import { Card } from "react-bootstrap"

import { TimeSeries, sum } from "pondjs"
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
    { key: "debit_sum", color: colorScheme[1] },
])

function f(n: number) {
    return sprintf("%.6f", n || 0)
}

class WalletCreditDebitCard extends PureComponent<Props> {
    render() {
        const series = this.props.series
        return (
            <Card className="h-100">
                <Card.Body className="">
                    {series != undefined && (
                        <Resizable>
                            <ChartContainer
                                timeRange={series.timerange()}
                                // showGrid={true}
                                timeAxisTickCount={5}
                                // timeAxisStyle={{axis:{strokeWidth:0}}}
                                enablePanZoom={true}
                            >
                                <ChartRow height="160">
                                    <YAxis
                                        id="y"
                                        label="Amount"
                                        min={series.min("debit_sum")}
                                        max={series.max("credit_sum")}
                                        width="60"
                                        type="linear"
                                        hideAxisLine={true}
                                        visible={false}
                                        // format="d"
                                        format=",.0f"

                                    />
                                    <Charts>
                                        <BarChart
                                            axis="y"
                                            style={style}
                                            series={series}
                                            columns={["debit_sum"]}

                                        />
                                        <BarChart
                                            axis="y"
                                            style={style}
                                            series={series}
                                            columns={["credit_sum"]}
                                        />
                                    </Charts>
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    )}
                </Card.Body>
            </Card>
        )
    }
}

interface OwnProps {
}


interface StateProps {
    loading: boolean
    timeframe: ChartTimeframe
    series: TimeSeries | undefined
}

type Props = OwnProps & StateProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    const timeframe = timeframes[1]
    const series = makeTxHistoryChartSeries(state, timeframe)
    const rollup = series?.fixedWindowRollup({
        windowSize: "3d",//this.props.timeframe.windowSize,
        toTimeEvents: false,
        aggregation: {
            debit_sum: { debit: sum() },
            credit_sum: { credit: sum() },
        },
    })
    return {
        series: rollup,
        loading: state.accounts.getAccountsAttempting,
        timeframe: timeframe,
    }
}

export default connect(mapStateToProps)(WalletCreditDebitCard)
