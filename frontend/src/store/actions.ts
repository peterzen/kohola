import { Dispatch, ActionCreator } from 'redux';


import { pingAttempt } from './ping/actions';
import { loadAccountsAttempt, accountNotification } from './accounts/actions';
import { transactionNotification } from './transactions/actions';
import { loadBestBlockHeightAttempt } from './networkinfo/actions';
import { TransactionNotificationsResponse, AccountNotificationsResponse, ConfirmationNotificationsResponse } from '../proto/api_pb';
import { hexToRaw } from '../helpers/byteActions';
import { getConfiguration, canStartup } from './appconfiguration/actions';
import { IGetState } from './types';

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

		dispatch(pingAttempt());

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

		await dispatch(loadBestBlockHeightAttempt())
		await dispatch(loadAccountsAttempt())
	}
}
