import _ from "lodash";
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";

import { AppError, AppThunk } from "../../store/types";
import {
	RunAccountMixerResponse,
	RunAccountMixerRequest} from "../../proto/api_pb";
import LorcaBackend from "../../api/lorca";


// RunAccountMixer
export interface IRunAccountMixerState {
	readonly runAccountMixerAttempting: boolean
	readonly runAccountMixerResponse: RunAccountMixerResponse | null
	readonly runAccountMixerError: AppError | null
	readonly isAccountMixerRunning: boolean
	readonly stopAccountMixerAttempting: boolean
}


export const initialState: IRunAccountMixerState = {

	// RunAccountMixer
	runAccountMixerAttempting: false,
	runAccountMixerResponse: null,
	runAccountMixerError: null,
	isAccountMixerRunning: false,
	stopAccountMixerAttempting: false,

}

const stakingSlice = createSlice({
	name: "stakingSlice",
	initialState,
	reducers: {
	

		// RunAccountMixer
		runAccountMixerAttempt(state) {
			state.runAccountMixerAttempting = true
			state.runAccountMixerResponse = null
			state.runAccountMixerError = null
			state.isAccountMixerRunning = false
		},
		runAccountMixerFailed(state, action: PayloadAction<AppError>) {
			state.runAccountMixerAttempting = false
			state.runAccountMixerResponse = null
			state.runAccountMixerError = action.payload
			state.isAccountMixerRunning = false
		},
		runAccountMixerSuccess(state) {
			state.runAccountMixerAttempting = false
			state.runAccountMixerResponse = null
			state.runAccountMixerError = null
			state.isAccountMixerRunning = true
		},
		stopAccountMixerAttempt(state) {
			state.stopAccountMixerAttempting = true
		},
		stopAccountMixerSuccess(state) {
			state.runAccountMixerError = null
			state.isAccountMixerRunning = false
			state.stopAccountMixerAttempting = false
		},

	
	}
})


export const {

	// RunAccountMixer
	runAccountMixerAttempt,
	runAccountMixerFailed,
	runAccountMixerSuccess,
	stopAccountMixerAttempt,
	stopAccountMixerSuccess,

} = stakingSlice.actions

export default stakingSlice.reducer

export const runAccountMixer: ActionCreator<any> = (request: RunAccountMixerRequest): AppThunk => {
	return async (dispatch, getState) => {

		const { runAccountMixerAttempting } = getState().mixer;
		if (runAccountMixerAttempting) {
			return
		}
		dispatch(runAccountMixerAttempt())

		const onErrorFn = (errorMsg: string) => {
			if (getState().mixer.stopAccountMixerAttempting) {
				dispatch(stopAccountMixerSuccess())
			} else {
				const err = new AppError(0, errorMsg)
				dispatch(runAccountMixerFailed(err))
			}
		}
		const onDoneFn = () => {
			dispatch(runAccountMixerSuccess())
		}
		const onStopFn = () => {
			dispatch(stopAccountMixerSuccess())
		}

		try {
			await LorcaBackend.runAccountMixer(request, onErrorFn, onDoneFn, onStopFn)
		} catch (error) {
			dispatch(runAccountMixerFailed(error))
		}
	}
}


export const stopAccountMixer: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {

		const { stopAccountMixerAttempting } = getState().mixer;
		if (stopAccountMixerAttempting) {
			return
		}

		dispatch(stopAccountMixerAttempt())
		try {
			await LorcaBackend.stopAccountMixer()
			// debugger
		} catch (error) {
			// dispatch(stopAccountMixerFailed(error))
		}
	}
}


