

import { createSlice, PayloadAction, ActionCreator, Dispatch } from '@reduxjs/toolkit'
import { AppError, IGetState } from '../../store/types';
import { AppConfiguration, RPCEndpoint, GRPCEndpoint } from '../../proto/dcrwalletgui_pb';
import AppBackend from '../../datasources/appbackend';
import { initializeData } from '../../store/actions';


export interface IAppConfigurationState {
	appConfig: AppConfiguration | null
	needSetup: boolean
	setConfigError: AppError | null
	setConfigAttempting: boolean
}

export const initialState: IAppConfigurationState = {
	appConfig: null,
	needSetup: false,
	setConfigError: null,
	setConfigAttempting: false,
}

const settingsSlice = createSlice({
	name: "settingsSlice",
	initialState,
	reducers: {
		setConfigAttempt(state) {
			state.setConfigAttempting = true
		},
		setConfigFailed(state, action: PayloadAction<AppError>) {
			state.setConfigError = action.payload
			state.setConfigAttempting = false
		},
		setConfigSuccess(state, action: PayloadAction<AppConfiguration>) {
			state.setConfigAttempting = false
			state.setConfigError = null
			state.needSetup = false
		},
		getConfigSuccess(state, action: PayloadAction<AppConfiguration>) {
			state.appConfig = action.payload
		},
		getConfigFailed(state, action) {

		},
		getConfigNeedsSetup(state) {
			const appConfig = state.appConfig || new AppConfiguration()
			if (!appConfig.hasDcrdHost()) appConfig.setDcrdHost(new RPCEndpoint())
			if (!appConfig.getDcrwalletHostsList().length) appConfig.addDcrwalletHosts(new GRPCEndpoint())
			state.needSetup = true
			state.appConfig = appConfig
		}
	}
})

export const {
	setConfigAttempt,
	setConfigFailed,
	setConfigSuccess,
	getConfigSuccess,
	getConfigFailed,
	getConfigNeedsSetup
} = settingsSlice.actions

export default settingsSlice.reducer



export const getConfiguration: ActionCreator<any> = () => {

	return async (dispatch: Dispatch) => {
		try {
			const appConfig = await AppBackend.getAppConfig()
			dispatch(getConfigSuccess(appConfig))
		}
		catch (error) {
			dispatch(getConfigFailed(error))
		}
	}
}


export const saveConfigurationAttempt: ActionCreator<any> = (appConfig: AppConfiguration) => {

	return async (dispatch: Dispatch, getState: IGetState) => {

		const { setConfigAttempting } = getState().appconfiguration

		if (setConfigAttempting == true) {
			return
		}
		dispatch(setConfigAttempt())
		try {
			const response = await AppBackend.setAppConfig(appConfig)
			dispatch(setConfigSuccess(response))
			await dispatch(getConfiguration())
			await dispatch(initializeData())
		}
		catch (error) {
			dispatch(setConfigFailed(error))
		}
	}
}


export const canStartup: ActionCreator<any> = () => {
	return async (dispatch: Dispatch) => {
		try {
			const r = await AppBackend.canStartup();
			if (r.getNeedsSetup() == true) {
				dispatch(getConfigNeedsSetup())
			}
		}
		catch (error) {
			dispatch(getConfigFailed(error))
		}
	}
}
