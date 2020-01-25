import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	NetworkActionTypes,
	NETWORKATTEMPT, NETWORKSUCCESS, NETWORKFAILED
} from './types';

import { IActionCreator, IGetState } from '../types';


export const loadNetworkAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, NetworkActionTypes>, getState: IGetState): Promise<any> => {

		const { getNetworkRequest } = getState().network;

		if (getNetworkRequest) {
			return Promise.resolve();
		}
		
		dispatch({ type: NETWORKATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchNetwork()
			dispatch({ type: NETWORKSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: NETWORKFAILED });
		}
	}
};



