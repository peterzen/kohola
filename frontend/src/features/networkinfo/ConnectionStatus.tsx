import * as React from "react";
import { connect } from "react-redux";

import { PingResponse } from "../../proto/api_pb";
import { GRPCEndpoint } from "../../proto/dcrwalletgui_pb";
import { getConnectedEndpoint, isWalletConnected } from "../app/appSlice";
import BestBlockComponent from "./BestBlockComponent";
import { IApplicationState } from "../../store/types";
import OnOffIndicator from "../../components/Shared/OnOffIndicator";

class ConnectionStatusComponent extends React.Component<Props> {

	render() {
		const connected = !!this.props.getPingResponse
		return (
			<span>
				{this.props.isEndpointConnected && (
					<span>
						{this.props.connectedEndpoint && (
							<small className="ml-2 mr-2 text-muted">
								{this.props.connectedEndpoint.getLabel()}
							</small>
						)}
						<BestBlockComponent />
						<span className="ml-2">
							<OnOffIndicator status={connected} size="xs"/>
						</span>
					</span>
				)}
				{this.props.isEndpointConnected == false && (
					<small className="text-muted">Not connected</small>
				)}
			</span>
		)
	}
}

interface Props {
	connectedEndpoint: GRPCEndpoint
	getPingResponse: PingResponse
	isEndpointConnected: boolean
}

const mapStateToProps = function (state: IApplicationState) {
	return {
		getPingResponse: state.ping.getPingResponse,
		connectedEndpoint: getConnectedEndpoint(state),
		isEndpointConnected: isWalletConnected(state),
	}
}

export default connect(mapStateToProps)(ConnectionStatusComponent)
