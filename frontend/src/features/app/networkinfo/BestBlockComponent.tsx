import * as React from "react"
import { connect } from "react-redux"

import { formatHash } from "../../../helpers/helpers"
import { getBestBlock } from "./networkInfoSlice"
import { BestBlockResponse } from "../../../proto/api_pb"
import { IApplicationState } from "../../../store/types"
import { Networks } from "../../../constants"
import { getCurrentNetwork } from "../appSlice"

class BestBlockComponent extends React.Component<OwnProps> {
    render() {
        return (
            <>
                {this.props.isEndpointConnected &&
                    this.props.currentBlock != null && (
                        <span
                            title={`${formatHash(
                                this.props.currentBlock.getHash_asU8()
                            )} (${Networks[this.props.currentNetwork]})`}
                            className="text-muted">
                            At block:{" "}
                            <strong>
                                {this.props.currentBlock.getHeight()}
                            </strong>
                        </span>
                    )}
            </>
        )
    }
}

interface OwnProps {
    currentBlock: BestBlockResponse | null
    currentNetwork: number
    isEndpointConnected: boolean
}

const mapStateToProps = function (state: IApplicationState): OwnProps {
    return {
        currentBlock: getBestBlock(state),
        currentNetwork: getCurrentNetwork(state),
        isEndpointConnected: state.app.isEndpointConnected,
    }
}

export default connect(mapStateToProps)(BestBlockComponent)
