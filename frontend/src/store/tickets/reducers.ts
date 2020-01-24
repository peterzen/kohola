
import {
	TicketsState, GetTicketsActionTypes,
	GETTICKETS_ATTEMPT, GETTICKETS_FAILED, GETTICKETS_SUCCESS
} from './types'

export const ticketsInitialState: TicketsState = {
	tickets: [],
	getTicketsRequest: false,
	startBlockHeight: 150,
	endBlockHeight: 1,
	targetTicketCount: 50
}


export default function transactions(
	state: TicketsState = ticketsInitialState,
	action: GetTicketsActionTypes) {

	switch (action.type) {
		case GETTICKETS_ATTEMPT:
			return {
				...state,
				getTicketsRequest: true,
			};
		case GETTICKETS_FAILED:
			return {
				...state,
				getTicketsRequest: false,
			};
		case GETTICKETS_SUCCESS:
			return {
				...state,
				getTicketsRequest: false,
				tickets: action.payload
			};
		default:
			return state;
	}
}
