import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { StakeInfoState } from "../store/stakeinfo/types";
import { IApplicationState } from "../store/types";
import { loadStakeInfoAttempt } from "../store/stakeinfo/actions";


export interface StakeInfoOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = StakeInfoState & DispatchProps & StakeInfoOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class StakeInfoComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				<h4>StakeInfo</h4>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadStakeInfoAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: StakeInfoOwnProps): StakeInfoState => {
	return {
		...state.stakeinfo
	};
}
export default withRouter(connect(mapStateToProps)(StakeInfoComponent));
