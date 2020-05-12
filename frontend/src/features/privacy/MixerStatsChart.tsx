import * as React from "react"
import { connect } from "react-redux"
import _, { chain } from "lodash"

import { Row, Col } from "react-bootstrap"
import { ChartTimeframe } from "../../components/Shared/IntervalChooser"
import { IApplicationState } from "../../store/types"
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
// @ts-ignore
import {
    TimeSeries,
    Collection,
    IndexedEvent,
    TimeEvent,
    TimeRange,
    count,
    sum,
    Pipeline,
    TimeRangeEvent,
} from "pondjs"

import { getMixerStatsChartData } from "./mixerSlice"
import { ATOMS_DIVISOR } from "../../constants"
import { colorScheme } from "../staking/StakingHistory/StakingHistoryChart"
import { makeTimerange } from "../../helpers/pondjs"

class MixerStatsChart extends React.PureComponent<Props, InternalState> {
    render() {
        const timerange = this.props.chartSeries?.timerange()
        if (timerange == undefined) return null

        const style = styler([
            { key: "tx_count", color: colorScheme[3], width: 5 },
            { key: "value_sum", color: colorScheme[1] },
        ])
        return (
            <div className="p-3">
                <Resizable>
                    <ChartContainer
                        timeRange={timerange}
                        // showGrid={true}

                        enablePanZoom={true}
                        width={800}>
                        <ChartRow height="400">
                            <YAxis
                                id="tx-count-axis"
                                label="# of transactions"
                                min={0}
                                max={this.props.chartSeries.max("tx_count")}
                                width="60"
                                type="linear"
                                format="d"
                            />
                            <Charts>
                                <LineChart
                                    axis="tx-count-axis"
                                    smooth={true}
                                    interpolation={"curveBasis"}
                                    series={this.props.chartSeries}
                                    style={style}
                                    columns={["tx_count"]}
                                    yScale={() => 1}
                                />
                                <BarChart
                                    axis="value-sum-axis"
                                    style={style}
                                    series={this.props.chartSeries}
                                    columns={["value_sum"]}
                                />
                            </Charts>
                            <YAxis
                                id="value-sum-axis"
                                label="Value"
                                min={0}
                                max={0.01}
                                width="80"
                                type="linear"
                                format="d"
                            />
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </div>
        )
    }
}

interface InternalState {}

interface OwnProps {
    timeframe: ChartTimeframe
}

interface StateProps {
    chartSeries: TimeSeries | undefined
}

interface DispatchProps {}

type Props = DispatchProps & OwnProps & StateProps

const mapStateToProps = (
    state: IApplicationState,
    ownProps: OwnProps
): StateProps | undefined => {
    const series = getMixerStatsChartData(state, ownProps.timeframe)

    const rollup = series?.fixedWindowRollup({
        windowSize: ownProps.timeframe.windowSize,
        toTimeEvents: false,
        aggregation: {
            tx_count: { denomination: count() },
            value_sum: { denomination: sum() },
        },
    })

    console.log("ROLLUP", rollup?.toJSON())

    return {
        chartSeries: rollup,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MixerStatsChart)
