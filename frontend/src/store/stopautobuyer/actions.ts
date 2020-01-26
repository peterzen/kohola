import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	StopAutoBuyerActionTypes,
	STOPAUTOBUYERATTEMPT, STOPAUTOBUYERSUCCESS, STOPAUTOBUYERFAILED
} from './types';

import { IActionCreator, IGetState } from '../types';


export const loadStopAutoBuyerAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, StopAutoBuyerActionTypes>, getState: IGetState): Promise<any> => {

		const { getStopAutoBuyerRequest } = getState().stopautobuyer;

		if (getStopAutoBuyerRequest) {
			return Promise.resolve();
		}
		
		dispatch({ type: STOPAUTOBUYERATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchStopAutoBuyer()
			dispatch({ type: STOPAUTOBUYERSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: STOPAUTOBUYERFAILED });
		}
	}
};


