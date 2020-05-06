import _ from "lodash"
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit"
import { batch } from "react-redux"

import store, { history } from "../../store/store"

import { GRPCEndpoint } from "../../proto/walletgui_pb"
import {
    AppError,
    AppThunk,
    AppDispatch,
    IApplicationState,
    IGetState,
} from "../../store/types"
import { AccountNotificationsResponse } from "../../proto/api_pb"

import { hexToRaw } from "../../helpers/byteActions"
import { loadBestBlockHeight } from "./networkinfo/networkInfoSlice"
import {
    loadAccountsAttempt,
    accountNotification,
} from "../balances/accountSlice"
import {
    createTxNotificationReceivers,
    loadTransactionsAttempt,
} from "../transactions/actions"
import { loadWalletBalance } from "../balances/walletBalanceSlice"
import { loadTicketsAttempt, loadStakeInfoAttempt, loadStakingHistory } from "../staking/stakingSlice"
import {
    showTransactionToast,
    showInfoToast,
    showDangerToast,
} from "./fixtures/Toasts"
import { Transaction } from "../../middleware/models"
import AppBackend from "../../middleware/appbackend"
import {
    getWalletEndpoints,
    getConfiguration,
} from "../appconfiguration/settingsSlice"
import { CurrencyNet } from "../../constants"
import { subscribeExchangeRateFeed } from "../market/marketSlice"
import { loadWalletConfig } from "./walletSlice"

const w = window as any

import { ThemeConfig } from "bootstrap-darkmode"

export interface AppState {
    readonly isWalletConnected: boolean
    readonly currentWalletEndpoint: GRPCEndpoint | null
    readonly connectWalletError: AppError | null
    readonly connectWalletAttempting: boolean

    readonly progressbarShown: boolean
}

export interface IEndpointConnectionState {
    readonly isEndpointConnected: boolean
    readonly endpointConnectionErrorMsg: string
    readonly endpointLastConnectionCheckTs: number
}

export const initialState: AppState & IEndpointConnectionState = {
    isWalletConnected: false,
    connectWalletError: null,
    currentWalletEndpoint: null,
    connectWalletAttempting: false,

    progressbarShown: false,

    // endpointConnectionStatusChange
    isEndpointConnected: false,
    endpointConnectionErrorMsg: "",
    endpointLastConnectionCheckTs: 0,
}

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        connectWalletAttempting(state) {
            state.isWalletConnected = false
            state.connectWalletError = null
            state.currentWalletEndpoint = null
            state.connectWalletAttempting = true
        },
        connectWalletSuccess(state, action: PayloadAction<GRPCEndpoint>) {
            state.connectWalletError = null
            state.currentWalletEndpoint = action.payload
            state.connectWalletAttempting = false
        },
        connectWalletFailed(state, action: PayloadAction<AppError>) {
            state.isWalletConnected = false
            state.connectWalletError = action.payload
            state.currentWalletEndpoint = null
            state.connectWalletAttempting = false
        },
        disconnectWallet(state) {
            state.isWalletConnected = false
            state.connectWalletError = null
            state.currentWalletEndpoint = null
        },
        setWalletOpened(state) {
            state.isWalletConnected = true
        },
        endpointConnectionStatusChange(
            state,
            action: PayloadAction<IEndpointConnectionState>
        ) {
            state.isEndpointConnected = action.payload.isEndpointConnected
            state.endpointConnectionErrorMsg =
                action.payload.endpointConnectionErrorMsg
            state.endpointLastConnectionCheckTs =
                action.payload.endpointLastConnectionCheckTs
        },

        // Progressbar
        showProgressbar(state, action: PayloadAction<boolean>) {
            state.progressbarShown = action.payload
        },
    },
})

export const {
    connectWalletAttempting,
    connectWalletFailed,
    connectWalletSuccess,
    disconnectWallet,
    setWalletOpened,

    showProgressbar,

    endpointConnectionStatusChange: endpointStatusChange,
} = appSlice.actions

export default appSlice.reducer

export const launchApp: ActionCreator<any> = () => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        await dispatch(getConfiguration())

        const themeConfig = new ThemeConfig()
        themeConfig.loadTheme = () => {
            const theme =
                getState()
                    .appconfiguration.appConfig.getUiPreferences()
                    ?.getTheme() == 1
                    ? "dark"
                    : "light";
            return theme
        }
        themeConfig.initTheme()

        // connect to the first wallet endpoint, in lieu of a proper
        // default flag.
        // @FIXME add GUI to select default endpoint
        await store.dispatch(connectDefaultWallet())
        await store.dispatch(subscribeExchangeRateFeed())
        w.walletgui_onAppOpen()
    }
}

export const connectWallet: ActionCreator<any> = (
    endpoint: GRPCEndpoint
): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        dispatch(disconnectWallet())
        dispatch(showProgressbar(true))

        if (getState().app.connectWalletAttempting) {
            return
        }
        dispatch(connectWalletAttempting())
        try {
            const connectedEndpoint = await AppBackend.connectWalletEndpoint(
                endpoint.getId()
            )
            dispatch(connectWalletSuccess(connectedEndpoint))
            dispatch(initializeStore()).then(() => {
                setTimeout(() => {
                    ; (history.location.pathname == "/login" ||
                        history.location.pathname == "/") &&
                        history.push("/wallet")
                    setTimeout(() => {
                        dispatch(showProgressbar(false))
                        dispatch(setWalletOpened())
                        dispatch(
                            endpointStatusChange({
                                isEndpointConnected: true,
                                endpointConnectionErrorMsg: "",
                                endpointLastConnectionCheckTs: 0,
                            })
                        )
                    }, 1000)
                }, 1000)
            })
        } catch (error) {
            history.replace("/login")
            dispatch(connectWalletFailed(error))
            dispatch(showProgressbar(false))
        }
    }
}

export const connectDefaultWallet: ActionCreator<any> = (): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        const firstEndpoint = _.first(
            getState().appconfiguration.appConfig.getWalletEndpointsList()
        )
        if (firstEndpoint != undefined) {
            dispatch(connectWallet(firstEndpoint))
        } else {
            history.replace("/login")
        }
    }
}

export const subscribeMonitorEndpointNotifications: ActionCreator<any> = () => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        w.lorcareceiver__onEndpointConnectionStatusChange = (
            isConnected: boolean,
            errMsg: string,
            lastCheckTimestamp: number
        ) => {
            dispatch(
                endpointStatusChange({
                    isEndpointConnected: isConnected,
                    endpointConnectionErrorMsg: errMsg,
                    endpointLastConnectionCheckTs: lastCheckTimestamp,
                })
            )

            const currentWalletEndpoint = getState().app.currentWalletEndpoint
            if (isConnected) {
                dispatch(loadMainData())
                showInfoToast("Wallet reconnected", `Wallet connection is back`)
            } else {
                showDangerToast(
                    "Wallet disconnected",
                    `Lost connection to ${currentWalletEndpoint?.getHostname()}`
                )
            }
        }
    }
}

export const loadMainData: ActionCreator<any> = () => {
    return async (dispatch: AppDispatch) => {
        await dispatch(loadBestBlockHeight())
        await dispatch(loadAccountsAttempt())

        // await dispatch(setTransactionsTimerange(moment.default().subtract(3, "month"), moment.default()))

        batch(() => {
            dispatch(loadWalletConfig())
            dispatch(loadTransactionsAttempt())
            dispatch(loadWalletBalance())
            dispatch(loadStakeInfoAttempt())
            dispatch(loadStakingHistory())
            dispatch(loadTicketsAttempt())
        })
    }
}

export const initializeStore: ActionCreator<any> = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(subscribeMonitorEndpointNotifications())

        dispatch(loadMainData())

        dispatch(createTxNotificationReceivers())

        w.lorcareceiver__OnAccountNotification = (serializedMsg: string) => {
            const message = AccountNotificationsResponse.deserializeBinary(
                hexToRaw(serializedMsg)
            )
            // console.log("AccountNotification received", message)
            dispatch(accountNotification(message))
        }
    }
}

export const displayTXNotification: ActionCreator<any> = (tx: Transaction) => {
    return async () => {
        showTransactionToast(tx)
    }
}


export const openURL: ActionCreator<any> = (url: string) => {
    return async () => {
        AppBackend.openURL(url)
    }
}



// selectors
export const getConnectedEndpoint = (state: IApplicationState) => {
    return state.app.currentWalletEndpoint
}

export const getConnectedEndpointId = (state: IApplicationState) => {
    return state.app.currentWalletEndpoint?.getId() || ""
}

export const isWalletConnected = (state: IApplicationState) => {
    return state.app.isWalletConnected
}

export const getEndpointById = (
    state: IApplicationState,
    endpointId: string
) => {
    return _.find(getWalletEndpoints(state), (e) => e.getId() == endpointId)
}

export const getCurrentNetwork = (state: IApplicationState): number => {
    const activeNet = getConnectedEndpoint(state)?.getActiveNetwork()
    if (activeNet == undefined) return -1
    return CurrencyNet[activeNet]
}
