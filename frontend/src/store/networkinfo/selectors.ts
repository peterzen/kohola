import { IApplicationState } from "../types";

export const getBestBlockHeight = (state: IApplicationState): number => {
	return state.networkinfo.currentBlock.getHeight();
}
