import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { TicketBuyerConfig } from "../../models";
import { AppError } from "../types";

export interface TicketBuyerConfigState {
	readonly getTicketBuyerConfigRequest: boolean,
	readonly _TicketBuyerConfig: TicketBuyerConfig
	readonly errorTicketBuyerConfig: AppError | null
}

export const TICKETBUYERCONFIGATTEMPT = 'TICKETBUYERCONFIGATTEMPT'
export const TICKETBUYERCONFIGFAILED = 'TICKETBUYERCONFIGFAILED'
export const TICKETBUYERCONFIGSUCCESS = 'TICKETBUYERCONFIGSUCCESS'

export interface TicketBuyerConfigAttemptAction {
	type: typeof TICKETBUYERCONFIGATTEMPT,
}

export interface TicketBuyerConfigFailedAction {
	type: typeof TICKETBUYERCONFIGFAILED,
	error: AppError
}

export interface TicketBuyerConfigSuccessAction {
	type: typeof TICKETBUYERCONFIGSUCCESS,
	payload: ProtobufMessage,
}

export type TicketBuyerConfigActionTypes =
	TicketBuyerConfigAttemptAction |
	TicketBuyerConfigFailedAction |
	TicketBuyerConfigSuccessAction
