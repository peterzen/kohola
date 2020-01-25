import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	AgendasActionTypes,
	AGENDASATTEMPT, AGENDASSUCCESS, AGENDASFAILED
} from './types';

import { IActionCreator, IGetState } from '../types';


export const loadAgendasAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, AgendasActionTypes>, getState: IGetState): Promise<any> => {

		const { getAgendasRequest } = getState().agendas;

		if (getAgendasRequest) {
			return Promise.resolve();
		}
		
		dispatch({ type: AGENDASATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchAgendas()
			dispatch({ type: AGENDASSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: AGENDASFAILED });
		}
	}
};



