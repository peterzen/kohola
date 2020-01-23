
import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	GetTransactionsActionTypes,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_SUCCESS, GETTRANSACTION_FAILED
} from './types';

import { TransactionsListResult } from '../../models';
import { AppError, IGetState } from '../types';


export function getTransactionsAttempt(): any {
	return function (dispatch: Dispatch<GetTransactionsActionTypes>, getState: IGetState): Promise<any> {
		const { getTransactionsRequest, startBlockHeight, endBlockHeight, txCount } = getState().transactions
		if (getTransactionsRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETTRANSACTION_ATTEMPT });
		return DcrwalletDatasource.Transactions(startBlockHeight, endBlockHeight, txCount)
			.then((resp: TransactionsListResult) => {
				dispatch({ payload: resp, type: GETTRANSACTION_SUCCESS });
			})
			.catch((error: AppError) => {
				dispatch({ error, type: GETTRANSACTION_FAILED });
			});
	}
};



