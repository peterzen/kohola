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

import { IGetState } from '../types';
import DcrwalletDatasource from '../../datasources/dcrwallet';
import { IndexedWalletAccounts, WalletAccount } from '../../models';
import { loadWalletBalance } from '../walletbalance/actions';
import LorcaBackend from '../../datasources/lorca';


const mapAccounts = (accounts: WalletAccount[]): IndexedWalletAccounts => {
	const indexedAccounts: IndexedWalletAccounts = {};
	_.each(accounts, (account) => {
		indexedAccounts[account.getAccountNumber()] = account;
	});
	return indexedAccounts;
}


export const loadAccountsAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, GetAccountsActionTypes>, getState: IGetState): Promise<any> => {
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


export const subscribeAccountNotifications: ActionCreator<any> = () => {
	return (dispatch: Dispatch<AccountNotificationsReceived>) => {
		DcrwalletDatasource.accountNotifications((message) => {
			dispatch({ type: ACCOUNTSNOTIFICATIONS_RECEIVED, payload: message });
			dispatch(loadAccountsAttempt());
			dispatch(loadWalletBalance());
		});
	}
}

export const loadNextAddressAttempt: ActionCreator<any> = (account: WalletAccount) => {
	return async (dispatch: ThunkDispatch<{}, {}, GetAccountsActionTypes>, getState: IGetState): Promise<any> => {

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
