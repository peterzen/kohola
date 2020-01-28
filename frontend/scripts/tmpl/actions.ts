import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	__CAMELCASE__ActionTypes,
	__UPCASE__ATTEMPT, __UPCASE__SUCCESS, __UPCASE__FAILED
} from './types';

import { ActionCreator<any>, IGetState } from '../types';


export const load__CAMELCASE__Attempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, __CAMELCASE__ActionTypes>, getState: IGetState): Promise<any> => {

		const { get__CAMELCASE__Request } = getState().__LCASE__;

		if (get__CAMELCASE__Request) {
			return Promise.resolve();
		}
		
		dispatch({ type: __UPCASE__ATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetch__CAMELCASE__()
			dispatch({ type: __UPCASE__SUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: __UPCASE__FAILED });
		}
	}
};



