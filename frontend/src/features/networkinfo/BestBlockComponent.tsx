import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../../store/store";

import { formatHash } from "../../helpers";
import { getBestBlock } from "./networkInfoSlice";
import { BestBlockResponse } from "../../proto/api_pb";

class BestBlockComponent extends React.Component<OwnProps> {
	render() {
		if (this.props.currentBlock == null) {
			return null
		}
		return (
			<small title={formatHash(this.props.currentBlock.getHash_asB64())}
				className="text-muted">
				Block height: <strong>{this.props.currentBlock.getHeight()}</strong>
			</small>
		)
	}
}

interface OwnProps {
	currentBlock: BestBlockResponse
}

const mapStateToProps = function (state: IApplicationState) {
	return {
		currentBlock: getBestBlock(state)
	};
}
export default connect(mapStateToProps)(BestBlockComponent)
