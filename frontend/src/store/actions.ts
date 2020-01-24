import { Dispatch } from 'redux';

import { IGetState, IApplicationState, IActionCreator } from './types';

import { pingAttempt } from './ping/actions';
import { loadWalletBalance } from './walletbalance/actions';
import { loadTicketsAttempt } from './tickets/actions';
import { loadAccountsAttempt } from './accounts/actions';
import { loadTransactionsAttempt } from './transactions/actions';
import { loadBestBlockHeightAttempt } from './bestblock/actions';

function accountsSelector(state: IApplicationState): number[] {
	return _.keys(state.accounts.accounts)
}

function getBestBlockHeight(state: IApplicationState): number {
	return state.bestblock.currentBlock.getHeight();
}

export const initializeData: IActionCreator = () => {
	return (dispatch: Dispatch, getState: IGetState) => {
		dispatch(pingAttempt());
		dispatch(loadBestBlockHeightAttempt())
			.then(() => {
				return dispatch(loadAccountsAttempt());
			})
			.then(() => {
				dispatch(loadTransactionsAttempt())
				dispatch(loadTicketsAttempt());
				const accountNumberList = accountsSelector(getState())
				dispatch(loadWalletBalance(accountNumberList));
			});
	}
}
