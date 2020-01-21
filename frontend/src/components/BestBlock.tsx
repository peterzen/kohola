import * as React from "react";
import PropTypes from 'prop-types';

import { BestBlockResponse } from "../proto/api_pb";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Hash } from "./shared";

interface IBestBlockProps {
    currentBlock: BestBlockResponse
}

class BestBlock extends React.Component<IBestBlockProps, any> {
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
})(BestBlock));