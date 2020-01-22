
import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	GetBalanceActionTypes,
	GETBALANCE_ATTEMPT, GETBALANCE_SUCCESS, GETBALANCE_FAILED
} from './types';

import { AppError, IGetState } from '../types';
import { WalletBalance } from '../../models';


export function getWalletBalance(accountNumbers: number[]): any {
	return function (dispatch: Dispatch<GetBalanceActionTypes>, getState: IGetState): void {
		const { getBalanceRequest } = getState().walletbalance;
		if (getBalanceRequest) {
			return;
		}
		dispatch({ type: GETBALANCE_ATTEMPT });
		DcrwalletDatasource.WalletBalance(accountNumbers)
			.then((resp: WalletBalance) => {
				dispatch({ payload: resp, type: GETBALANCE_SUCCESS });
			})
			.catch((error: AppError) => {
				dispatch({ error, type: GETBALANCE_FAILED });
			});
	}
};



