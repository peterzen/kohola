import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../../store/types";
import { INetworkState } from "./networkInfoSlice";

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
		if (this.props.network == null) {
			return null
		}
		return (
			<div>
				Active network: {this.props.network.getActiveNetwork()}
			</div>
		)
	}
}

const mapStateToProps = (state: IApplicationState, ownProps: NetworkOwnProps): INetworkState => {
	return {
		...state.networkinfo,
		network: state.networkinfo.network,
		errorNetwork: state.networkinfo.errorNetwork,
	};
}
export default connect(mapStateToProps)(NetworkComponent)
