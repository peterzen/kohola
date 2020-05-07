import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Row, Col } from "react-bootstrap"
import { ChartTimeframe } from "../../../components/Shared/IntervalChooser"
import { IApplicationState } from "../../../store/types"

import { StakingHistory } from "../../../proto/walletgui_pb"
import {
    onTimeFrameChanged,
    getFilteredStakingHistory,
    getStakingHistoryAsTimeSeries,
} from "../stakingSlice"

import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    Legend,
    LineChart,
    Resizable,
    BarChart,
    styler,
} from "react-timeseries-charts"

// @ts-ignore
import { TimeSeries, Collection, TimeEvent, count, sum } from "pondjs"
import { TransactionType, ATOMS_DIVISOR } from "../../../constants"

export const colorScheme = [
    "#7ebdb4",
    "#f6d198",
    "#f4a548",
    "#862a5c",
    "#27496d",
    "#142850",
    "#00909e",
]

class StakingHistoryChart extends React.PureComponent<Props, InternalState> {
    render() {
        const rewardSeries = this.props.rewardSeries
        if (rewardSeries?.timerange() == undefined) {
            return null
        }

        const txTypeSeries = this.props.txTypeSeries

        const rewardStyles = styler([
            { key: "rewardCredit_sum", color: colorScheme[0] },
            { key: "ticketCostCredit", color: colorScheme[1] },
            { key: "ticketCostCredit_sum", color: colorScheme[2] },
            {
                key: "roi",
                color: colorScheme[5],
                style: "line",
                strokeWidth: 5,
            },
        ])
        const txTypeStyles = styler([
            { key: "txType_count", color: colorScheme[0] },
            { key: "tx_count", color: colorScheme[1] },
            { key: "vote_count", color: colorScheme[3] },
            { key: "purchase_count", color: colorScheme[6] },
            { key: "revocation_count", color: colorScheme[4] },
        ])

        return (
            <Row>
                <Col sm={6}>
                    <Resizable>
                        <ChartContainer
                            timeRange={rewardSeries.timerange()}
                            // showGrid={true}

                            timeAxisTickCount={5}
                            enablePanZoom={true}
                            width={800}>
                            <ChartRow height="400">
                                <YAxis
                                    id="reward-credit-axis"
                                    label="Rewards (DCR)"
                                    align="right"
                                    min={0}
                                    max={rewardSeries.max("rewardCredit_sum")}
                                    width="60"
                                    type="linear"
                                    format={(v: number) =>
                                        Number(v) / ATOMS_DIVISOR
                                    }
                                    hideAxisLine={true}
                                    tickCount={5}
                                />
                                <Charts>
                                    <BarChart
                                        axis="reward-credit-axis"
                                        style={rewardStyles}
                                        series={rewardSeries}
                                        columns={["rewardCredit_sum"]}
                                        yScale={() => 1}
                                    />
                                    <BarChart
                                        axis="value-sum-axis"
                                        style={rewardStyles}
                                        series={rewardSeries}
                                        columns={["ticketCostCredit_sum"]}
                                        yScale={() => 1}
                                    />
                                    <LineChart
                                        axis="roi-axis"
                                        style={rewardStyles}
                                        series={rewardSeries}
                                        smooth={true}
                                        breakLine={false}
                                        interpolation={"curveBasis"}
                                        columns={["roi"]}
                                        yScale={() => 1}
                                    />
                                </Charts>
                                <YAxis
                                    id="value-sum-axis"
                                    label="Value"
                                    min={0}
                                    max={rewardSeries.max(
                                        "ticketCostCredit_sum"
                                    )}
                                    width="80"
                                    type="linear"
                                    format="d"
                                    visible={false}
                                />
                                <YAxis
                                    id="roi-axis"
                                    label="Value"
                                    min={0}
                                    max={rewardSeries.max("roi")}
                                    width="80"
                                    type="linear"
                                    format="d"
                                    visible={false}
                                />
                            </ChartRow>
                        </ChartContainer>
                    </Resizable>
                    <Legend
                        type="line"
                        align="right"
                        style={rewardStyles}
                        // highlight={this.state.highlight}
                        // onHighlightChange={highlight => this.setState({ highlight })}
                        // selection={this.state.selection}
                        // onSelectionChange={selection => this.setState({ selection })}
                        categories={[
                            { key: "roi", label: "% ROI", value: 0 },
                            {
                                key: "ticketCostCredit_sum",
                                label: "Ticket price credit",
                                value: 0,
                            },
                            {
                                key: "rewardCredit_sum",
                                label: "Reward credit",
                                value: 0,
                            },
                        ]}
                    />
                </Col>
                <Col sm={6}>
                    <Resizable>
                        <ChartContainer
                            timeRange={txTypeSeries.timerange()}
                            enablePanZoom={true}
                            width={800}
                            timeAxisTickCount={5}
                            // showGrid={true}
                            // timeAxisStyle={{axis:{strokeWidth:0}}}
                        >
                            <ChartRow height="400">
                                <YAxis
                                    id="tx-count-axis"
                                    label="# of transactions"
                                    min={0}
                                    max={txTypeSeries.max("tx_count")}
                                    width="60"
                                    type="linear"
                                    // format={(v: number) => Number(v) / ATOMS_DIVISOR}
                                    hideAxisLine={true}
                                    tickCount={5}
                                />
                                <Charts>
                                    <BarChart
                                        axis="tx-count-axis"
                                        style={txTypeStyles}
                                        series={txTypeSeries}
                                        columns={["tx_count"]}
                                    />
                                    <BarChart
                                        axis="tx-count-axis"
                                        style={txTypeStyles}
                                        series={txTypeSeries}
                                        columns={["vote_count"]}
                                    />
                                    <BarChart
                                        axis="tx-count-axis"
                                        style={txTypeStyles}
                                        series={txTypeSeries}
                                        columns={["purchase_count"]}
                                    />
                                    <BarChart
                                        axis="tx-count-axis"
                                        style={txTypeStyles}
                                        series={txTypeSeries}
                                        columns={["revocation_count"]}
                                    />
                                </Charts>
                            </ChartRow>
                        </ChartContainer>
                    </Resizable>
                    <Legend
                        type="line"
                        align="right"
                        style={txTypeStyles}
                        // highlight={this.state.highlight}
                        // onHighlightChange={highlight => this.setState({ highlight })}
                        // selection={this.state.selection}
                        // onSelectionChange={selection => this.setState({ selection })}
                        categories={[
                            { key: "tx_count", label: "Tx total", value: 0 },
                            { key: "vote_count", label: "Votes", value: 0 },
                            {
                                key: "purchase_count",
                                label: "Purchases",
                                value: 0,
                            },
                            {
                                key: "revocation_count",
                                label: "Revocations",
                                value: 0,
                            },
                        ]}
                    />
                </Col>
            </Row>
        )
    }
}

interface InternalState {}

interface OwnProps {
    timeframe: ChartTimeframe
    stakingHistory: StakingHistory.StakingHistoryLineItem[]
}

interface StateProps {
    rewardSeries: TimeSeries
    txTypeSeries: TimeSeries
}

interface DispatchProps {}

type Props = DispatchProps & OwnProps & StateProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    const selectedTimeframe = state.staking.selectedTimeframe

    const series = getStakingHistoryAsTimeSeries(state, selectedTimeframe)

    const rewardSeries = series
        .fixedWindowRollup({
            windowSize: selectedTimeframe.windowSize || "1d",
            aggregation: {
                rewardCredit_sum: { rewardCredit: sum() },
                ticketCostDebit_sum: { ticketCostDebit: sum() },
                ticketCostCredit_sum: { ticketCostCredit: sum() },
            },
            toTimeEvents: false,
        })
        // collapse() adds a calculated field
        // https://esnet-pondjs.appspot.com/#/TimeSeries+collapse
        .collapse({
            name: "roi",
            append: true,
            fieldSpecList: [
                "rewardCredit_sum",
                "ticketCostDebit_sum",
                "ticketCostCredit_sum",
            ],
            reducer: (e: number[]) => {
                // rewardCredit_sum, ticketCostDebit_sum, ticketCostCredit_sum
                return e[0] / (e[0] + e[2])
            },
        })

    const filter = (value: number) => (args: number[]) =>
        _.filter(args, (v) => v == value)

    const txTypeSeries = series.fixedWindowRollup({
        windowSize: "1d",
        aggregation: {
            tx_count: { txType: count() },
            vote_count: { txType: count(filter(TransactionType.VOTE)) },
            purchase_count: {
                txType: count(filter(TransactionType.TICKET_PURCHASE)),
            },
            revocation_count: {
                txType: count(filter(TransactionType.REVOCATION)),
            },
        },
        toTimeEvents: false,
    })

    return {
        rewardSeries: rewardSeries,
        txTypeSeries: txTypeSeries,
    }
}

const mapDispatchToProps = {
    onTimeFrameChanged,
}

export default connect(mapStateToProps, mapDispatchToProps)(StakingHistoryChart)
