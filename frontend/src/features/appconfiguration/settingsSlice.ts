import _ from 'lodash';

import { createSlice, PayloadAction, ActionCreator, Dispatch } from '@reduxjs/toolkit'
import { AppError, IGetState, IApplicationState, AppDispatch } from '../../store/types';
import { AppConfiguration, RPCEndpoint, GRPCEndpoint, AccountPreference, WalletPreferences } from '../../proto/dcrwalletgui_pb';
import AppBackend from '../../datasources/appbackend';
import { getConnectedEndpoint, getConnectedEndpointId } from '../app/appSlice';
import { updateObjectInList, deleteObjectFromList } from '../../helpers/protobufHelpers';
import { RunAccountMixerRequest, RunTicketBuyerRequest } from '../../proto/api_pb';


export interface IAppConfigurationState {
	appConfig: AppConfiguration
	setConfigError: AppError | null
	setConfigAttempting: boolean
	currentWalletEndpointId: string
}

export const initialState: IAppConfigurationState = {
	appConfig: new AppConfiguration(),
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
		},
		getConfigSuccess(state, action: PayloadAction<AppConfiguration>) {
			state.appConfig = action.payload
		},
		getConfigFailed(state, action) {

		},
		setAccountPreference(state, action: PayloadAction<{ preference: AccountPreference, walletEndpointId: string }>) {
			const { preference, walletEndpointId } = action.payload
			const walletPrefs = getWalletPrefs(state, walletEndpointId)
			const accountPrefs = walletPrefs.getAccountPrefsList()
			walletPrefs.setAccountPrefsList(
				updateObjectInList(accountPrefs, preference, "accountNumber")
			)
			state.appConfig.setWalletPreferencesList(
				updateObjectInList(state.appConfig.getWalletPreferencesList(), walletPrefs, "walletEndpointId")
			)
		},
		updateEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
			const endpoint = action.payload
			state.appConfig.setWalletEndpointsList(
				updateObjectInList(state.appConfig.getWalletEndpointsList(), endpoint, "id")
			)
		},
		deleteEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
			const endpoint = action.payload
			state.appConfig.setWalletEndpointsList(
				deleteObjectFromList(state.appConfig.getWalletEndpointsList(), endpoint, "id")
			)
		},
		setDefaultEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
			const ep = action.payload
			state.appConfig.setDefaultWalletEndpointId(ep.getId())
		},
		setMixerRequestDefaults(state, action: PayloadAction<RunAccountMixerRequest>) {
			state.appConfig.setAccountMixerRequestDefaults(action.payload)
		},
		setAutobuyerRequestDefaults(state, action: PayloadAction<RunTicketBuyerRequest>) {
			state.appConfig.setRunAutoBuyerRequestDefaults(action.payload)
		},
	}
})

export const {
	setConfigAttempt,
	setConfigFailed,
	setConfigSuccess,
	getConfigSuccess,
	getConfigFailed,

	setAccountPreference,
	updateEndpoint,
	deleteEndpoint,
	setDefaultEndpoint,

	setMixerRequestDefaults,
	setAutobuyerRequestDefaults,

} = settingsSlice.actions

export default settingsSlice.reducer

export const getConfiguration: ActionCreator<any> = () => {

	return async (dispatch: Dispatch) => {
		try {
			const cfg = await AppBackend.fetchAppConfig()
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
		}
		catch (error) {
			dispatch(setConfigFailed(error))
		}
	}
}

export const updateAccountPreference: ActionCreator<any> = (walletEndpointId: string, accountNumber: number, isHidden: boolean) => {
	return async (dispatch: Dispatch) => {
		const pref = new AccountPreference()
		pref.setAccountNumber(accountNumber)
		pref.setIsHidden(isHidden)
		dispatch(setAccountPreference({
			walletEndpointId: walletEndpointId,
			preference: pref
		}))
		dispatch(saveConfigurationAttempt())
	}
}

export const saveTicketbuyerRequestDefaults: ActionCreator<any> = (request: RunTicketBuyerRequest) => {
	return async (dispatch: Dispatch) => {
		dispatch(setAutobuyerRequestDefaults(request))
		dispatch(saveConfigurationAttempt())
	}
}

// selectors
export interface IIndexedAccountPrefs {
	[accountNumber: number]: AccountPreference
}

export const getAccountPrefs = (state: IApplicationState): IIndexedAccountPrefs => {
	const indexedAccountPrefs: IIndexedAccountPrefs = {}
	const walletEndpointId = getConnectedEndpointId(state)
	const prefs = getWalletPrefs(state.appconfiguration, walletEndpointId)
	_.each(prefs.getAccountPrefsList(), (p) => indexedAccountPrefs[p.getAccountNumber()] = p)
	return indexedAccountPrefs
}

export const getWalletPrefs = (appConfigurationState: IAppConfigurationState, walletEndpointId: string): WalletPreferences => {
	const walletPrefs = appConfigurationState.appConfig.getWalletPreferencesList() || []
	let pref = _.find(walletPrefs, (p) => p.getWalletEndpointId() == walletEndpointId)
	if (pref == undefined) {
		pref = new WalletPreferences()
		pref.setWalletEndpointId(walletEndpointId)
	}
	return pref
}

export const getAppConfig = (state: IApplicationState) => state.appconfiguration.appConfig
