import { ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
	GetBalanceActionTypes,
	GETBALANCE_ATTEMPT, GETBALANCE_SUCCESS, GETBALANCE_FAILED
} from './types';

import { IGetState } from '../types';
import { getAllAccountNumbers } from '../accounts/selectors';
import LorcaBackend from '../../datasources/lorca';

export const loadWalletBalance: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, GetBalanceActionTypes>, getState: IGetState) => {
		const { getBalanceRequest } = getState().walletbalance;
		if (getBalanceRequest) {
			return
		}
		dispatch({ type: GETBALANCE_ATTEMPT });
		const accountNumbers = getAllAccountNumbers(getState());
		try {
			const resp = await LorcaBackend.fetchWalletBalance(accountNumbers)
			dispatch({ payload: resp, type: GETBALANCE_SUCCESS });
		}
		catch (error) {
			dispatch({ error, type: GETBALANCE_FAILED });
		}
	}
};



