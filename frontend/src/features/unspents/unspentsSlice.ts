import { createSlice, PayloadAction, ActionCreator } from '@reduxjs/toolkit'

import LorcaBackend from '../../datasources/lorca'
import { AppError, AppDispatch, IGetState, AppThunk } from '../../store/types'
import { UnspentOutputResponse } from '../../proto/api_pb'

export interface IUnspentOutputsByAccount {
	[accountNumbe: number]: UnspentOutputResponse[]
}

export interface IUnspentState {
	fetchUnspentsAttempting: boolean
	fetchUnspentsError: AppError | null
	unspentOutputsByAccount: IUnspentOutputsByAccount
}

export const initialState: IUnspentState = {
	fetchUnspentsAttempting: false,
	unspentOutputsByAccount: {},
	fetchUnspentsError: null
}

interface IUnspentOutputsSuccessPayload {
	accountNumber: number
	unspentOutputs: UnspentOutputResponse[]
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
		getUnspentOutputsSuccess(state, action: PayloadAction<IUnspentOutputsSuccessPayload>) {
			state.fetchUnspentsError = null
			state.fetchUnspentsAttempting = false
			state.unspentOutputsByAccount[action.payload.accountNumber] = action.payload.unspentOutputs
		}
	}
})

export const {
	getUnspentOutputsAttempt,
	getUnspentOutputsFailed,
	getUnspentOutputsSuccess

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
			dispatch(getUnspentOutputsSuccess({
				accountNumber: accountNumber,
				unspentOutputs: resp
			}))
		}
		catch (error) {
			dispatch(getUnspentOutputsFailed(error))
		}
	}
}
