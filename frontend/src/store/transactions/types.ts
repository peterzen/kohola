import { AppError } from "../types";
import { Transaction } from "../../models";
import {
	TransactionDetails,
	TransactionNotificationsResponse,
	ConstructTransactionRequest,
	ConstructTransactionResponse,
} from "../../proto/api_pb";
import { DecodedrawTx } from "../../datasources/models";

export interface GetTransactionsState {
	readonly txList: Transaction[]
	readonly getTransactionsRequest: boolean,
	readonly startBlockHeight: number,
	readonly endBlockHeight: number,
	readonly targetTxCount: number,
	readonly activeTypeFilter: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap] | null
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


// ConstructTransaction
export interface ConstructTransactionState {
	readonly constructTransactionAttempting: boolean,
	readonly constructTransactionResponse: ConstructTransactionResponse | null,
	readonly errorConstructTransaction: AppError | null,
	readonly changeScriptByAccount: IChangeScriptByAccount,
}

export const CONSTRUCTTRANSACTIONATTEMPT = 'CONSTRUCTTRANSACTIONATTEMPT'
export const CONSTRUCTTRANSACTIONFAILED = 'CONSTRUCTTRANSACTIONFAILED'
export const CONSTRUCTTRANSACTIONSUCCESS = 'CONSTRUCTTRANSACTIONSUCCESS'

export interface ConstructTransactionAttemptAction {
	type: typeof CONSTRUCTTRANSACTIONATTEMPT
}

export interface ConstructTransactionFailedAction {
	type: typeof CONSTRUCTTRANSACTIONFAILED
	error: AppError
}

export interface ConstructTransactionSuccessAction {
	type: typeof CONSTRUCTTRANSACTIONSUCCESS
	rawTx: string,
	response: ConstructTransactionResponse,
	totalAmount: number,
	changeScriptByAccount: IChangeScriptByAccount
}

export type ITransactionState = GetTransactionsState & ConstructTransactionState


export interface IChangeScriptByAccount {
	[accountNumber: number]: Buffer
}


export type TransactionsActionTypes =
	GetTransactionAttemptAction |
	GetTransactionFailedAction |
	GetTransactionSuccessAction |
	TransactionNotificationsSubscribe |
	TransactionNotificationsReceived |
	ConstructTransactionAttemptAction |
	ConstructTransactionFailedAction |
	ConstructTransactionSuccessAction
