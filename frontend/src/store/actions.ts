import { Dispatch, ActionCreator } from 'redux';
import { batch } from 'react-redux'

import { IGetState } from './types';
import { pingAttempt } from './ping/actions';
import { transactionNotification, loadTransactionsAttempt } from './transactions/actions';
import { getConfiguration, canStartup } from './appconfiguration/actions';
import { loadAccountsAttempt, accountNotification } from './accounts/actions';
import {
	TransactionNotificationsResponse,
	AccountNotificationsResponse,
	ConfirmationNotificationsResponse
} from '../proto/api_pb';

import { hexToRaw } from '../helpers/byteActions';
import { loadWalletBalance } from '../features/walletbalance/walletBalanceSlice'
import { loadTicketsAttempt } from './staking/actions';
import { loadBestBlockHeight } from '../features/networkinfo/networkInfoSlice';

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
	return async (dispatch: Dispatch) => {

		await dispatch(loadBestBlockHeight())
		await dispatch(loadAccountsAttempt())

		batch(() => {
			dispatch(loadTransactionsAttempt())
			dispatch(loadWalletBalance())
			dispatch(loadTicketsAttempt())
		})

		w.lorcareceiver__OnTxNotification = (serializedMsg: Uint8Array) => {
			const message = TransactionNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
			dispatch(transactionNotification(message))
		}
		// w.lorcareceiver__OnConfirmNotification = (serializedMsg: Uint8Array) => {
		// 	const message = ConfirmationNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
		// 	dispatch(transactionNotification(message))
		// }
		w.lorcareceiver__OnAccountNotification = (serializedMsg: Uint8Array) => {
			const message = AccountNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
			dispatch(accountNotification(message))
		}
		// setTimeout(() => {
		// 	dispatch(pingAttempt());

		// }, 5000)
	}
}
