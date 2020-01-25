import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	TicketBuyerConfigActionTypes,
	TICKETBUYERCONFIGATTEMPT, TICKETBUYERCONFIGSUCCESS, TICKETBUYERCONFIGFAILED
} from './types';

import { IActionCreator, IGetState } from '../types';


export const loadTicketBuyerConfigAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TicketBuyerConfigActionTypes>, getState: IGetState): Promise<any> => {

		const { getTicketBuyerConfigRequest } = getState().ticketbuyerconfig;

		if (getTicketBuyerConfigRequest) {
			return Promise.resolve();
		}
		
		dispatch({ type: TICKETBUYERCONFIGATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchTicketBuyerConfig()
			dispatch({ type: TICKETBUYERCONFIGSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: TICKETBUYERCONFIGFAILED });
		}
	}
};



