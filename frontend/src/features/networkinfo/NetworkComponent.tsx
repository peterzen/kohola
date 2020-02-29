import * as React from "react";
import { connect } from "react-redux";

import { INetworkState } from "./networkInfoSlice";
import { IApplicationState } from "../../store/store";

interface OwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = INetworkState & DispatchProps & OwnProps

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

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps): INetworkState => {
	return {
		...state.networkinfo,
		network: state.networkinfo.network,
		errorNetwork: state.networkinfo.errorNetwork,
	};
}
export default connect(mapStateToProps)(NetworkComponent)
