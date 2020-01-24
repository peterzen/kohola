import { Dispatch } from 'redux';

import { IActionCreator } from './types';

import { pingAttempt } from './ping/actions';
import { loadWalletBalance } from './walletbalance/actions';
import { loadTicketsAttempt } from './tickets/actions';
import { loadAccountsAttempt } from './accounts/actions';
import { loadTransactionsAttempt } from './transactions/actions';
import { loadBestBlockHeightAttempt } from './bestblock/actions';

export const initializeData: IActionCreator = () => {
	return (dispatch: Dispatch) => {
		// dispatch(pingAttempt());
		dispatch(loadBestBlockHeightAttempt())
			.then(() => {
				return dispatch(loadAccountsAttempt());
			})
			.then(() => {
				dispatch(loadTransactionsAttempt())
				dispatch(loadTicketsAttempt());
				dispatch(loadWalletBalance());
			});
	}
}
