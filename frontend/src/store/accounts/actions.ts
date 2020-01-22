import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	GetAccountsActionTypes,
	GETACCOUNTS_ATTEMPT, GETACCOUNTS_SUCCESS, GETACCOUNTS_FAILED,
} from './types';

import { WalletAccounts, IndexedWalletAccounts, WalletAccount } from '../../models';
import { AppError, IApplicationState } from '../types';
import _ from 'lodash';
import { getWalletBalance } from '../walletbalance/actions';

function mapAccounts(accounts: WalletAccount[]): IndexedWalletAccounts {
	const indexedAccounts: IndexedWalletAccounts = {};
	_.each(accounts, (account) => {
		indexedAccounts[account.getAccountNumber()]= account;
	});
	return indexedAccounts;
}

function accountsSelector(state: IApplicationState): number[] {
	return _.keys(state.accounts.accounts)
}

export function getAccountsAttempt(): any {
	return function (dispatch: Dispatch<GetAccountsActionTypes>, getState: any): void {
		const { getBestBlockHeightRequest } = getState().bestblock.getBestBlockHeightRequest;
		if (getBestBlockHeightRequest) {
			return;
		}
		dispatch({ type: GETACCOUNTS_ATTEMPT });
		DcrwalletDatasource.Accounts()
			.then((resp: WalletAccounts) => {
				dispatch({ payload: mapAccounts(resp.getAccountsList()), type: GETACCOUNTS_SUCCESS });
				dispatch(getWalletBalance(accountsSelector(getState())));
			})
			.catch((error: AppError) => {
				dispatch({ error, type: GETACCOUNTS_FAILED });
			});
	}
};



