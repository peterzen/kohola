
import { ThunkDispatch } from 'redux-thunk';

import {
	GetBalanceActionTypes,
	GETBALANCE_ATTEMPT, GETBALANCE_SUCCESS, GETBALANCE_FAILED
} from './types';

import { IGetState, IActionCreator } from '../types';

import DcrwalletDatasource from '../../datasources/dcrwallet';
import { getAllAccountNumbers } from '../accounts/selectors';

export const loadWalletBalance: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, GetBalanceActionTypes>, getState: IGetState): Promise<any> => {
		const { getBalanceRequest } = getState().walletbalance;
		if (getBalanceRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETBALANCE_ATTEMPT });
		const accountNumbers = getAllAccountNumbers(getState());
		try {
			const resp = await DcrwalletDatasource.fetchWalletBalance(accountNumbers)
			dispatch({ payload: resp, type: GETBALANCE_SUCCESS });
		}
		catch (error) {
			dispatch({ error, type: GETBALANCE_FAILED });
		}
	}
};



