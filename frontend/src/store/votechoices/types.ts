import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { VoteChoices } from "../../models";
import { AppError } from "../types";

export interface VoteChoicesState {
	readonly getVoteChoicesRequest: boolean,
	readonly _VoteChoices: VoteChoices
	readonly errorVoteChoices: AppError | null
}

export const VOTECHOICESATTEMPT = 'VOTECHOICESATTEMPT'
export const VOTECHOICESFAILED = 'VOTECHOICESFAILED'
export const VOTECHOICESSUCCESS = 'VOTECHOICESSUCCESS'

export interface VoteChoicesAttemptAction {
	type: typeof VOTECHOICESATTEMPT,
}

export interface VoteChoicesFailedAction {
	type: typeof VOTECHOICESFAILED,
	error: AppError
}

export interface VoteChoicesSuccessAction {
	type: typeof VOTECHOICESSUCCESS,
	payload: ProtobufMessage,
}

export type VoteChoicesActionTypes =
	VoteChoicesAttemptAction |
	VoteChoicesFailedAction |
	VoteChoicesSuccessAction
