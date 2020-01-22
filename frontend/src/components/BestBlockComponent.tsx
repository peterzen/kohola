import * as React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Hash } from "./shared";
import { WalletrpcState } from "../store/walletrpc/types";

class BestBlockComponent extends React.Component<WalletrpcState, any> {
    render() {
        return (
            <div>
                Block height: {this.props.currentBlock.getHeight()}<br />
                Block hash: <Hash hash={this.props.currentBlock.getHash_asU8()} />
            </div>
        )
    }
}


const mapStateToProps = function (state: any, ownProps: any) {
    return {
        currentBlock: state.walletrpc.currentBlock
    };
}
export default withRouter(connect(mapStateToProps, {
})(BestBlockComponent));