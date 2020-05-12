import React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { IApplicationState } from "../../../store/types"
import { fetchExchangeChartData, getMarketCurrencyState } from "../marketSlice"
import { TimeSeries } from "pondjs"
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
    Resizable,
} from "react-timeseries-charts"

class SparklineChart extends React.Component<Props> {
    render() {
        const priceSeries = this.props?.priceSeries
        if (priceSeries == undefined) return null
        const column = this.props.currencyCode
        return (
            <div style={{ width: "100%", height: "100px" }}>
                <Resizable>
                    <ChartContainer
                        timeRange={priceSeries.timerange()}
                        hideWeekends={false}
                        timeAxisHeight={0}
                        enablePanZoom={true}
                        padding={0}
                        showGrid={false}
                        maxTime={priceSeries.timerange().end()}
                        minTime={priceSeries.timerange().begin()}
                        onMouseMove={(x: number, y: number) =>
                            this.handleMouseMove(x, y)
                        }
                        minDuration={1000 * 60 * 60 * 24 * 30}
                        hideTimeAxis={true}
                        timeAxisAngledLabels={false}
                        timeAxisStyle={{
                            axis: { fill: "none", stroke: "none" },
                        }}>
                        <ChartRow>
                            <YAxis
                                id="y"
                                label=""
                                min={priceSeries.min(column)}
                                max={priceSeries.max(column)}
                                format=",.0f"
                                type="linear"
                                hideAxisLine={true}
                                visible={false}
                            />
                            <Charts>
                                <LineChart
                                    axis="y"
                                    smooth={true}
                                    series={priceSeries}
                                    columns={[column]}
                                    yScale={() => 1}
                                />
                            </Charts>
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </div>
        )
    }
    handleMouseMove = (x: any, y: any) => {
        this.setState({ x, y })
    }
    componentDidMount() {
        this.props.fetchExchangeChartData(
            this.props.currencyCode,
            this.props.days
        )
    }
}

interface OwnProps {
    days: number
    currencyCode: string
}

interface StateProps {
    priceSeries: TimeSeries
}

interface DispatchProps {
    fetchExchangeChartData: typeof fetchExchangeChartData
}

type Props = OwnProps & StateProps & DispatchProps

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
    return {
        priceSeries: getMarketCurrencyState(state, ownProps.currencyCode)
            ?.priceSeries,
    }
}

const mapDispatchToProps = {
    fetchExchangeChartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SparklineChart)
