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

// Network
export interface INetworkState {
	readonly network: NetworkResponse | null
	readonly errorNetwork: AppError | null
	readonly getNetworkinfoAttempting: boolean,
}


export const initialState: IBestBlockState & INetworkState = {
	error: null,
	currentBlock: null,
	getBestBlockHeightAttempting: false,

	// NetworkInfo
	network: null,
	getNetworkinfoAttempting: false,
	errorNetwork: null,
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

		// NetworkInfo
		getNetworkinfoAttempt(state) {
			state.network = null
			state.errorNetwork = null
			state.getNetworkinfoAttempting = true
		},
		getNetworkinfoFailed(state, action: PayloadAction<AppError>) {
			state.network = null
			state.errorNetwork = action.payload
			state.getNetworkinfoAttempting = false
		},
		getNetworkinfoSuccess(state, action: PayloadAction<NetworkResponse>) {
			state.network = action.payload
			state.errorNetwork = null
			state.getNetworkinfoAttempting = false
		}
	}
})

export const {
	getBestblockAttempt,
	getBestblockFailed,
	getBestblockSuccess,

	getNetworkinfoAttempt,
	getNetworkinfoFailed,
	getNetworkinfoSuccess
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


export const loadNetworkAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		if (getState().networkinfo.getNetworkinfoAttempting) {
			return
		}

		dispatch(getNetworkinfoAttempt())
		try {
			const resp = await LorcaBackend.fetchNetwork()
			dispatch(getNetworkinfoSuccess(resp))
		} catch (error) {
			dispatch(getNetworkinfoFailed(error))
		}
	}
}


// selectors
export const getBestBlock = (state: IApplicationState) => {
	return state.networkinfo.currentBlock
}

export const getBestBlockHeight = (state: IApplicationState) => {
	if (state.networkinfo.currentBlock == null) {
		return 0
	}
	return state.networkinfo.currentBlock.getHeight();
}

export const getCurrentNetwork = (state: IApplicationState): number => {
	const activeNet = state.networkinfo.network?.getActiveNetwork()
	if (activeNet == undefined) return -1
	return CurrencyNet[activeNet]
}
