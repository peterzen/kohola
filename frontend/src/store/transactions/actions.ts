
import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	GetTransactionsActionTypes,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_SUCCESS, GETTRANSACTION_FAILED
} from './types';

import { IGetState, IActionCreator } from '../types';


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



