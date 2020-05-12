import React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { IApplicationState } from "../../store/types"
import { openURL, getCurrentNetwork } from "../app/appSlice"
import { getExplorerURL } from "../appconfiguration/settingsSlice"
import { IBlockTemplate } from "../../middleware/models"
import TransactionMempoolStatusIcon from "./TransactionMempoolStatusIcon"

class Block extends React.Component<Props> {
    render() {
        const block = this.props.block
        const height = block.getHeight()
        const isMined = height != -1
        const explorerUrl = isMined
            ? `${this.props.explorerUrl}/block/${block.getHeight()}`
            : `${this.props.explorerUrl}/mempool`

        return (
            <a
                className="block"
                title=""
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.openURL(explorerUrl)
                    return false
                }}
                href="#">
                <TransactionMempoolStatusIcon isMined={isMined} />
                {isMined ? height : "mempool"}
            </a>
        )
    }
    openURL(url: string) {
        this.props.openURL(url)
    }
}

interface StateProps {
    explorerUrl: string
}

interface OwnProps {
    block: IBlockTemplate
}

type Props = StateProps & OwnProps & DispatchProps

interface DispatchProps {
    openURL: typeof openURL
}

const mapStateToProps = function (state: IApplicationState): StateProps {
    const network = getCurrentNetwork(state)
    return {
        explorerUrl: getExplorerURL(state, network),
    }
}

const mapDispatchToProps = {
    openURL,
}

export default connect(mapStateToProps, mapDispatchToProps)(Block)
