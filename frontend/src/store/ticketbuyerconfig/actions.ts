import { ThunkDispatch } from 'redux-thunk';


import {
	TicketBuyerConfigActionTypes,
	TICKETBUYERCONFIGATTEMPT, TICKETBUYERCONFIGSUCCESS, TICKETBUYERCONFIGFAILED
} from './types';
import LorcaBackend from '../../datasources/lorca';
import { ActionCreator } from 'redux';
import { IGetState } from '../types';


export const loadTicketBuyerConfigAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TicketBuyerConfigActionTypes>, getState: IGetState) => {

		const { getTicketBuyerConfigRequest } = getState().ticketbuyerconfig;
		if (getTicketBuyerConfigRequest) {
			return Promise.resolve();
		}

		dispatch({ type: TICKETBUYERCONFIGATTEMPT });
		try {
			const resp = await LorcaBackend.fetchTicketBuyerConfig()
			dispatch({ type: TICKETBUYERCONFIGSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: TICKETBUYERCONFIGFAILED });
		}
	}
};



