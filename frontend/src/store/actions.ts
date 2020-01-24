import { Dispatch } from 'redux';

import { IActionCreator } from './types';

import { pingAttempt } from './ping/actions';
import { loadWalletBalance } from './walletbalance/actions';
import { loadTicketsAttempt, loadTicketPriceAttempt } from './staking/actions';
import { loadAccountsAttempt, subscribeAccountNotifications } from './accounts/actions';
import { loadTransactionsAttempt, subscribeTransactionNotifications } from './transactions/actions';
import { loadBestBlockHeightAttempt } from './bestblock/actions';

export const initializeData: IActionCreator = () => {
	return (dispatch: Dispatch) => {
		// dispatch(pingAttempt());
		dispatch(loadBestBlockHeightAttempt())
			.then(() => {
				return dispatch(loadAccountsAttempt());
			})
			.then(() => {
				return Promise.all([
					dispatch(loadTransactionsAttempt()),
					dispatch(loadTicketsAttempt()),
					dispatch(loadWalletBalance()),
					dispatch(loadTicketPriceAttempt()),
				])
			})
			.then(() => {
				dispatch(subscribeAccountNotifications());
				dispatch(subscribeTransactionNotifications());
			});
	}
}



