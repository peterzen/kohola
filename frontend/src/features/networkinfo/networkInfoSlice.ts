import { BestBlock, Network } from "../../models";
import { AppError } from "../../store/types";
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";
import LorcaBackend from "../../datasources/lorca";
import { NetworkResponse, BestBlockResponse } from "../../proto/api_pb";
import { AppThunk, IApplicationState } from "../../store/store";


export interface IBestBlockState {
	readonly error: AppError | null
	readonly currentBlock: BestBlock | null
	readonly getBestBlockHeightAttempting: boolean
}

// Network

export interface INetworkState {
	readonly network: Network | null
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
		getBestblockAttempt(state) {
			state.getBestBlockHeightAttempting = true
		},
		getBestblockFailed(state, action: PayloadAction<AppError>) {
			state.currentBlock = null
			state.getBestBlockHeightAttempting = false
			state.error = action.payload
		},
		getBestblockSuccess(state, action: PayloadAction<BestBlock>) {
			state.getBestBlockHeightAttempting = false
			state.currentBlock = action.payload
			state.error = null
		},

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

export const loadBestBlockHeight = (): AppThunk => {
	return async (dispatch, getState) => {

		if (getState().networkinfo.getBestBlockHeightAttempting) {
			return
		}

		dispatch(getBestblockAttempt())
		try {
			const resp = await LorcaBackend.fetchBestBlock() as BestBlock
			dispatch(getBestblockSuccess(resp))
		} catch (error) {
			dispatch(getBestblockFailed(error))
		}
	}
}


export const loadNetworkAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {
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
