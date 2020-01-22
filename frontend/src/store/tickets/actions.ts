
import { Dispatch } from 'redux';

import { Ticket } from '../../models';
import { AppError, IGetState } from '../types';
import DcrwalletDatasource from '../../datasources/dcrwallet';
import {
	GetTicketsActionTypes,
	GETTICKETS_ATTEMPT, GETTICKETS_SUCCESS, GETTICKETS_FAILED
} from './types';



export function getTicketsAttempt(): any {
	return function (dispatch: Dispatch<GetTicketsActionTypes>, getState: IGetState): void {
		const { getTicketsRequest, startBlockHeight, endBlockHeight, targetTicketCount } = getState().tickets
		if (getTicketsRequest) {
			return;
		}
		dispatch({ type: GETTICKETS_ATTEMPT });
		DcrwalletDatasource.Tickets(startBlockHeight, endBlockHeight, targetTicketCount)
			.then((resp: Ticket[]) => {
				dispatch({ payload: resp, type: GETTICKETS_SUCCESS });
			})
			.catch((error: AppError) => {
				dispatch({ error, type: GETTICKETS_FAILED });
			});
	}
};



