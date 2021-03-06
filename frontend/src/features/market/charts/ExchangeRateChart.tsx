import React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { IApplicationState } from "../../../store/types"
import {
    fetchExchangeChartData,
    ChartDataPoint,
    getExchangeChartData,
} from "../marketSlice"

class ExchangeRateChart extends React.Component<Props> {
    render() {
        return (
            <div style={{ width: "100%", height: "250px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={this.props.chartData}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}>
                        <XAxis dataKey="name" minTickGap={20} />
                        <YAxis domain={["auto", "auto"]} />
                        <Line
                            type="monotone"
                            dataKey="value"
                            dot={false}
                            stroke="#8884d8"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
    componentWillReceiveProps(nextProps: OwnProps) {
        if (nextProps.days !== this.props.days) {
            this.props.fetchExchangeChartData(
                this.props.currencyCode,
                nextProps.days
            )
        }
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
    chartData: ChartDataPoint[]
}

interface DispatchProps {
    fetchExchangeChartData: typeof fetchExchangeChartData
}

type Props = OwnProps & StateProps & DispatchProps

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
    return {
        chartData: getExchangeChartData(
            state,
            ownProps.currencyCode,
            ownProps.days
        ),
    }
}

const mapDispatchToProps = {
    fetchExchangeChartData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRateChart)
