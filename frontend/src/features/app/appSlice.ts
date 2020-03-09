import _ from "lodash";
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";
import { batch } from "react-redux";

import AppBackend from "../../datasources/appbackend";
import { GRPCEndpoint } from "../../proto/dcrwalletgui_pb";
import { AppError, AppThunk, AppDispatch, IApplicationState, IGetState } from "../../store/types";
import { loadBestBlockHeight } from "../networkinfo/networkInfoSlice";
import { loadAccountsAttempt, accountNotification } from "../balances/accountSlice";
import { loadTransactionsAttempt, transactionNotification } from "../transactions/actions";
import { loadWalletBalance } from "../balances/walletBalanceSlice";
import { loadTicketsAttempt } from "../staking/stakingSlice";
import { TransactionNotificationsResponse, AccountNotificationsResponse } from "../../proto/api_pb";
import { hexToRaw } from "../../helpers/byteActions";
import { history } from '../../store/store'
import { pingAttempt } from "../networkinfo/pingSlice";

const w = (window as any)

export interface AppState {
	readonly isWalletConnected: boolean
	readonly currentWalletEndpoint: GRPCEndpoint | null
	readonly connectWalletError: AppError | null
	readonly connectWalletAttempting: boolean

	readonly progressbarShown: boolean
}

export const initialState: AppState = {
	isWalletConnected: false,
	connectWalletError: null,
	currentWalletEndpoint: null,
	connectWalletAttempting: false,

	progressbarShown: false,
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

		// Progressbar
		showProgressbar(state, action: PayloadAction<boolean>) {
			state.progressbarShown = action.payload
		},
	}
})



export const {
	connectWalletAttempting,
	connectWalletFailed,
	connectWalletSuccess,
	disconnectWallet,
	setWalletOpened,

	showProgressbar,
} = appSlice.actions


export default appSlice.reducer


export const connectWallet: ActionCreator<any> = (endpoint: GRPCEndpoint): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		dispatch(disconnectWallet())
		dispatch(showProgressbar(true))

		if (getState().app.connectWalletAttempting) {
			return
		}
		dispatch(connectWalletAttempting())
		try {
			const resp = await AppBackend.connectWalletEndpoint(endpoint)
			dispatch(connectWalletSuccess(resp))
			dispatch(initializeStore())
				.then(() => {
					setTimeout(() => {
						history.push("/wallet")
						setTimeout(() => {
							dispatch(showProgressbar(false))
							dispatch(setWalletOpened())
						}, 1000)
					}, 1000)
				})
		}
		catch (error) {
			dispatch(connectWalletFailed(error))
		}
	}
}

export const connectDefaultWallet: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		const firstEndpoint = _.first(getState().appconfiguration.appConfig.getWalletEndpointsList())
		if (firstEndpoint != undefined) {
			dispatch(connectWallet(firstEndpoint))
		}
	}
}



export const initializeStore: ActionCreator<any> = () => {
	return async (dispatch: AppDispatch) => {

		await dispatch(loadBestBlockHeight())
		await dispatch(loadAccountsAttempt())

		batch(() => {
			// dispatch(loadTransactionsAttempt())
			dispatch(loadWalletBalance())
			dispatch(loadTicketsAttempt())
		})

		// dispatch(pingAttempt())

		w.lorcareceiver__OnTxNotification = (serializedMsg: string) => {
			const message = TransactionNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
			// console.log("TxNotification received", message)
			dispatch(transactionNotification(message))
		}
		// w.lorcareceiver__OnConfirmNotification = (serializedMsg: Uint8Array) => {
		// 	const message = ConfirmationNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
		// 	dispatch(transactionNotification(message))
		// }
		w.lorcareceiver__OnAccountNotification = (serializedMsg: string) => {
			const message = AccountNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
			// console.log("AccountNotification received", message)
			dispatch(accountNotification(message))
		}
		// setTimeout(() => {
		// 	dispatch(pingAttempt());

		// }, 1000)
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
