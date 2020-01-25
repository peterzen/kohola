import { AppError } from "../types";
import { Ticket, TicketPrice, Agendas, StakeInfo } from "../../models";
import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

export interface StakingState {
	readonly tickets: Ticket[],
	readonly getTicketsRequest: boolean,
	readonly startBlockHeight: number,
	readonly endBlockHeight: number,

	readonly targetTicketCount: number,
	readonly ticketPrice: TicketPrice,
	readonly getTicketPriceRequest: boolean,

	readonly getAgendasRequest: boolean,
	readonly agendas: Agendas
	readonly errorAgendas: AppError | null,

	readonly getStakeInfoRequest: boolean,
	readonly stakeinfo: StakeInfo
	readonly errorStakeInfo: AppError | null,

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


// Agendas
export interface AgendasState {
	readonly getAgendasRequest: boolean,
	readonly agendas: Agendas
	readonly errorAgendas: AppError | null
}

export const AGENDASATTEMPT = 'AGENDASATTEMPT'
export const AGENDASFAILED = 'AGENDASFAILED'
export const AGENDASSUCCESS = 'AGENDASSUCCESS'

export interface AgendasAttemptAction {
	type: typeof AGENDASATTEMPT,
}

export interface AgendasFailedAction {
	type: typeof AGENDASFAILED,
	error: AppError
}

export interface AgendasSuccessAction {
	type: typeof AGENDASSUCCESS,
	payload: ProtobufMessage,
}



// StakeInfo

export interface StakeInfoState {
	readonly getStakeInfoRequest: boolean,
	readonly stakeinfo: StakeInfo
	readonly errorStakeInfo: AppError | null
}

export const STAKEINFOATTEMPT = 'STAKEINFOATTEMPT'
export const STAKEINFOFAILED = 'STAKEINFOFAILED'
export const STAKEINFOSUCCESS = 'STAKEINFOSUCCESS'

export interface StakeInfoAttemptAction {
	type: typeof STAKEINFOATTEMPT,
}

export interface StakeInfoFailedAction {
	type: typeof STAKEINFOFAILED,
	error: AppError
}

export interface StakeInfoSuccessAction {
	type: typeof STAKEINFOSUCCESS,
	payload: ProtobufMessage,
}


export type StakingActionTypes =
	GetTicketsAttemptAction |
	GetTicketsFailedAction |
	GetTicketsSuccessAction |
	GetTicketPriceAttempt |
	TicketPriceFailedAction |
	TicketPriceSuccessAction |
	AgendasAttemptAction |
	AgendasFailedAction |
	AgendasSuccessAction |
	StakeInfoAttemptAction |
	StakeInfoFailedAction |
	StakeInfoSuccessAction

