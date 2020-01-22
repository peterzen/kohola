import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { BestBlockState } from "../store/bestblock/types";
import { IApplicationState } from "../store/types";

import { Hash } from "./shared";

class BestBlockComponent extends React.Component<BestBlockState, BestBlockState> {
    render() {
        return (
            <div>
                Block height: {this.props.currentBlock.getHeight()}<br />
                Block hash: <Hash hash={this.props.currentBlock.getHash_asU8()} />
            </div>
        )
    }
}


const mapStateToProps = function (state: IApplicationState, ownProps: any) {
    return {
        currentBlock: state.bestblock.currentBlock
    };
}
export default withRouter(connect(mapStateToProps, {
})(BestBlockComponent));