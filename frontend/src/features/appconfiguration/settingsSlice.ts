import _ from 'lodash';

import { createSlice, PayloadAction, ActionCreator, Dispatch } from '@reduxjs/toolkit'
import { AppError, IGetState, IApplicationState } from '../../store/types';
import { AppConfiguration, RPCEndpoint, GRPCEndpoint, AccountPreference, WalletPreferences } from '../../proto/dcrwalletgui_pb';
import AppBackend from '../../datasources/appbackend';


export interface IAppConfigurationState {
	appConfig: AppConfiguration
	needSetup: boolean
	setConfigError: AppError | null
	setConfigAttempting: boolean
	currentWalletEndpointId: string
}

export const initialState: IAppConfigurationState = {
	appConfig: new AppConfiguration(),
	needSetup: false,
	setConfigError: null,
	setConfigAttempting: false,
	currentWalletEndpointId: "",
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
			if (!cfg.hasDcrdEndpoint()) cfg.setDcrdEndpoint(new RPCEndpoint())
			if (!cfg.getWalletEndpointsList().length) cfg.addWalletEndpoints(new GRPCEndpoint())
			state.needSetup = true
			state.appConfig = cfg
		},
		setAccountPreference(state, action: PayloadAction<AccountPreference>) {
			// const cfg = state.appConfig
			// const newPref = action.payload
			// const prefs = cfg.getAccountprefsList()
			// const updatedPrefs = _.filter(prefs, (p) => p.getAccountnumber() != newPref.getAccountnumber())
			// updatedPrefs.push(newPref)
			// cfg.setAccountprefsList(updatedPrefs)
		},
		updateEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
			const ep = action.payload
			const endpoints = _.filter(state.appConfig.getWalletEndpointsList(), (e) => ep.getId() != e.getId())
			endpoints.push(ep)
			state.appConfig.setWalletEndpointsList(endpoints)
		},
		deleteEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
			const ep = action.payload
			const endpoints = _.filter(state.appConfig.getWalletEndpointsList(), (e) => ep.getId() != e.getId())
			state.appConfig.setWalletEndpointsList(endpoints)
		},
		setDefaultEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
			const ep = action.payload
			state.appConfig.setDefaultWalletEndpointId(ep.getId())
		},
	}
})

export const {
	setConfigAttempt,
	setConfigFailed,
	setConfigSuccess,
	getConfigSuccess,
	getConfigFailed,
	getConfigNeedsSetup,
	setAccountPreference,
	updateEndpoint,
	deleteEndpoint,
	setDefaultEndpoint,
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
			// await dispatch(getConfiguration())
			// await dispatch(initializeData())
		}
		catch (error) {
			dispatch(setConfigFailed(error))
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
	// _.each(state.appconfiguration.appConfig.getWalletPreferencesList(), (p) => indexedAccountPrefs[p.getAccountnumber()] = p)
	return indexedAccountPrefs
}

export const getWalletPrefs = (state: IApplicationState): WalletPreferences | null => {
	const currentWalletId = state.appconfiguration.currentWalletEndpointId
	const walletPrefs = state.appconfiguration.appConfig.getWalletPreferencesList()
	if (walletPrefs == undefined) {
		return null
	}
	const pref = _.find(walletPrefs, (p) => p.getWalletEndpointId() == currentWalletId)
	return pref == undefined ? null : pref
}
