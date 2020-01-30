import { Dispatch, ActionCreator } from 'redux';


import { pingAttempt } from './ping/actions';
import { loadAccountsAttempt, subscribeAccountNotifications } from './accounts/actions';
import { subscribeTransactionNotifications } from './transactions/actions';
import { loadBestBlockHeightAttempt } from './networkinfo/actions';

export const initializeData: ActionCreator<any> = () => {
	return (dispatch: Dispatch) => {
		dispatch(pingAttempt());
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

