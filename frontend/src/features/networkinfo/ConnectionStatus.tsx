import * as React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCircle
} from '@fortawesome/free-solid-svg-icons'
import { IApplicationState } from "../../store/store";
import { PingResponse } from "../../proto/api_pb";
import { GRPCEndpoint } from "../../proto/dcrwalletgui_pb";
import { getConnectedEndpoint, isWalletConnected } from "../app/appSlice";
import BestBlockComponent from "./BestBlockComponent";

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
					</span>
				)}
				<span className="ml-2">
					{connected ? (
						<FontAwesomeIcon icon={faCircle} className="text-success" size="xs" />
					) : (
							<FontAwesomeIcon icon={faCircle} className="text-danger" size="xs" />
						)}
				</span>
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
