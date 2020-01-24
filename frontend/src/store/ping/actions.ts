
import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	PingActionTypes,
	GETPING_SUCCESS, GETPING_FAILED, GETPING_CANCELED
} from './types';
import { IGetState, IActionCreator } from '../types';

export const pingAttempt: IActionCreator = () => {

	return async (dispatch: Dispatch<PingActionTypes>, getState: IGetState) => {
		const pingTimer = setTimeout(() => dispatch(pingAttempt()), 10000);
		try {
			const resp = await DcrwalletDatasource.Ping();
			dispatch({ pingTimer, getPingResponse: resp, type: GETPING_SUCCESS });
		} catch (error) {
			dispatch({ error, pingTimer, type: GETPING_FAILED });

		}
	}
}

export const cancelPingAttempt = () => {
	return (dispatch: Dispatch<PingActionTypes>, getState: IGetState) => {
		const { pingTimer } = getState().ping;
		if (pingTimer) {
			clearTimeout(pingTimer);
			dispatch({ type: GETPING_CANCELED });
		}
	};
}



