import { getBestBlock } from "../features/app/networkinfo/networkInfoSlice"
import { IApplicationState, AppError } from "../store/types"
import moment from "./moment-helper"


export interface BlockHeightRange {
	startblockHeight: number
	endblockHeight: number
}

export const timestampToBlockHeight = (state: IApplicationState, startTimestamp: number, endTimestamp: number) => {

	const bestblock = getBestBlock(state)
	const bestblockHeight = bestblock?.getHeight()

	if (bestblockHeight == undefined) {
		throw new AppError(10, "Cannot get best block height")
	}

	const currentTimestamp = moment.default().unix()
	if (endTimestamp == 0) {
		endTimestamp = currentTimestamp
	}

	const endblockHeight = Math.floor(bestblockHeight - (currentTimestamp - endTimestamp) / (5 * 60))
	const startblockHeight = Math.floor(bestblockHeight - (currentTimestamp - startTimestamp) / (5 * 60))

	const range: BlockHeightRange = {
		startblockHeight: startblockHeight,
		endblockHeight: endblockHeight,
	}
	return range
}
