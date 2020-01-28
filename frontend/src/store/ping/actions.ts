import { Dispatch, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	PingActionTypes,
	GETPING_SUCCESS, GETPING_FAILED, GETPING_CANCELED
} from './types';

import { IGetState } from '../types';

export const pingAttempt: ActionCreator<any> = () => {

	return async (dispatch: ThunkDispatch<{}, {}, PingActionTypes>, getState: IGetState): Promise<any> => {
		const pingTimer = setTimeout(() => dispatch(pingAttempt()), 10000);
		try {
			const resp = await DcrwalletDatasource.Ping();
			dispatch({ type: GETPING_SUCCESS, pingTimer: pingTimer, getPingResponse: resp });
		} catch (error) {
			dispatch({ error, pingTimer, type: GETPING_FAILED });
		}
	}
}

export const cancelPingAttempt: ActionCreator<any> = () => {
	return (dispatch: Dispatch<PingActionTypes>, getState: IGetState) => {
		const { pingTimer } = getState().ping;
		if (pingTimer) {
			clearTimeout(pingTimer);
			dispatch({ type: GETPING_CANCELED });
		}
	};
}



