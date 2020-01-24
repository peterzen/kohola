
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	GetTransactionsActionTypes, TransactionNotificationsReceived,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_SUCCESS, GETTRANSACTION_FAILED, TRANSACTIONNOTIFICATIONS_RECEIVED
} from './types';

import { IGetState, IActionCreator } from '../types';
import { loadTicketsAttempt } from '../staking/actions';
import { loadWalletBalance } from '../walletbalance/actions';


export const loadTransactionsAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, GetTransactionsActionTypes>, getState: IGetState): Promise<any> => {
		const { getTransactionsRequest, startBlockHeight, endBlockHeight, targetTxCount } = getState().transactions
		if (getTransactionsRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETTRANSACTION_ATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchTransactions(startBlockHeight, endBlockHeight, targetTxCount)
			dispatch({ payload: resp, type: GETTRANSACTION_SUCCESS });
		}
		catch (error) {
			dispatch({ error, type: GETTRANSACTION_FAILED });
		}
	}
};



export function subscribeTransactionNotifications(): any {
	return (dispatch: Dispatch<TransactionNotificationsReceived>) => {
		DcrwalletDatasource.txNotifications((message) => {
			dispatch({ type: TRANSACTIONNOTIFICATIONS_RECEIVED, payload: message });
			dispatch(loadTransactionsAttempt());
			dispatch(loadTicketsAttempt());
			dispatch(loadWalletBalance());
		});
	}
}
