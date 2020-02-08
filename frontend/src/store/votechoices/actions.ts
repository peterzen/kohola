import { ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';


import {
	VoteChoicesActionTypes,
	VOTECHOICESATTEMPT, VOTECHOICESSUCCESS, VOTECHOICESFAILED
} from './types';

import {  IGetState } from '../types';


// export const loadVoteChoicesAttempt: ActionCreator<any> = () => {
// 	return async (dispatch: ThunkDispatch<{}, {}, VoteChoicesActionTypes>, getState: IGetState): Promise<any> => {

// 		const { getVoteChoicesRequest } = getState().votechoices;

// 		if (getVoteChoicesRequest) {
// 			return Promise.resolve();
// 		}
		
// 		dispatch({ type: VOTECHOICESATTEMPT });
// 		try {
// 			const resp = await DcrwalletDatasource.fetchVoteChoices()
// 			dispatch({ type: VOTECHOICESSUCCESS, payload: resp });
// 		} catch (error) {
// 			dispatch({ error, type: VOTECHOICESFAILED });
// 		}
// 	}
// };



