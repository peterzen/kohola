import * as React from "react"
import { connect } from "react-redux"
import { withRouter, RouteChildrenProps } from "react-router-dom"
import _ from "lodash"

// @ts-ignore
import Fade from "react-reveal/Fade"
import { Card, Row, Col, Dropdown } from "react-bootstrap"
import IntervalChooser, { ChartTimeframe, defaultTimeframe } from "../market/IntervalChooser"
import { IApplicationState } from "../../store/types"
import { getOrderedStakingHistory } from "./stakingSlice"
import { StakingHistory } from "../../proto/walletgui_pb"
import StakingHistoryTable from "./StakingHistoryTable"


class StakingHistoryContainer extends React.PureComponent<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			selectedTimeframe: defaultTimeframe,
		}
	}

	render() {
		return (
			<Card>
				<Card.Header>
					<div className="float-right">
						<IntervalChooser
							onChange={(timeframe: ChartTimeframe) => this.setState({ selectedTimeframe: timeframe })}
							selectedValue={this.state.selectedTimeframe}
						/>
					</div>
					<Card.Title>Staking returns</Card.Title>
				</Card.Header>
				<StakingHistoryTable stakingHistoryItems={this.props.getHistory(this.state.selectedTimeframe)} />
			</Card>

		)
	}
}

interface InternalState {
	selectedTimeframe: ChartTimeframe
}

interface OwnProps {
	getHistory: (timeframe: ChartTimeframe) => StakingHistory.StakingHistoryLineItem[]
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		getHistory: (timeframe: ChartTimeframe) => {
			return getOrderedStakingHistory(state, timeframe.days)
		}
	}
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(StakingHistoryContainer)
