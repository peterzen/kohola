import { AppError } from "../types";
import { Ticket } from "../../models";

export interface TicketsState {
	readonly tickets: Ticket[],
	readonly getTicketsRequest: boolean,
	readonly startBlockHeight: number,
	readonly endBlockHeight: number,
	readonly targetTicketCount: number
}

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

export type GetTicketsActionTypes = GetTicketsAttemptAction | GetTicketsFailedAction | GetTicketsSuccessAction
