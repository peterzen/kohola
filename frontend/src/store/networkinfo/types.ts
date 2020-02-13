import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { BestBlock, Network } from "../../models";
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
	payload: ProtobufMessage,
}



// Network

export interface INetworkState {
	readonly getNetworkRequest: boolean,
	readonly network: Network
	readonly errorNetwork: AppError | null
}

export const NETWORKATTEMPT = 'NETWORKATTEMPT'
export const NETWORKFAILED = 'NETWORKFAILED'
export const NETWORKSUCCESS = 'NETWORKSUCCESS'

export interface NetworkAttemptAction {
	type: typeof NETWORKATTEMPT,
}

export interface NetworkFailedAction {
	type: typeof NETWORKFAILED,
	error: AppError
}

export interface NetworkSuccessAction {
	type: typeof NETWORKSUCCESS,
	payload: ProtobufMessage,
}

export type NetworkInfoActionTypes =
	GetBestBlockAttemptAction |
	GetBestBlockFailedAction |
	GetBestBlockSuccessAction |
	NetworkAttemptAction |
	NetworkFailedAction |
	NetworkSuccessAction


export type INetworkInfoState = BestBlockState & INetworkState
