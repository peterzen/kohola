import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { StopAutoBuyerState } from "../store/stopautobuyer/types";
import { IApplicationState } from "../store/types";
import { loadStopAutoBuyerAttempt } from "../store/stopautobuyer/actions";


export interface StopAutoBuyerOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = StopAutoBuyerState & DispatchProps & StopAutoBuyerOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class StopAutoBuyerComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				<h4>StopAutoBuyer</h4>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadStopAutoBuyerAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: StopAutoBuyerOwnProps): StopAutoBuyerState => {
	return {
		...state.stopautobuyer
	};
}
export default withRouter(connect(mapStateToProps)(StopAutoBuyerComponent));
