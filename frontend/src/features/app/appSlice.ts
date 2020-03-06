import { GRPCEndpoint } from "../../proto/dcrwalletgui_pb";
import { AppError } from "../../store/types";
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch, IApplicationState } from "../../store/store";
import AppBackend from "../../datasources/appbackend";
import { loadBestBlockHeight } from "../networkinfo/networkInfoSlice";
import { loadAccountsAttempt, accountNotification } from "../balances/accountSlice";
import { batch } from "react-redux";
import { loadTransactionsAttempt, transactionNotification } from "../transactions/actions";
import { loadWalletBalance } from "../balances/walletBalanceSlice";
import { loadTicketsAttempt } from "../staking/stakingSlice";
import { TransactionNotificationsResponse, AccountNotificationsResponse } from "../../proto/api_pb";
import { hexToRaw } from "../../helpers/byteActions";

const w = (window as any)

export interface AppState {
	readonly isWalletConnected: boolean
	readonly currentWalletEndpoint: GRPCEndpoint | null
	readonly connectWalletError: AppError | null
	readonly connectWalletAttempting: boolean
}

export const initialState: AppState = {
	isWalletConnected: false,
	connectWalletError: null,
	currentWalletEndpoint: null,
	connectWalletAttempting: false,
}

const appSlice = createSlice({
	name: "appSlice",
	initialState,
	reducers: {
		connectWalletAttempting(state) {
			state.connectWalletError = null
			state.currentWalletEndpoint = null
			state.connectWalletAttempting = true
		},
		connectWalletSuccess(state, action: PayloadAction<GRPCEndpoint>) {
			state.isWalletConnected = true
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
	}
})



export const {
	connectWalletAttempting,
	connectWalletFailed,
	connectWalletSuccess,
} = appSlice.actions


export default appSlice.reducer


export const connectWallet: ActionCreator<any> = (endpoint: GRPCEndpoint): AppThunk => {
	return async (dispatch: AppDispatch, getState) => {

		if (getState().app.connectWalletAttempting) {
			return
		}
		dispatch(connectWalletAttempting())
		try {
			const resp = await AppBackend.connectWalletEndpoint(endpoint)
			dispatch(connectWalletSuccess(resp))
			dispatch(initializeStore())
		}
		catch (error) {
			dispatch(connectWalletFailed(error))
		}
	}
}



export const initializeStore: ActionCreator<any> = () => {
	return async (dispatch: AppDispatch) => {

		await dispatch(loadBestBlockHeight())
		await dispatch(loadAccountsAttempt())

		batch(() => {
			dispatch(loadTransactionsAttempt())
			dispatch(loadWalletBalance())
			dispatch(loadTicketsAttempt())
		})

		// dispatch(pingAttempt())

		w.lorcareceiver__OnTxNotification = (serializedMsg: string) => {
			const message = TransactionNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
			dispatch(transactionNotification(message))
		}
		// w.lorcareceiver__OnConfirmNotification = (serializedMsg: Uint8Array) => {
		// 	const message = ConfirmationNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
		// 	dispatch(transactionNotification(message))
		// }
		w.lorcareceiver__OnAccountNotification = (serializedMsg: string) => {
			const message = AccountNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
			dispatch(accountNotification(message))
		}
		// setTimeout(() => {
		// 	dispatch(pingAttempt());

		// }, 5000)
	}
}





// selectors
export const getConnectedEndpoint = (state: IApplicationState) => {
	return state.app.currentWalletEndpoint
}

export const isWalletConnected = (state: IApplicationState) => {
	return state.app.isWalletConnected
}
