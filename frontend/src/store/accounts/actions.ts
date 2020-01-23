import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	GetAccountsActionTypes,
	GETACCOUNTS_ATTEMPT, GETACCOUNTS_SUCCESS, GETACCOUNTS_FAILED,
} from './types';

import { WalletAccounts, IndexedWalletAccounts, WalletAccount } from '../../models';
import { AppError, IGetState } from '../types';
import _ from 'lodash';

function mapAccounts(accounts: WalletAccount[]): IndexedWalletAccounts {
	const indexedAccounts: IndexedWalletAccounts = {};
	_.each(accounts, (account) => {
		indexedAccounts[account.getAccountNumber()] = account;
	});
	return indexedAccounts;
}


export function getAccountsAttempt(): any {
	return function (dispatch: Dispatch<GetAccountsActionTypes>, getState: IGetState): Promise<any> {
		const { getBestBlockHeightRequest } = getState().bestblock;
		if (getBestBlockHeightRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETACCOUNTS_ATTEMPT });
		return DcrwalletDatasource.Accounts()
			.then((resp: WalletAccounts) => {
				dispatch({ payload: mapAccounts(resp.getAccountsList()), type: GETACCOUNTS_SUCCESS });
			})
			.catch((error: AppError) => {
				dispatch({ error, type: GETACCOUNTS_FAILED });
			});
	}
};



