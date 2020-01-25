import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { LoadActiveDataFilters } from "../../models";
import { AppError } from "../types";

export interface LoadActiveDataFiltersState {
	readonly getLoadActiveDataFiltersRequest: boolean,
	readonly _LoadActiveDataFilters: LoadActiveDataFilters
	readonly errorLoadActiveDataFilters: AppError | null
}

export const LOADACTIVEDATAFILTERSATTEMPT = 'LOADACTIVEDATAFILTERSATTEMPT'
export const LOADACTIVEDATAFILTERSFAILED = 'LOADACTIVEDATAFILTERSFAILED'
export const LOADACTIVEDATAFILTERSSUCCESS = 'LOADACTIVEDATAFILTERSSUCCESS'

export interface LoadActiveDataFiltersAttemptAction {
	type: typeof LOADACTIVEDATAFILTERSATTEMPT,
}

export interface LoadActiveDataFiltersFailedAction {
	type: typeof LOADACTIVEDATAFILTERSFAILED,
	error: AppError
}

export interface LoadActiveDataFiltersSuccessAction {
	type: typeof LOADACTIVEDATAFILTERSSUCCESS,
	payload: ProtobufMessage,
}

export type LoadActiveDataFiltersActionTypes =
	LoadActiveDataFiltersAttemptAction |
	LoadActiveDataFiltersFailedAction |
	LoadActiveDataFiltersSuccessAction
