import { ThunkDispatch } from 'redux-thunk';

import { IGetState, IActionCreator } from '../types';
import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
	GetTicketsActionTypes,
	GETTICKETS_ATTEMPT, GETTICKETS_SUCCESS, GETTICKETS_FAILED, TicketPriceSuccessAction, GETTICKETPRICE_ATTEMPT, GETTICKETPRICE_SUCCESS, GETTICKETPRICE_FAILED
} from './types';


export const loadTicketsAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, GetTicketsActionTypes>, getState: IGetState): Promise<any> => {
		const { getTicketsRequest, startBlockHeight, endBlockHeight, targetTicketCount } = getState().tickets
		if (getTicketsRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETTICKETS_ATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchTickets(startBlockHeight, endBlockHeight, targetTicketCount)
			dispatch({ payload: resp, type: GETTICKETS_SUCCESS });
		}
		catch (error) {
			dispatch({ error, type: GETTICKETS_FAILED });
		}
	}
};



export const loadTicketPriceAttempt: IActionCreator = () => {
	return async (dispatch: ThunkDispatch<{}, {}, GetTicketsActionTypes>, getState: IGetState): Promise<any> => {
		const { getTicketPriceRequest } = getState().tickets
		if (getTicketPriceRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETTICKETPRICE_ATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchTicketPrice()
			dispatch({ type: GETTICKETPRICE_SUCCESS, payload: resp });
		}
		catch (error) {
			dispatch({ error, type: GETTICKETPRICE_FAILED });
		}
	}
};



