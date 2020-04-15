import _ from "lodash"
import * as jspb from "google-protobuf"

import {
    createSlice,
    PayloadAction,
    ActionCreator,
    Dispatch,
} from "@reduxjs/toolkit"
import {
    AppError,
    IGetState,
    IApplicationState,
} from "../../store/types"
import {
    AppConfiguration,
    GRPCEndpoint,
} from "../../proto/walletgui_pb"
import { Networks } from "../../constants"
import AppBackend from "../../middleware/appbackend"
import { getConnectedEndpointId } from "../app/appSlice"
import {
    updateObjectInList,
    deleteObjectFromList,
} from "../../helpers/protobufHelpers"
import {
    RunAccountMixerRequest,
    RunTicketBuyerRequest,
} from "../../proto/api_pb"

type PassphraseCallback = () => void

export interface IAppConfigurationState {
    appConfig: AppConfiguration
    appConfigDecryptionKey: string
    appConfigDecryptionKeyRequested: boolean
    appConfigDecryptionKeyCallback: PassphraseCallback | null

    setConfigError: AppError | null
    setConfigAttempting: boolean
    currentWalletEndpointId: string
}

export const initialState: IAppConfigurationState = {
    appConfig: new AppConfiguration(),
    appConfigDecryptionKey: "",
    appConfigDecryptionKeyRequested: false,
    appConfigDecryptionKeyCallback: null,

    setConfigError: null,
    setConfigAttempting: false,
    currentWalletEndpointId: "",
}

const settingsSlice = createSlice({
    name: "settingsSlice",
    initialState,
    reducers: {
        requestConfigurationDecryptionKeyAttempt(
            state,
            action: PayloadAction<PassphraseCallback>
        ) {
            state.appConfigDecryptionKey = ""
            state.appConfigDecryptionKeyRequested = true
            state.appConfigDecryptionKeyCallback = action.payload
        },
        requestConfigurationDecryptionKeySuccess(
            state,
            action: PayloadAction<string>
        ) {
            state.appConfigDecryptionKeyRequested = false
            state.appConfigDecryptionKey = action.payload
            if (state.appConfigDecryptionKeyCallback != null) {
                state.appConfigDecryptionKeyCallback()
                state.appConfigDecryptionKeyCallback = null
            }
        },
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
        getConfigFailed(state, action) { },
        setAccountPreference(
            state,
            action: PayloadAction<{
                preference: AppConfiguration.AccountPreference
                accountNumber: number
                walletEndpointId: string
            }>
        ) {
            const { preference, accountNumber, walletEndpointId } = action.payload
            const walletPrefs = state.appConfig.getWalletPreferencesMap().get(walletEndpointId) || new AppConfiguration.WalletPreferences()
            walletPrefs.getAccountPrefsMap().set(accountNumber, preference)
        },
        updateUiPreferences(
            state,
            action: PayloadAction<{ uiPreferences: AppConfiguration.UIPreferences }>
        ) {
            state.appConfig.setUiPreferences(action.payload.uiPreferences)
        },
        updateEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
            const endpoint = action.payload
            state.appConfig.setWalletEndpointsList(
                updateObjectInList(
                    state.appConfig.getWalletEndpointsList(),
                    endpoint,
                    "id"
                )
            )
        },
        deleteEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
            const endpoint = action.payload
            state.appConfig.setWalletEndpointsList(
                deleteObjectFromList(
                    state.appConfig.getWalletEndpointsList(),
                    endpoint,
                    "id"
                )
            )
        },
        setDefaultEndpoint(state, action: PayloadAction<GRPCEndpoint>) {
            const ep = action.payload
            state.appConfig.setDefaultWalletEndpointId(ep.getId())
        },
        setMixerRequestDefaults(
            state,
            action: PayloadAction<{
                accountMixerDefaults: RunAccountMixerRequest,
                walletEndpointId: string
            }>
        ) {
            const { accountMixerDefaults, walletEndpointId } = action.payload
            state.appConfig.getWalletPreferencesMap().get(walletEndpointId)?.setAccountMixerRequestDefaults(accountMixerDefaults)
        },
        setAutobuyerRequestDefaults(
            state,
            action: PayloadAction<{
                ticketBuyerDefaults: RunTicketBuyerRequest
                walletEndpointId: string
            }>
        ) {
            const { ticketBuyerDefaults, walletEndpointId } = action.payload
            state.appConfig.getWalletPreferencesMap().get(walletEndpointId)?.setRunAutoBuyerRequestDefaults(ticketBuyerDefaults)
        },
    },
})

export const {
    requestConfigurationDecryptionKeyAttempt,
    requestConfigurationDecryptionKeySuccess,

    setConfigAttempt,
    setConfigFailed,
    setConfigSuccess,
    getConfigSuccess,
    getConfigFailed,

    setAccountPreference,
    updateUiPreferences,
    updateEndpoint,
    deleteEndpoint,
    setDefaultEndpoint,

    setMixerRequestDefaults,
    setAutobuyerRequestDefaults,
} = settingsSlice.actions

export default settingsSlice.reducer

export const getConfiguration: ActionCreator<any> = () => {
    return async (dispatch: Dispatch, getState: IGetState) => {
        try {
            const cfg = await AppBackend.fetchAppConfig(
                getState().appconfiguration.appConfigDecryptionKey
            )
            dispatch(getConfigSuccess(cfg))
        } catch (error) {
            await dispatch(requestConfigurationDecryptionKey())
            await dispatch(getConfiguration())
        }
    }
}

export const requestConfigurationDecryptionKey: ActionCreator<any> = () => {
    return async (dispatch: Dispatch) => {
        return new Promise((resolve) => {
            dispatch(
                requestConfigurationDecryptionKeyAttempt(() => {
                    resolve()
                })
            )
        })
    }
}

export const saveConfigurationAttempt: ActionCreator<any> = (
    passphrase?: string
) => {
    return async (dispatch: Dispatch, getState: IGetState) => {
        const { setConfigAttempting } = getState().appconfiguration
        if (setConfigAttempting == true) {
            return
        }

        dispatch(setConfigAttempt())
        try {
            const cfg = getState().appconfiguration.appConfig
            const response = await AppBackend.setAppConfig(cfg, passphrase)
            dispatch(setConfigSuccess(response))
            // await dispatch(getConfiguration())
        } catch (error) {
            dispatch(setConfigFailed(error))
        }
    }
}

export const updateAccountPreference: ActionCreator<any> = (
    walletEndpointId: string,
    accountNumber: number,
    isHidden: boolean
) => {
    return async (dispatch: Dispatch) => {
        const pref = new AppConfiguration.AccountPreference()
        pref.setIsHidden(isHidden)
        dispatch(
            setAccountPreference({
                preference: pref,
                accountNumber: accountNumber,
                walletEndpointId: walletEndpointId,
            })
        )
        dispatch(saveConfigurationAttempt())
    }
}

export const saveTicketbuyerRequestDefaults: ActionCreator<any> = (
    walletEndpointId: string,
    request: RunTicketBuyerRequest
) => {
    return async (dispatch: Dispatch) => {
        dispatch(setAutobuyerRequestDefaults({
            walletEndpointId: walletEndpointId,
            ticketBuyerDefaults: request,
        }))
        dispatch(saveConfigurationAttempt())
    }
}

export const saveAccountMixerRequestDefaults: ActionCreator<any> = (
    walletEndpointId: string,
    request: RunAccountMixerRequest
) => {
    return async (dispatch: Dispatch) => {
        dispatch(setMixerRequestDefaults({
            walletEndpointId: walletEndpointId,
            accountMixerDefaults: request,
        }))
        dispatch(saveConfigurationAttempt())
    }
}

// selectors
export const getAccountPrefs = (state: IApplicationState): jspb.Map<number, AppConfiguration.AccountPreference> => {
    const walletEndpointId = getConnectedEndpointId(state)
    const walletPrefs = state.appconfiguration.appConfig.getWalletPreferencesMap().get(walletEndpointId)
    if (walletPrefs == undefined) {
        state.appconfiguration.appConfig.getWalletPreferencesMap().set(walletEndpointId, new AppConfiguration.WalletPreferences())
    }
    return state.appconfiguration.appConfig.getWalletPreferencesMap().get(walletEndpointId)!.getAccountPrefsMap()
}

export const getWalletPrefs = (
    appConfigurationState: IAppConfigurationState,
    walletEndpointId: string
): AppConfiguration.WalletPreferences | undefined => {
    return appConfigurationState.appConfig.getWalletPreferencesMap().get(walletEndpointId)
}

export const getAppConfig = (state: IApplicationState) =>
    state.appconfiguration.appConfig

export const getWalletEndpoints = (state: IApplicationState) => {
    return state.appconfiguration.appConfig.getWalletEndpointsList()
}

export const getUiPreferences = (
    appConfigurationState: IAppConfigurationState
) => {
    return (
        appConfigurationState.appConfig.getUiPreferences() ||
        new AppConfiguration.UIPreferences()
    )
}

export const getExplorerURL = (state: IApplicationState, network: Networks) => {
    switch (network) {
        case Networks.MAINNET:
            return "https://explorer.dcrdata.org"
        case Networks.TESTNET:
            return "https://testnet.dcrdata.org"
        default:
            return ""
    }
}
