import { ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
	NetworkInfoActionTypes,
	GETBESTBLOCK_ATTEMPT, GETBESTBLOCK_SUCCESS, GETBESTBLOCK_FAILED,
	NETWORKATTEMPT, NETWORKSUCCESS, NETWORKFAILED
} from './types';

import { IGetState } from '../types';
import LorcaBackend from '../../datasources/lorca';


export const loadBestBlockHeightAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, NetworkInfoActionTypes>, getState: IGetState): Promise<any> => {

		const { getBestBlockHeightRequest } = getState().networkinfo;
		const timer = setTimeout(() => dispatch(loadBestBlockHeightAttempt()), 5 * 60 * 1000);

		if (getBestBlockHeightRequest) {
			return Promise.resolve();
		}

		dispatch({ type: GETBESTBLOCK_ATTEMPT });
		try {
			const resp = await LorcaBackend.fetchBestBlock()
			dispatch({ type: GETBESTBLOCK_SUCCESS, payload: resp, periodicTimer: timer });
		} catch (error) {
			dispatch({ error, type: GETBESTBLOCK_FAILED });
		}
	}
};


export const loadNetworkAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, NetworkInfoActionTypes>, getState: IGetState): Promise<any> => {

		const { getNetworkRequest } = getState().networkinfo;

		if (getNetworkRequest) {
			return Promise.resolve();
		}

		dispatch({ type: NETWORKATTEMPT });
		try {
			const resp = await LorcaBackend.fetchNetwork()
			dispatch({ type: NETWORKSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: NETWORKFAILED });
		}
	}
};
