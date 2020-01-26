import { Dispatch } from 'redux';

import { IActionCreator } from './types';

import { pingAttempt } from './ping/actions';
import { loadAccountsAttempt, subscribeAccountNotifications } from './accounts/actions';
import { subscribeTransactionNotifications } from './transactions/actions';
import { loadBestBlockHeightAttempt } from './networkinfo/actions';

export const initializeData: IActionCreator = () => {
	return (dispatch: Dispatch) => {
		// dispatch(pingAttempt());
		return dispatch(loadBestBlockHeightAttempt())
			.then(() => {
				return Promise.all([
					dispatch(loadAccountsAttempt()),
					dispatch(subscribeAccountNotifications()),
					dispatch(subscribeTransactionNotifications()),
				])
			})
	}
}



