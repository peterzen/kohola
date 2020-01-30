import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/types";
import { INetworkState } from "../store/networkinfo/types";
import { loadNetworkAttempt } from "../store/networkinfo/actions";

export interface NetworkOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = INetworkState & DispatchProps & NetworkOwnProps

interface InternalState {
	// internalComponentStateField: string
}

class NetworkComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				Active network: {this.props.network.getActiveNetwork()}
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadNetworkAttempt())
	}

}

const mapStateToProps = (state: IApplicationState, ownProps: NetworkOwnProps): INetworkState => {
	return {
		network: state.networkinfo.network,
		getNetworkRequest: state.networkinfo.getNetworkRequest,
		errorNetwork: state.networkinfo.errorNetwork,
	};
}
export default connect(mapStateToProps)(NetworkComponent)
