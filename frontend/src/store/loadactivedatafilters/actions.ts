import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	LoadActiveDataFiltersActionTypes,
	LOADACTIVEDATAFILTERSATTEMPT, LOADACTIVEDATAFILTERSSUCCESS, LOADACTIVEDATAFILTERSFAILED
} from './types';

import { IActionCreator, IGetState } from '../types';


export const loadLoadActiveDataFiltersAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, LoadActiveDataFiltersActionTypes>, getState: IGetState): Promise<any> => {

		const { getLoadActiveDataFiltersRequest } = getState().loadactivedatafilters;

		if (getLoadActiveDataFiltersRequest) {
			return Promise.resolve();
		}
		
		dispatch({ type: LOADACTIVEDATAFILTERSATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchLoadActiveDataFilters()
			dispatch({ type: LOADACTIVEDATAFILTERSSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: LOADACTIVEDATAFILTERSFAILED });
		}
	}
};



