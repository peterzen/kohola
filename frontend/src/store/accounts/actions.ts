import { Dispatch, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import _ from 'lodash';

import {
	GetAccountsActionTypes, AccountNotificationsReceived,
	GETACCOUNTS_ATTEMPT, GETACCOUNTS_SUCCESS, GETACCOUNTS_FAILED,
	ACCOUNTSNOTIFICATIONS_RECEIVED,
	NEXTADDRESSATTEMPT,
	NEXTADDRESSSUCCESS,
	NEXTADDRESSFAILED,
} from './types';

import LorcaBackend from '../../datasources/lorca';
import { IGetState } from '../types';
import { AccountNotificationsResponse } from '../../proto/api_pb';
import { IndexedWalletAccounts, WalletAccount } from '../../models';
import { getAccounts } from './selectors';
import { loadWalletBalance } from '../../features/walletbalance/walletBalanceSlice';


const mapAccounts = (accounts: WalletAccount[]): IndexedWalletAccounts => {
	const indexedAccounts: IndexedWalletAccounts = {};
	_.each(accounts, (account) => {
		indexedAccounts[account.getAccountNumber()] = account;
	});
	return indexedAccounts;
}


export const loadAccountsAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, GetAccountsActionTypes>, getState: IGetState) => {
		const { getBestBlockHeightRequest } = getState().networkinfo;
		if (getBestBlockHeightRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETACCOUNTS_ATTEMPT });
		try {
			const resp = await LorcaBackend.fetchAccounts();
			dispatch({ payload: mapAccounts(resp.getAccountsList()), type: GETACCOUNTS_SUCCESS });
		}
		catch (error) {
			dispatch({ error, type: GETACCOUNTS_FAILED });
		}
	}
};


export const accountNotification: ActionCreator<any> = (message: AccountNotificationsResponse) => {
	return (dispatch: Dispatch<AccountNotificationsReceived>) => {
		dispatch({ type: ACCOUNTSNOTIFICATIONS_RECEIVED, payload: message });
		dispatch(loadAccountsAttempt());
		dispatch(loadWalletBalance());
	}
}

export const loadNextAddressAttempt: ActionCreator<any> = (account: WalletAccount) => {
	return async (dispatch: ThunkDispatch<{}, {}, GetAccountsActionTypes>, getState: IGetState) => {

		const { getNextAddressRequest } = getState().accounts;

		if (getNextAddressRequest) {
			return Promise.resolve();
		}

		dispatch({ type: NEXTADDRESSATTEMPT });
		try {
			const resp = await LorcaBackend.fetchNextAddress(account, 0, 2)
			dispatch({ type: NEXTADDRESSSUCCESS, payload: resp, account: account });
		} catch (error) {
			dispatch({ error, type: NEXTADDRESSFAILED });
		}
	}
};

