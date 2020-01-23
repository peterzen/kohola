import { Dispatch } from 'redux';
import { IGetState, IApplicationState } from './types';

import { getBestBlockHeightAttempt } from './bestblock/actions';
import { getAccountsAttempt } from './accounts/actions';
import { getTransactionsAttempt } from './transactions/actions';
import { getTicketsAttempt } from './tickets/actions';
import { getWalletBalance } from './walletbalance/actions';

function accountsSelector(state: IApplicationState): number[] {
	return _.keys(state.accounts.accounts)
}


export function initializeData(): any {
	return function (dispatch: Dispatch, getState: IGetState): void {
		dispatch(getBestBlockHeightAttempt())
			.then(() => {
				return dispatch(getAccountsAttempt());
			})
			.then(() => {
				dispatch(getTransactionsAttempt())
				dispatch(getTicketsAttempt());
				dispatch(getWalletBalance(accountsSelector(getState())));

			});
	}
}
