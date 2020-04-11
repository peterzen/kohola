import _ from "lodash"

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
    AppDispatch,
} from "../../store/types"
import {
    AppConfiguration,
    RPCEndpoint,
    GRPCEndpoint,
    AccountPreference,
    WalletPreferences,
    UIPreferences,
} from "../../proto/walletgui_pb"
import { DisplayUnit } from "../../constants"
import AppBackend from "../../middleware/appbackend"
import { getConnectedEndpoint, getConnectedEndpointId } from "../app/appSlice"
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
        getConfigFailed(state, action) {},
        setAccountPreference(
            state,
            action: PayloadAction<{
                preference: AccountPreference
                walletEndpointId: string
            }>
        ) {
            const { preference, walletEndpointId } = action.payload
            const walletPrefs = getWalletPrefs(state, walletEndpointId)
            const accountPrefs = walletPrefs.getAccountPrefsList()
            walletPrefs.setAccountPrefsList(
                updateObjectInList(accountPrefs, preference, "accountNumber")
            )
            state.appConfig.setWalletPreferencesList(
                updateObjectInList(
                    state.appConfig.getWalletPreferencesList(),
                    walletPrefs,
                    "walletEndpointId"
                )
            )
        },
        updateUiPreferences(
            state,
            action: PayloadAction<{ uiPreferences: UIPreferences }>
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
            action: PayloadAction<RunAccountMixerRequest>
        ) {
            state.appConfig.setAccountMixerRequestDefaults(action.payload)
        },
        setAutobuyerRequestDefaults(
            state,
            action: PayloadAction<RunTicketBuyerRequest>
        ) {
            state.appConfig.setRunAutoBuyerRequestDefaults(action.payload)
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
        const pref = new AccountPreference()
        pref.setAccountNumber(accountNumber)
        pref.setIsHidden(isHidden)
        dispatch(
            setAccountPreference({
                walletEndpointId: walletEndpointId,
                preference: pref,
            })
        )
        dispatch(saveConfigurationAttempt())
    }
}

export const saveTicketbuyerRequestDefaults: ActionCreator<any> = (
    request: RunTicketBuyerRequest
) => {
    return async (dispatch: Dispatch) => {
        dispatch(setAutobuyerRequestDefaults(request))
        dispatch(saveConfigurationAttempt())
    }
}

export const saveAccountMixerRequestDefaults: ActionCreator<any> = (
    request: RunAccountMixerRequest
) => {
    return async (dispatch: Dispatch) => {
        dispatch(setMixerRequestDefaults(request))
        dispatch(saveConfigurationAttempt())
    }
}

// selectors
export interface IIndexedAccountPrefs {
    [accountNumber: number]: AccountPreference
}

export const getAccountPrefs = (
    state: IApplicationState
): IIndexedAccountPrefs => {
    const indexedAccountPrefs: IIndexedAccountPrefs = {}
    const walletEndpointId = getConnectedEndpointId(state)
    const prefs = getWalletPrefs(state.appconfiguration, walletEndpointId)
    _.each(
        prefs.getAccountPrefsList(),
        (p) => (indexedAccountPrefs[p.getAccountNumber()] = p)
    )
    return indexedAccountPrefs
}

export const getWalletPrefs = (
    appConfigurationState: IAppConfigurationState,
    walletEndpointId: string
): WalletPreferences => {
    const walletPrefs =
        appConfigurationState.appConfig.getWalletPreferencesList() || []
    let pref = _.find(
        walletPrefs,
        (p) => p.getWalletEndpointId() == walletEndpointId
    )
    if (pref == undefined) {
        pref = new WalletPreferences()
        pref.setWalletEndpointId(walletEndpointId)
    }
    return pref
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
        new UIPreferences()
    )
}
