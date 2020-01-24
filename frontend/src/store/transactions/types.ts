import { AppError } from "../types";
import { Transaction, TransactionsListResult } from "../../models";

export interface TransactionsState {
	readonly minedTx: Transaction[]
	readonly unminedTx: Transaction[]
	readonly getTransactionsRequest: boolean,
	readonly startBlockHeight: number,
	readonly endBlockHeight: number,
	readonly targetTxCount: number
}

export const GETTRANSACTION_ATTEMPT = 'GETTRANSACTION_ATTEMPT'
export const GETTRANSACTION_FAILED = 'GETTRANSACTION_FAILED'
export const GETTRANSACTION_SUCCESS = 'GETTRANSACTION_SUCCESS'

export interface GetTransactionAttemptAction {
	type: typeof GETTRANSACTION_ATTEMPT,
}

export interface GetTransactionFailedAction {
	type: typeof GETTRANSACTION_FAILED,
	error: AppError
}

export interface GetTransactionSuccessAction {
	type: typeof GETTRANSACTION_SUCCESS,
	payload: TransactionsListResult
}

export type GetTransactionsActionTypes = GetTransactionAttemptAction | GetTransactionFailedAction | GetTransactionSuccessAction
