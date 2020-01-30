import * as React from "react";
import { connect } from "react-redux";

import { BestBlockState } from "../store/networkinfo/types";
import { IApplicationState } from "../store/types";

import { formatHash } from "../helpers";

class BestBlockComponent extends React.Component<BestBlockState, BestBlockState> {
	render() {
		return (
			<span>
				Block height: <span title={formatHash(this.props.currentBlock.getHash_asB64())}><strong>{this.props.currentBlock.getHeight()}</strong></span>
			</span>
		)
	}
}


const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		currentBlock: state.networkinfo.currentBlock
	};
}
export default connect(mapStateToProps)(BestBlockComponent)
