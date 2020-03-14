import * as React from "react";
import { connect } from "react-redux";

import { formatHash } from "../../../helpers/helpers";
import { getBestBlock } from "./networkInfoSlice";
import { BestBlockResponse } from "../../../proto/api_pb";
import { IApplicationState } from "../../../store/types";

class BestBlockComponent extends React.Component<OwnProps> {
	render() {
		return (
			<>
				{this.props.isEndpointConnected && this.props.currentBlock != null && (
					<span title={formatHash(this.props.currentBlock.getHash_asU8())}
						className="text-muted">
						Block height: <strong>{this.props.currentBlock.getHeight()}</strong>
					</span>
				)}
			</>
		)
	}
}

interface OwnProps {
	currentBlock: BestBlockResponse
	isEndpointConnected: boolean
}

const mapStateToProps = function (state: IApplicationState) {
	return {
		currentBlock: getBestBlock(state),
		isEndpointConnected: state.app.isEndpointConnected,
	}
}

export default connect(mapStateToProps)(BestBlockComponent)
