import { Dispatch, ActionCreator } from 'redux';


import { pingAttempt } from './ping/actions';
import { loadAccountsAttempt, accountNotification } from './accounts/actions';
import { transactionNotification } from './transactions/actions';
import { loadBestBlockHeightAttempt } from './networkinfo/actions';
import { TransactionNotificationsResponse, AccountNotificationsResponse, ConfirmationNotificationsResponse } from '../proto/api_pb';
import { hexToRaw } from '../helpers/byteActions';
import { getConfiguration } from './appconfiguration/actions';

const w = (window as any)

export const initializeData: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		dispatch(getConfiguration());
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

		return dispatch(loadBestBlockHeightAttempt())
			.then(() => {
				return Promise.all([
					dispatch(loadAccountsAttempt()),
					// dispatch(subscribeAccountNotifications()),
				])
			})
	}
}

