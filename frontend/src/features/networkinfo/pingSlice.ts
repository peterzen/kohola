import { createSlice } from "@reduxjs/toolkit"
import { WalletPing } from "../../models"
import { AppThunk } from "../../store/store"
import LorcaBackend from "../../datasources/lorca"


export interface PingState {
	readonly getPingResponse: WalletPing | null,
	readonly getPingError: string,
	readonly getPingRequestAttempt: boolean,
	readonly pingTimer: NodeJS.Timeout | null
}


export const initialState: PingState = {
	getPingResponse: null,
	getPingError: "",
	getPingRequestAttempt: false,
	pingTimer: null
}

const pingSlice = createSlice({
	name: "pingSlice",
	initialState,
	reducers: {
		pingAttempted(state) {
			state.getPingError = ""
			state.getPingRequestAttempt = true
			state.pingTimer = null
		},
		pingFailed(state, action) {
			state.getPingResponse = null
			state.getPingError = String(action.payload)
			state.getPingRequestAttempt = false
			state.pingTimer = action.payload.pingTimer
		},
		pingSuccess(state, action) {
			state.getPingError = ""
			state.getPingRequestAttempt = false
			state.getPingResponse = action.payload.response
			state.pingTimer = action.payload.pingTimer
		},
		pingCanceled(state) {
			state.getPingError = ""
			state.getPingRequestAttempt = false
			state.getPingResponse = null
			state.pingTimer = null
		}
	}
})

export const {
	pingAttempted,
	pingFailed,
	pingSuccess,
	pingCanceled
} = pingSlice.actions

export default pingSlice.reducer



export const pingAttempt = (): AppThunk => {
	return async (dispatch) => {
		const pingTimer = setTimeout(() => dispatch(pingAttempt()), 10000);
		try {
			const resp = await LorcaBackend.doPing();
			dispatch(pingSuccess({
				pingTimer: pingTimer,
				response: resp
			}))
		} catch (error) {
			dispatch(pingFailed(error))
		}
	}
}

export const cancelPingAttempt = (): AppThunk => {
	return (dispatch, getState) => {
		const { pingTimer } = getState().ping;
		if (pingTimer) {
			clearTimeout(pingTimer);
			dispatch(pingCanceled())
		}
	};
}


