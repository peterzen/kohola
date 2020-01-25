import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

import { Network } from "../../models";
import { AppError } from "../types";

export interface NetworkState {
	readonly getNetworkRequest: boolean,
	readonly _Network: Network
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

export type NetworkActionTypes =
	NetworkAttemptAction |
	NetworkFailedAction |
	NetworkSuccessAction
