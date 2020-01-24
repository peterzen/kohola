
import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	BestBlockActionTypes,
	GETBESTBLOCK_ATTEMPT, GETBESTBLOCK_SUCCESS, GETBESTBLOCK_FAILED
} from './types';

import { IActionCreator } from '../types';


export const loadBestBlockHeightAttempt: IActionCreator = () => {
	return async (dispatch: Dispatch<BestBlockActionTypes>, getState: any): Promise<any> => {
		const { getBestBlockHeightRequest } = getState().bestblock.getBestBlockHeightRequest;
		if (getBestBlockHeightRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETBESTBLOCK_ATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchBestBlock()
			dispatch({ payload: resp, type: GETBESTBLOCK_SUCCESS });
		} catch (error) {
			dispatch({ error, type: GETBESTBLOCK_FAILED });
		}
	}
};



