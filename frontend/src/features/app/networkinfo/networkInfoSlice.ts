import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";

import { AppError, AppThunk, IApplicationState, AppDispatch, IGetState } from "../../../store/types";
import LorcaBackend from "../../../middleware/lorca";
import { NetworkResponse, BestBlockResponse } from "../../../proto/api_pb";
import { CurrencyNet, Networks } from "../../../constants";

// BestBlock
export interface IBestBlockState {
	readonly error: AppError | null
	readonly currentBlock: BestBlockResponse | null
	readonly getBestBlockHeightAttempting: boolean
}

export const initialState: IBestBlockState = {
	error: null,
	currentBlock: null,
	getBestBlockHeightAttempting: false,
}

const networkinfoSlice = createSlice({
	name: "networkSlice",
	initialState,
	reducers: {
		// BestBlock
		getBestblockAttempt(state) {
			state.getBestBlockHeightAttempting = true
		},
		getBestblockFailed(state, action: PayloadAction<AppError>) {
			state.currentBlock = null
			state.getBestBlockHeightAttempting = false
			state.error = action.payload
		},
		getBestblockSuccess(state, action: PayloadAction<BestBlockResponse>) {
			state.getBestBlockHeightAttempting = false
			state.currentBlock = action.payload
			state.error = null
		},
	}
})

export const {
	getBestblockAttempt,
	getBestblockFailed,
	getBestblockSuccess,

} = networkinfoSlice.actions

export default networkinfoSlice.reducer

export const loadBestBlockHeight: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		if (getState().networkinfo.getBestBlockHeightAttempting) {
			return
		}

		dispatch(getBestblockAttempt())
		try {
			const resp = await LorcaBackend.fetchBestBlock()
			dispatch(getBestblockSuccess(resp))
		} catch (error) {
			dispatch(getBestblockFailed(error))
		}
	}
}


// selectors
export const getBestBlock = (state: IApplicationState) => {
	return state.networkinfo.currentBlock
}

export const getBestBlockHeight = (state: IApplicationState): number => {
	if (state.networkinfo.currentBlock == null) {
		return 0
	}
	return state.networkinfo.currentBlock.getHeight();
}

