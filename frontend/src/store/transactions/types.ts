import { AppError } from "../types";
import { Transaction } from "../../models";
import { TransactionNotificationsResponse } from "../../proto/api_pb";

export interface TransactionsState {
	readonly txList: Transaction[]
	readonly getTransactionsRequest: boolean,
	readonly startBlockHeight: number,
	readonly endBlockHeight: number,
	readonly targetTxCount: number,
}

// GetTransactions
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
	payload: Transaction[]
}


// TransactionNotifications
export const TRANSACTIONNOTIFICATIONS_SUBSCRIBE = 'TRANSACTIONNOTIFICATIONS_SUBSCRIBE'
export const TRANSACTIONNOTIFICATIONS_RECEIVED = 'TRANSACTIONNOTIFICATIONS_RECEIVED'

export interface TransactionNotificationsSubscribe {
	type: typeof TRANSACTIONNOTIFICATIONS_SUBSCRIBE,
}

export interface TransactionNotificationsReceived {
	type: typeof TRANSACTIONNOTIFICATIONS_RECEIVED,
	payload: TransactionNotificationsResponse
}


export type GetTransactionsActionTypes =
	GetTransactionAttemptAction |
	GetTransactionFailedAction |
	GetTransactionSuccessAction |
	TransactionNotificationsSubscribe |
	TransactionNotificationsReceived
