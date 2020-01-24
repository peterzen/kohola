import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	BestBlockActionTypes,
	GETBESTBLOCK_ATTEMPT, GETBESTBLOCK_SUCCESS, GETBESTBLOCK_FAILED
} from './types';

import { IActionCreator, IGetState } from '../types';


export const loadBestBlockHeightAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, BestBlockActionTypes>, getState: IGetState): Promise<any> => {

		const { getBestBlockHeightRequest } = getState().bestblock;
		const timer = setTimeout(() => dispatch(loadBestBlockHeightAttempt()), 5 * 60 * 1000);

		if (getBestBlockHeightRequest) {
			return Promise.resolve();
		}
		
		dispatch({ type: GETBESTBLOCK_ATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchBestBlock()
			dispatch({ type: GETBESTBLOCK_SUCCESS, payload: resp, periodicTimer: timer });
		} catch (error) {
			dispatch({ error, type: GETBESTBLOCK_FAILED });
		}
	}
};



