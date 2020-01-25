import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	StakeInfoActionTypes,
	STAKEINFOATTEMPT, STAKEINFOSUCCESS, STAKEINFOFAILED
} from './types';

import { IActionCreator, IGetState } from '../types';


export const loadStakeInfoAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, StakeInfoActionTypes>, getState: IGetState): Promise<any> => {

		const { getStakeInfoRequest } = getState().stakeinfo;

		if (getStakeInfoRequest) {
			return Promise.resolve();
		}
		
		dispatch({ type: STAKEINFOATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchStakeInfo()
			dispatch({ type: STAKEINFOSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: STAKEINFOFAILED });
		}
	}
};



