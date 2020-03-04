import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../../store/store";
import { NetworkResponse } from "../../proto/api_pb";


class NetworkComponent extends React.Component<OwnProps> {
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

const mapStateToProps = (state: IApplicationState) => {
	return {
		network: state.networkinfo.network,
	}
}

export default connect(mapStateToProps)(NetworkComponent)
