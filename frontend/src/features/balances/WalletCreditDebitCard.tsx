import React, { PureComponent } from "react"
import { connect } from "react-redux"

import { Card } from "react-bootstrap"

import { TimeSeries, sum, Collection } from "pondjs"
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
import { sprintf } from "sprintf-js"

const style = styler([
    { key: "credit", color: colorScheme[3], width: 5 },
    { key: "debit", color: colorScheme[1] },
    { key: "credit_sum", color: colorScheme[2], width: 5 },
    { key: "debit_sum", color: colorScheme[1] },
])

function f(n: number) {
    return sprintf("%.6f", n || 0)
}

class WalletCreditDebitCard extends PureComponent<Props> {
    render() {
        const series = this.props.series
        if (!series) return null
        return (
            <Card className="h-100">
                <Resizable
                    id="chart-container"
                    style={{
                        position: "absolute",
                        width: "100%",
                        bottom: -10,
                    }}>
                    <ChartContainer
                        timeRange={series.timerange()}
                        timeAxisTickCount={4}
                        timeAxisStyle={{ axis: { strokeWidth: 0 } }}
                        enablePanZoom={true}
                        paddingLeft={25}
                        paddingRight={25}
                        // showGrid={true}
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
                                    series={series}
                                    columns={["credit_sum"]}
                                />
                                <BarChart
                                    axis="y"
                                    style={style}
                                    series={series}
                                    columns={["debit_sum"]}
                                />
                            </Charts>
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </Card>
        )
    }
}

interface OwnProps {
    timeframe: ChartTimeframe
    txHistorySeries: TimeSeries | undefined
}

interface StateProps {
    series: TimeSeries | undefined
    loading: boolean
}

type Props = OwnProps & StateProps

const mapStateToProps = (
    state: IApplicationState,
    ownProps: OwnProps
): StateProps => {
    const series = ownProps.txHistorySeries?.fixedWindowRollup({
        windowSize: ownProps.timeframe.windowSize,
        toTimeEvents: false,
        aggregation: {
            debit_sum: { debit: sum() },
            credit_sum: { credit: sum() },
        },
    })

    return {
        series: series,
        loading: state.accounts.getAccountsAttempting,
    }
}

export default connect(mapStateToProps)(WalletCreditDebitCard)
