import { AppError } from "../types";
import { Ticket, TicketPrice } from "../../models";
import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

export interface StakingState {
	readonly tickets: Ticket[],
	readonly getTicketsRequest: boolean,
	readonly startBlockHeight: number,
	readonly endBlockHeight: number,
	readonly targetTicketCount: number,
	readonly ticketPrice: TicketPrice,
	readonly getTicketPriceRequest: boolean,
}

// GetTickets
export const GETTICKETS_ATTEMPT = 'GETTICKETS_ATTEMPT'
export const GETTICKETS_FAILED = 'GETTICKETS_FAILED'
export const GETTICKETS_SUCCESS = 'GETTICKETS_SUCCESS'

export interface GetTicketsAttemptAction {
	type: typeof GETTICKETS_ATTEMPT,
}

export interface GetTicketsFailedAction {
	type: typeof GETTICKETS_FAILED,
	error: AppError
}

export interface GetTicketsSuccessAction {
	type: typeof GETTICKETS_SUCCESS,
	payload: Ticket[]
}


// TicketPrice
export const GETTICKETPRICE_ATTEMPT = 'GETTICKETPRICE_ATTEMPT'
export const GETTICKETPRICE_FAILED = 'GETTICKETPRICE_FAILED'
export const GETTICKETPRICE_SUCCESS = 'GETTICKETPRICE_SUCCESS'


export interface GetTicketPriceAttempt {
	type: typeof GETTICKETPRICE_ATTEMPT,
}

export interface TicketPriceFailedAction {
	type: typeof GETTICKETPRICE_FAILED,
	error: AppError
}

export interface TicketPriceSuccessAction {
	type: typeof GETTICKETPRICE_SUCCESS,
	payload: ProtobufMessage
}



export type GetTicketsActionTypes =
	GetTicketsAttemptAction |
	GetTicketsFailedAction |
	GetTicketsSuccessAction |
	GetTicketPriceAttempt |
	TicketPriceFailedAction |
	TicketPriceSuccessAction
