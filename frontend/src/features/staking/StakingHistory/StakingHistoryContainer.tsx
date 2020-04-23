import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Card } from "react-bootstrap"
import IntervalChooser, {
    ChartTimeframe,
    timeframes,
} from "../../../components/Shared/IntervalChooser"
import { IApplicationState } from "../../../store/types"

import { StakingHistory } from "../../../proto/walletgui_pb"
import StakingHistoryTable from "./StakingHistoryTable"
import { onTimeFrameChanged, getFilteredStakingHistory } from "../stakingSlice"
import StakingHistoryChart from "./StakingHistoryChart"

class StakingHistoryContainer extends React.PureComponent<
    Props,
    InternalState
> {
    render() {
        return (
            <Card>
                <Card.Header>
                    <div className="float-right">
                        <IntervalChooser
                            timeframes={timeframes}
                            onChange={(timeframe: ChartTimeframe) =>
                                this.props.onTimeFrameChanged(timeframe)
                            }
                            selectedValue={this.props.selectedTimeframe}
                        />
                    </div>
                    <Card.Title>Staking returns</Card.Title>
                </Card.Header>
                <StakingHistoryChart
                    stakingHistory={this.props.history}
                    timeframe={this.props.selectedTimeframe}
                />
                <hr />
                <StakingHistoryTable stakingHistory={this.props.history} />
            </Card>
        )
    }
}

interface InternalState {}

interface StateProps {
    selectedTimeframe: ChartTimeframe
    history: StakingHistory.StakingHistoryLineItem[]
}

interface OwnProps {}

interface DispatchProps {
    onTimeFrameChanged: typeof onTimeFrameChanged
}

type Props = DispatchProps & OwnProps & StateProps

const mapStateToProps = (state: IApplicationState) => {
    const timeframe = state.staking.selectedTimeframe
    const stakingHistory = getFilteredStakingHistory(state, timeframe.days)

    return {
        selectedTimeframe: timeframe,
        history: stakingHistory
            .orderBy((item) => item.getTimestamp(), "desc")
            .value(),
    }
}

const mapDispatchToProps = {
    onTimeFrameChanged,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StakingHistoryContainer)
