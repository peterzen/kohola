
import {
	StakingState, GetTicketsActionTypes,
	GETTICKETS_ATTEMPT, GETTICKETS_FAILED, GETTICKETS_SUCCESS, GETTICKETPRICE_ATTEMPT, GETTICKETPRICE_FAILED, GETTICKETPRICE_SUCCESS
} from './types'
import { TicketPrice } from '../../models';

export const ticketsInitialState: StakingState = {
	tickets: [],
	getTicketsRequest: false,
	startBlockHeight: 150,
	endBlockHeight: 1,
	targetTicketCount: 50,
	ticketPrice: new TicketPrice(),
	getTicketPriceRequest: false,
}


export default function staking(
	state: StakingState = ticketsInitialState,
	action: GetTicketsActionTypes) {

	switch (action.type) {
		// GetTickets
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
		case GETTICKETPRICE_ATTEMPT:
			return {
				...state,
				getTicketPriceRequest: true,
			};
		case GETTICKETPRICE_FAILED:
			return {
				...state,
				getTicketPriceRequest: false,
			};
		case GETTICKETPRICE_SUCCESS:
			return {
				...state,
				getTicketPriceRequest: false,
				ticketPrice: action.payload
			};
		default:
			return state;
	}
}
