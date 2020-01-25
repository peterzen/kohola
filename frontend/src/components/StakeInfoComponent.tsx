import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { IApplicationState } from "../store/types";
import { IStakeInfoState } from "../store/staking/types";
import { loadStakeInfoAttempt } from "../store/staking/actions";


export interface StakeInfoOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = IStakeInfoState & DispatchProps & StakeInfoOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class StakeInfoComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				<h4>StakeInfo</h4>
				Live tix: {this.props.stakeinfo.getLive()}<br />
				Immature tix: {this.props.stakeinfo.getImmature()}<br />
				Expired tix: {this.props.stakeinfo.getExpired()}<br />
				Missed tix: {this.props.stakeinfo.getMissed()}<br />
				Own Mempool  tix: {this.props.stakeinfo.getOwnMempoolTix()}<br />
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadStakeInfoAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: StakeInfoOwnProps): IStakeInfoState => {
	return {
		getStakeInfoRequest: state.staking.getStakeInfoRequest,
		stakeinfo: state.staking.stakeinfo,
		errorStakeInfo: state.staking.errorStakeInfo
	};
}
export default withRouter(connect(mapStateToProps)(StakeInfoComponent));
