import {  ActionCreator, Dispatch } from 'redux';
import { batch } from 'react-redux'

import { IGetState } from './types';
import { pingAttempt } from '../features/networkinfo/pingSlice'

import {
	TransactionNotificationsResponse,
	AccountNotificationsResponse,
	ConfirmationNotificationsResponse
} from '../proto/api_pb';

import { AppDispatch } from './store';

import { hexToRaw } from '../helpers/byteActions';
import { loadWalletBalance } from '../features/balances/walletBalanceSlice'
import { loadTicketsAttempt } from '../features/staking/stakingSlice';
import { loadBestBlockHeight } from '../features/networkinfo/networkInfoSlice';
import { getConfiguration, canStartup } from '../features/appconfiguration/settingsSlice';
import { loadAccountsAttempt, accountNotification } from '../features/balances/accountSlice';
import { loadTransactionsAttempt, transactionNotification } from '../features/transactions/actions';

const w = (window as any)

export const checkBackend: ActionCreator<any> = () => {
	return async (dispatch: Dispatch, getState: IGetState) => {

		await dispatch(getConfiguration())
		await dispatch(canStartup());

		if (getState().appconfiguration.needSetup) {
			// need setup
			throw {}
		}
	}
}


export const initializeData: ActionCreator<any> = () => {
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
