import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import _ from 'lodash';

import {
	GetAccountsActionTypes, AccountNotificationsReceived,
	GETACCOUNTS_ATTEMPT, GETACCOUNTS_SUCCESS, GETACCOUNTS_FAILED,
	ACCOUNTSNOTIFICATIONS_RECEIVED,
} from './types';

import { IGetState } from '../types';
import DcrwalletDatasource from '../../datasources/dcrwallet';
import { IndexedWalletAccounts, WalletAccount } from '../../models';


const mapAccounts = (accounts: WalletAccount[]): IndexedWalletAccounts => {
	const indexedAccounts: IndexedWalletAccounts = {};
	_.each(accounts, (account) => {
		indexedAccounts[account.getAccountNumber()] = account;
	});
	return indexedAccounts;
}


export function loadAccountsAttempt(): any {
	return async (dispatch: ThunkDispatch<{}, {}, GetAccountsActionTypes>, getState: IGetState): Promise<any> => {
		const { getBestBlockHeightRequest } = getState().networkinfo;
		if (getBestBlockHeightRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETACCOUNTS_ATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchAccounts();
			dispatch({ payload: mapAccounts(resp.getAccountsList()), type: GETACCOUNTS_SUCCESS });
		}
		catch (error) {
			dispatch({ error, type: GETACCOUNTS_FAILED });
		}
	}
};


export function subscribeAccountNotifications(): any {
	return (dispatch: Dispatch<AccountNotificationsReceived>) => {
		DcrwalletDatasource.accountNotifications((message) => {
			dispatch({ type: ACCOUNTSNOTIFICATIONS_RECEIVED, payload: message });
			dispatch(loadAccountsAttempt());
		});
	}
}
