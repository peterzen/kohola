import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { StakeInfo } from "../../models";
import { AppError } from "../types";

export interface StakeInfoState {
	readonly getStakeInfoRequest: boolean,
	readonly _StakeInfo: StakeInfo
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

export type StakeInfoActionTypes =
	StakeInfoAttemptAction |
	StakeInfoFailedAction |
	StakeInfoSuccessAction
