import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { BestBlock } from "../../models";
import { AppError } from "../types";

export interface BestBlockState {
	readonly currentBlock: BestBlock
	readonly getBestBlockHeightRequest: boolean,
}

export const GETBESTBLOCK_ATTEMPT = 'GETBESTBLOCK_ATTEMPT'
export const GETBESTBLOCK_FAILED = 'GETBESTBLOCK_FAILED'
export const GETBESTBLOCK_SUCCESS = 'GETBESTBLOCK_SUCCESS'

export interface GetBestBlockAttemptAction {
	type: typeof GETBESTBLOCK_ATTEMPT,
}

export interface GetBestBlockFailedAction {
	type: typeof GETBESTBLOCK_FAILED,
	error: AppError
}

export interface GetBestBlockSuccessAction {
	type: typeof GETBESTBLOCK_SUCCESS,
	payload: ProtobufMessage
}

export type BestBlockActionTypes = GetBestBlockAttemptAction | GetBestBlockFailedAction | GetBestBlockSuccessAction
