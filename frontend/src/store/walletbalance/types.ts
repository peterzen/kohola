import { AppError } from "../types";
import { WalletBalance } from "../../models";


export interface WalletBalanceState {
	readonly balances: WalletBalance,
	readonly getBalanceRequest: boolean,
}

export const GETBALANCE_ATTEMPT = 'GETBALANCE_ATTEMPT'
export const GETBALANCE_FAILED = 'GETBALANCE_FAILED'
export const GETBALANCE_SUCCESS = 'GETBALANCE_SUCCESS'

export interface GetBalanceAttemptAction {
	type: typeof GETBALANCE_ATTEMPT,
}

export interface GetBalanceFailedAction {
	type: typeof GETBALANCE_FAILED,
	error: AppError
}

export interface GetBalanceSuccessAction {
	type: typeof GETBALANCE_SUCCESS,
	payload: WalletBalance
}

export type GetBalanceActionTypes = GetBalanceAttemptAction | GetBalanceFailedAction | GetBalanceSuccessAction
