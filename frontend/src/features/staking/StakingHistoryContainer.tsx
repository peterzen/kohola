import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Card } from "react-bootstrap"
import IntervalChooser, { ChartTimeframe, timeframes } from "../../components/Shared/IntervalChooser"
import { IApplicationState } from "../../store/types"

import { StakingHistory } from "../../proto/walletgui_pb"
import StakingHistoryTable from "./StakingHistoryTable"
import {
    ITxTypeCountsChartdataTimelineItem,
    getStakingHistoryCountEvents,
    IRewardDataChartdataTimelineItem,
    getStakingHistoryRewardData,
    onTimeFrameChanged,
    aggregateChartDataBy,
    sumTxTypeCountsChartdata,
    sumRewardDataChartdata,
    getFilteredStakingHistory,
} from "./stakingSlice"
import StakingHistoryChart from "./StakingHistoryChart"

class StakingHistoryContainer extends React.PureComponent<Props, InternalState> {
    render() {
        const history = this.props.getHistory(this.props.selectedTimeframe)
        return (
            <Card>
                <Card.Header>
                    <div className="float-right">
                        <IntervalChooser
                            timeframes={timeframes}
                            onChange={(timeframe: ChartTimeframe) => this.props.onTimeFrameChanged(timeframe)}
                            selectedValue={this.props.selectedTimeframe}
                        />
                    </div>
                    <Card.Title>Staking returns</Card.Title>
                </Card.Header>
                <StakingHistoryChart stakingHistory={history} timeframe={this.props.selectedTimeframe} />
                <hr/>
                <StakingHistoryTable stakingHistory={history} />
            </Card>
        )
    }
}

interface InternalState {
}

interface OwnProps {
    selectedTimeframe: ChartTimeframe
    getHistory: (timeframe: ChartTimeframe) => StakingHistory.StakingHistoryLineItem[]
    rewardData: IRewardDataChartdataTimelineItem[]
    txTypeCounts: ITxTypeCountsChartdataTimelineItem[]
}

interface DispatchProps {
    onTimeFrameChanged: typeof onTimeFrameChanged
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState) => {
    const timeframe = state.staking.selectedTimeframe
    const stakingHistory = getFilteredStakingHistory(
        state,
        timeframe.days
    )
    const chartData = _.orderBy(stakingHistory, item => item.getTimestamp(), "asc")

    return {
        selectedTimeframe: timeframe,
        txTypeCounts: aggregateChartDataBy(
            state.staking.selectedTimeframe,
            getStakingHistoryCountEvents(
                chartData,
                timeframe.days
            ),
            sumTxTypeCountsChartdata
        ),
        rewardData: aggregateChartDataBy(
            state.staking.selectedTimeframe,
            getStakingHistoryRewardData(
                chartData,
                timeframe.days
            ),
            sumRewardDataChartdata
        ),
        getHistory: () => {
            return _.orderBy(stakingHistory, item => item.getTimestamp(), "desc")
        }
    }
}

const mapDispatchToProps = {
    onTimeFrameChanged,
}

export default connect(mapStateToProps, mapDispatchToProps)(StakingHistoryContainer)
