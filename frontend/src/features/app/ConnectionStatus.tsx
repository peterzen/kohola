import * as React from "react";
import { connect } from "react-redux";

import { GRPCEndpoint } from "../../proto/dcrwalletgui_pb";
import { getConnectedEndpoint } from "../app/appSlice";
import OnOffIndicator from "../../components/Shared/OnOffIndicator";
import { IApplicationState } from "../../store/types";
import BestBlockComponent from "../networkinfo/BestBlockComponent";

class ConnectionStatusComponent extends React.Component<Props> {

	render() {
		return (
			<span>
				{this.props.connectedEndpoint && (
					<span>
						<small className="ml-2 mr-2 text-muted">
							{this.props.connectedEndpoint.getLabel()}{" "}
						</small>
						<span className="mr-2">
							<OnOffIndicator status={this.props.isEndpointConnected} size="xs" />
						</span>
					</span>
				)}
				{this.props.isEndpointConnected && <BestBlockComponent />}
			</span>
		)
	}
}

interface Props {
	connectedEndpoint: GRPCEndpoint
	isEndpointConnected: boolean
	endpointConnectionErrorMsg: string
	endpointLastConnectionCheckTs: number
}

const mapStateToProps = function (state: IApplicationState) {
	return {
		connectedEndpoint: getConnectedEndpoint(state),
		isEndpointConnected: state.app.isEndpointConnected,
		endpointConnectionErrorMsg: state.app.endpointConnectionErrorMsg,
		endpointLastConnectionCheckTs: state.app.endpointLastConnectionCheckTs,
	}
}

export default connect(mapStateToProps)(ConnectionStatusComponent)
