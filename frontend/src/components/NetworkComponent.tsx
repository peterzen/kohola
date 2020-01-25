import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { NetworkState } from "../store/network/types";
import { IApplicationState } from "../store/types";
import { loadNetworkAttempt } from "../store/network/actions";


export interface NetworkOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = NetworkState & DispatchProps & NetworkOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class NetworkComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				Active network: {this.props._Network.getActiveNetwork()}
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadNetworkAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: NetworkOwnProps): NetworkState => {
	return {
		...state.network
	};
}
export default withRouter(connect(mapStateToProps)(NetworkComponent));
