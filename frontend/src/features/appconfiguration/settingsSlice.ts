import _ from 'lodash';

import { createSlice, PayloadAction, ActionCreator, Dispatch } from '@reduxjs/toolkit'
import { AppError, IGetState } from '../../store/types';
import { AppConfiguration, RPCEndpoint, GRPCEndpoint, AccountPreference } from '../../proto/dcrwalletgui_pb';
import AppBackend from '../../datasources/appbackend';
import { initializeData } from '../../store/actions';
import { IApplicationState } from '../../store/store';


export interface IAppConfigurationState {
	appConfig: AppConfiguration
	needSetup: boolean
	setConfigError: AppError | null
	setConfigAttempting: boolean
}

export const initialState: IAppConfigurationState = {
	appConfig: new AppConfiguration(),
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
			const cfg = state.appConfig
			if (!cfg.hasDcrdHost()) cfg.setDcrdHost(new RPCEndpoint())
			if (!cfg.getDcrwalletHostsList().length) cfg.addDcrwalletHosts(new GRPCEndpoint())
			state.needSetup = true
			state.appConfig = cfg
		},
		setAccountPreference(state, action: PayloadAction<AccountPreference>) {
			const cfg = state.appConfig
			const newPref = action.payload
			const prefs = cfg.getAccountprefsList()
			const updatedPrefs = _.filter(prefs, (p) => p.getAccountnumber() != newPref.getAccountnumber())
			updatedPrefs.push(newPref)
			cfg.setAccountprefsList(updatedPrefs)
		}
	}
})

export const {
	setConfigAttempt,
	setConfigFailed,
	setConfigSuccess,
	getConfigSuccess,
	getConfigFailed,
	getConfigNeedsSetup,
	setAccountPreference
} = settingsSlice.actions

export default settingsSlice.reducer

export const getConfiguration: ActionCreator<any> = () => {

	return async (dispatch: Dispatch) => {
		try {
			const cfg = await AppBackend.getAppConfig()
			dispatch(getConfigSuccess(cfg))
		}
		catch (error) {
			dispatch(getConfigFailed(error))
		}
	}
}

export const saveConfigurationAttempt: ActionCreator<any> = () => {

	return async (dispatch: Dispatch, getState: IGetState) => {

		const { setConfigAttempting } = getState().appconfiguration
		if (setConfigAttempting == true) {
			return
		}

		dispatch(setConfigAttempt())
		try {
			const cfg = getState().appconfiguration.appConfig
			const response = await AppBackend.setAppConfig(cfg)
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

export const updateAccountPreference: ActionCreator<any> = (accountNumber: number, isHidden: boolean) => {
	return async (dispatch: Dispatch) => {
		const pref = new AccountPreference()
		pref.setAccountnumber(accountNumber)
		pref.setIsHidden(isHidden)
		dispatch(setAccountPreference(pref))
		dispatch(saveConfigurationAttempt())
	}
}

// selectors
export interface IIndexedAccountPrefs {
	[accountNumber: number]: AccountPreference
}

export const getAccountPrefs = (state: IApplicationState): IIndexedAccountPrefs => {
	const indexedAccountPrefs: IIndexedAccountPrefs = {}
	_.each(state.appconfiguration.appConfig.getAccountprefsList(), (p) => indexedAccountPrefs[p.getAccountnumber()] = p)
	return indexedAccountPrefs
}
