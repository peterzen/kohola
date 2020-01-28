
import { Dispatch, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	TransactionsActionTypes, TransactionNotificationsReceived,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_SUCCESS, GETTRANSACTION_FAILED,
	TRANSACTIONNOTIFICATIONS_RECEIVED,
	CONSTRUCTTRANSACTIONATTEMPT, CONSTRUCTTRANSACTIONSUCCESS, CONSTRUCTTRANSACTIONFAILED
} from './types';

import { IGetState } from '../types';
import { loadTicketsAttempt, loadStakeInfoAttempt } from '../staking/actions';
import { loadWalletBalance } from '../walletbalance/actions';
import { ConstructTransactionRequest } from '../../proto/api_pb';


export const loadTransactionsAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {
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



export const subscribeTransactionNotifications: ActionCreator<any> = () => {
	return (dispatch: Dispatch<TransactionNotificationsReceived>) => {
		DcrwalletDatasource.txNotifications((message) => {
			dispatch({ type: TRANSACTIONNOTIFICATIONS_RECEIVED, payload: message });
			dispatch(loadTransactionsAttempt());
			dispatch(loadTicketsAttempt());
			dispatch(loadWalletBalance());
			dispatch(loadStakeInfoAttempt());
		});
	}
}



export const constructTransaction: ActionCreator<any> = (request: ConstructTransactionRequest) => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {

		const { constructTransactionAttempting } = getState().transactions;

		if (constructTransactionAttempting) {
			return Promise.resolve();
		}

		dispatch({ type: CONSTRUCTTRANSACTIONATTEMPT, payload: request });
		try {
			const resp = await DcrwalletDatasource.doConstructTransaction(request)
			dispatch({ type: CONSTRUCTTRANSACTIONSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: CONSTRUCTTRANSACTIONFAILED });
		}
	}
};
