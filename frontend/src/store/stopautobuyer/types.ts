import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { StopAutoBuyer } from "../../models";
import { AppError } from "../types";

export interface StopAutoBuyerState {
	readonly getStopAutoBuyerRequest: boolean,
	readonly _StopAutoBuyer: StopAutoBuyer
	readonly errorStopAutoBuyer: AppError | null
}

export const STOPAUTOBUYERATTEMPT = 'STOPAUTOBUYERATTEMPT'
export const STOPAUTOBUYERFAILED = 'STOPAUTOBUYERFAILED'
export const STOPAUTOBUYERSUCCESS = 'STOPAUTOBUYERSUCCESS'

export interface StopAutoBuyerAttemptAction {
	type: typeof STOPAUTOBUYERATTEMPT,
}

export interface StopAutoBuyerFailedAction {
	type: typeof STOPAUTOBUYERFAILED,
	error: AppError
}

export interface StopAutoBuyerSuccessAction {
	type: typeof STOPAUTOBUYERSUCCESS,
	payload: ProtobufMessage,
}

export type StopAutoBuyerActionTypes =
	StopAutoBuyerAttemptAction |
	StopAutoBuyerFailedAction |
	StopAutoBuyerSuccessAction
