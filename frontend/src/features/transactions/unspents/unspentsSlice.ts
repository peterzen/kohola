import _ from "lodash"
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit"

import LorcaBackend from "../../../middleware/lorca"
import {
	AppError,
	AppDispatch,
	IGetState,
	AppThunk,
	IApplicationState,
} from "../../../store/types"
import { UnspentOutput } from "../../../proto/walletgui_pb"

export interface IUnspentOutputsByAccount {
	[accountNumbe: number]: UnspentOutput[]
}

export interface IUnspentState {
	fetchUnspentsAttempting: boolean
	fetchUnspentsError: AppError | null
	unspentOutputsByAccount: IUnspentOutputsByAccount
}

export const initialState: IUnspentState = {
	fetchUnspentsAttempting: false,
	unspentOutputsByAccount: {},
	fetchUnspentsError: null,
}

interface IUnspentOutputsSuccessPayload {
	accountNumber: number
	unspentOutputs: UnspentOutput[]
}

const unspentsDisplaySlice = createSlice({
	name: "unspentsDisplay",
	initialState,
	reducers: {
		getUnspentOutputsAttempt(state) {
			state.fetchUnspentsAttempting = true
			state.fetchUnspentsError = null
		},
		getUnspentOutputsFailed(state, action: PayloadAction<AppError>) {
			state.fetchUnspentsError = action.payload
			state.fetchUnspentsAttempting = false
		},
		getUnspentOutputsSuccess(
			state,
			action: PayloadAction<IUnspentOutputsSuccessPayload>
		) {
			state.fetchUnspentsError = null
			state.fetchUnspentsAttempting = false
			state.unspentOutputsByAccount[action.payload.accountNumber] =
				action.payload.unspentOutputs
		},
	},
})

export const {
	getUnspentOutputsAttempt,
	getUnspentOutputsFailed,
	getUnspentOutputsSuccess,
} = unspentsDisplaySlice.actions

export default unspentsDisplaySlice.reducer

export const fetchUnspentsAttempt: ActionCreator<any> = (
	accountNumber: number,
	targetAmount: number = 0,
	requiredConfirmations: number = 1,
	includeImmature: boolean = false
): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		if (getState().unspentoutputs.fetchUnspentsAttempting) {
			return
		}

		dispatch(getUnspentOutputsAttempt())
		try {
			const resp = await LorcaBackend.unspentOutputs(
				accountNumber,
				targetAmount,
				requiredConfirmations,
				includeImmature
			)
			dispatch(
				getUnspentOutputsSuccess({
					accountNumber: accountNumber,
					unspentOutputs: resp,
				})
			)
		} catch (error) {
			dispatch(getUnspentOutputsFailed(error))
		}
	}
}

// selectors
export const getUTXOs = (
	state: IApplicationState,
	accountNumber: number
) => {
	return _.filter(
		state.unspentoutputs.unspentOutputsByAccount[accountNumber],
		(u) => true
	)
}


export const getSpendableUTXOs = (
	state: IApplicationState,
	accountNumber: number
) => {
	return state.unspentoutputs.unspentOutputsByAccount[accountNumber]
}


