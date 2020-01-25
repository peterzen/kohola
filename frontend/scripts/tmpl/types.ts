import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { __CAMELCASE__ } from "../../models";
import { AppError } from "../types";

export interface __CAMELCASE__State {
	readonly get__CAMELCASE__Request: boolean,
	readonly __LCASECAMEL__: __CAMELCASE__
	readonly error__CAMELCASE__: AppError | null
}

export const __UPCASE__ATTEMPT = '__UPCASE__ATTEMPT'
export const __UPCASE__FAILED = '__UPCASE__FAILED'
export const __UPCASE__SUCCESS = '__UPCASE__SUCCESS'

export interface __CAMELCASE__AttemptAction {
	type: typeof __UPCASE__ATTEMPT,
}

export interface __CAMELCASE__FailedAction {
	type: typeof __UPCASE__FAILED,
	error: AppError
}

export interface __CAMELCASE__SuccessAction {
	type: typeof __UPCASE__SUCCESS,
	payload: ProtobufMessage,
}

export type __CAMELCASE__ActionTypes =
	__CAMELCASE__AttemptAction |
	__CAMELCASE__FailedAction |
	__CAMELCASE__SuccessAction
