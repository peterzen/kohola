import { ThunkDispatch } from 'redux-thunk';


import {
	StopAutoBuyerActionTypes,
	STOPAUTOBUYERATTEMPT, STOPAUTOBUYERSUCCESS, STOPAUTOBUYERFAILED
} from './types';
import { ActionCreator } from 'redux';
import { IGetState } from '../types';
import LorcaBackend from '../../datasources/lorca';

export const loadStopAutoBuyerAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, StopAutoBuyerActionTypes>, getState: IGetState) => {

		const { getStopAutoBuyerRequest } = getState().stopautobuyer;

		if (getStopAutoBuyerRequest) {
			return Promise.resolve();
		}
		
		dispatch({ type: STOPAUTOBUYERATTEMPT });
		try {
			const resp = await LorcaBackend.fetchStopAutoBuyer()
			dispatch({ type: STOPAUTOBUYERSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: STOPAUTOBUYERFAILED });
		}
	}
};



