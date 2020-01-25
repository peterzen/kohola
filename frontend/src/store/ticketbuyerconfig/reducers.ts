import {
	TicketBuyerConfigActionTypes, TicketBuyerConfigState,
	TICKETBUYERCONFIGATTEMPT, TICKETBUYERCONFIGFAILED, TICKETBUYERCONFIGSUCCESS
} from './types'
import { TicketBuyerConfig } from '../../models';

export const ticketbuyerconfigInitialState: TicketBuyerConfigState = {
	_TicketBuyerConfig: new TicketBuyerConfig(),
	getTicketBuyerConfigRequest: false,
	errorTicketBuyerConfig: null,
}


export default function ticketbuyerconfig(
	state: TicketBuyerConfigState = ticketbuyerconfigInitialState,
	action: TicketBuyerConfigActionTypes) {

	switch (action.type) {
		case TICKETBUYERCONFIGATTEMPT:
			return {
				...state,
				getTicketBuyerConfigRequest: true,
				errorTicketBuyerConfig: null,
			};
		case TICKETBUYERCONFIGFAILED:
			return {
				...state,
				getTicketBuyerConfigRequest: false,
				errorTicketBuyerConfig: action.error,
			};
		case TICKETBUYERCONFIGSUCCESS:
			return {
				...state,
				getTicketBuyerConfigRequest: false,
				_TicketBuyerConfig: action.payload,
				errorTicketBuyerConfig: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
