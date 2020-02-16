
import {
	IStakingState, StakingActionTypes,
	GETTICKETS_ATTEMPT, GETTICKETS_FAILED, GETTICKETS_SUCCESS,
	GETTICKETPRICE_ATTEMPT, GETTICKETPRICE_FAILED, GETTICKETPRICE_SUCCESS,
	AGENDASATTEMPT, AGENDASFAILED, AGENDASSUCCESS,
	STAKEINFOATTEMPT, STAKEINFOFAILED, STAKEINFOSUCCESS, PURCHASETICKETSATTEMPT, PURCHASETICKETSFAILED, PURCHASETICKETSSUCCESS
} from './types'

import { TicketPrice, Agendas, StakeInfo } from '../../models';

export const ticketsInitialState: IStakingState = {
	tickets: [],
	getTicketsRequest: false,
	startBlockHeight: -4,
	endBlockHeight: 1,
	targetTicketCount: 50,
	ticketPrice: new TicketPrice(),
	getTicketPriceRequest: false,

	// Agendas
	agendas: new Agendas(),
	getAgendasRequest: false,
	errorAgendas: null,

	// StakeInfo
	stakeinfo: new StakeInfo(),
	getStakeInfoRequest: false,
	errorStakeInfo: null,

	// PurchaseTickets
	isPurchaseTicketAttempting: false,
	errorPurchaseTickets: null
}


export default function staking(
	state: IStakingState = ticketsInitialState,
	action: StakingActionTypes) {

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
		// TicketPrice
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
		// Agendas
		case AGENDASATTEMPT:
			return {
				...state,
				getAgendasRequest: true,
				errorAgendas: null,
			};
		case AGENDASFAILED:
			return {
				...state,
				getAgendasRequest: false,
				errorAgendas: action.error,
			};
		case AGENDASSUCCESS:
			return {
				...state,
				getAgendasRequest: false,
				agendas: action.payload,
				errorAgendas: null
			};

		// StakeInfo
		case STAKEINFOATTEMPT:
			return {
				...state,
				getStakeInfoRequest: true,
				errorStakeInfo: null,
			};
		case STAKEINFOFAILED:
			return {
				...state,
				getStakeInfoRequest: false,
				errorStakeInfo: action.error,
			};
		case STAKEINFOSUCCESS:
			return {
				...state,
				getStakeInfoRequest: false,
				stakeinfo: action.payload,
				errorStakeInfo: null
			};
		// PurchaseTicket
		case PURCHASETICKETSATTEMPT:
			return {
				...state,
				isPurchaseTicketAttempting: false,
				errorPurchaseTickets: null,
			};
		case PURCHASETICKETSFAILED:
			return {
				...state,
				isPurchaseTicketAttempting: false,
				errorPurchaseTickets: action.error,
			};
		case PURCHASETICKETSSUCCESS:
			return {
				...state,
				isPurchaseTicketAttempting: false,
				errorPurchaseTickets: null
			};
		default:
			neverReached(action);
			return state;
	}
}


const neverReached = (never: never) => { };
