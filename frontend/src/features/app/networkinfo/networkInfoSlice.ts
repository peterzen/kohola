import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";

import { AppError, AppThunk, IApplicationState, AppDispatch, IGetState } from "../../../store/types";
import LorcaBackend from "../../../api/lorca";
import { NetworkResponse, BestBlockResponse } from "../../../proto/api_pb";

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
			state.getNetworkinfoAttempting = true
		},
		getNetworkinfoFailed(state, action: PayloadAction<AppError>) {
			state.getNetworkinfoAttempting = false
			state.errorNetwork = action.payload
			state.network = null
		},
		getNetworkinfoSuccess(state, action: PayloadAction<NetworkResponse>) {
			state.getNetworkinfoAttempting = false
			state.errorNetwork = null
			state.network = action.payload
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
