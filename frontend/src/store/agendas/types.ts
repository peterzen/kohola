import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { Agendas } from "../../models";
import { AppError } from "../types";

export interface AgendasState {
	readonly getAgendasRequest: boolean,
	readonly _Agendas: Agendas
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

export type AgendasActionTypes =
	AgendasAttemptAction |
	AgendasFailedAction |
	AgendasSuccessAction
