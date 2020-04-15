import React from "react"
import { connect } from "react-redux"
import _ from "lodash"



import {
	Transaction,
} from "../../middleware/models"

import { rawHashToHex } from "../../helpers/byteActions"
import { IApplicationState } from "../../store/types"
import { openURL, getCurrentNetwork } from "../../features/app/appSlice"
import { getExplorerURL } from "../appconfiguration/settingsSlice"



export default class TransactionHash extends React.Component<{
	tx: Transaction
	truncate?: boolean
}>{
	render() {
		return (
			<TxHash hash={this.props.tx.getHash_asU8()} truncate={this.props.truncate} />
		)
	}
}

 class _TxHash extends React.Component<TxHashProps> {
	render() {
		const h = rawHashToHex(this.props.hash)
		if (h == null) {
			console.error("rawHashToHex returned null")
			return null
		}
		let truncate = true
		if (this.props.truncate != undefined) truncate = this.props.truncate
		const truncLength = truncate ? 15 : 100
		return (
			<a className="tx-hash"
				title={h}
				onClick={(e: React.MouseEvent) => {
					e.preventDefault()
					e.stopPropagation()
					this.openURL(`${this.props.explorerUrl}/tx/${h}`)
					return false
				}}
				href="#">
				{_.truncate(h, { length: truncLength })}
			</a>
		)
	}
	openURL(url: string) {
		this.props.openURL(url)
	}
}

interface StateProps {
	explorerUrl:string
}

interface OwnProps {
	hash: Buffer | Uint8Array
	truncate?: boolean
}

type TxHashProps = StateProps & OwnProps & DispatchProps

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
	openURL
}

export const TxHash = connect(mapStateToProps, mapDispatchToProps)(_TxHash)
 
