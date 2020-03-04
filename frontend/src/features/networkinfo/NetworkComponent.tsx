import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../../store/store";
import { NetworkResponse } from "../../proto/api_pb";


class NetworkComponent extends React.Component<Props> {
	render() {
		return (
			<div>
				{this.props.network && (
					<span>Active network: {this.props.network.getActiveNetwork()}</span>
				)}
			</div>
		)
	}
}

interface OwnProps {
	network: NetworkResponse
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps


const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
	return {
		network: state.networkinfo.network,
		errorNetwork: state.networkinfo.errorNetwork,
	}
}

export default connect(mapStateToProps)(NetworkComponent)
