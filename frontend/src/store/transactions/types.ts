import { AppError } from "../types";
import { Transaction } from "../../models";
import {
	TransactionDetails,
	TransactionNotificationsResponse,
	ConstructTransactionRequest,
	ConstructTransactionResponse,
	SignTransactionResponse,
	PublishTransactionResponse,
	CommittedTicketsResponse,
	ValidateAddressResponse,
	SweepAccountResponse,
} from "../../proto/api_pb";
import { DecodedrawTx } from "../../datasources/models";
import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";

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



export interface IChangeScriptByAccount {
	[accountNumber: number]: Buffer
}


// SignTransaction
export interface SignTransactionState {
	readonly signTransactionAttempting: boolean,
	readonly signTransactionResponse: SignTransactionResponse | null
	readonly errorSignTransaction: AppError | null
}

export const SIGNTRANSACTIONATTEMPT = 'SIGNTRANSACTIONATTEMPT'
export const SIGNTRANSACTIONFAILED = 'SIGNTRANSACTIONFAILED'
export const SIGNTRANSACTIONSUCCESS = 'SIGNTRANSACTIONSUCCESS'

export interface SignTransactionAttemptAction {
	type: typeof SIGNTRANSACTIONATTEMPT,
}

export interface SignTransactionFailedAction {
	type: typeof SIGNTRANSACTIONFAILED,
	error: AppError
}

export interface SignTransactionSuccessAction {
	type: typeof SIGNTRANSACTIONSUCCESS,
	payload: SignTransactionResponse,
}


// PublishTransaction
export interface PublishTransactionState {
	readonly publishTransactionAttempting: boolean,
	readonly publishTransactionResponse: PublishTransactionResponse | null
	readonly errorPublishTransaction: AppError | null
}

export const PUBLISHTRANSACTIONATTEMPT = 'PUBLISHTRANSACTIONATTEMPT'
export const PUBLISHTRANSACTIONFAILED = 'PUBLISHTRANSACTIONFAILED'
export const PUBLISHTRANSACTIONSUCCESS = 'PUBLISHTRANSACTIONSUCCESS'

export interface PublishTransactionAttemptAction {
	type: typeof PUBLISHTRANSACTIONATTEMPT,
}

export interface PublishTransactionFailedAction {
	type: typeof PUBLISHTRANSACTIONFAILED,
	error: AppError
}

export interface PublishTransactionSuccessAction {
	type: typeof PUBLISHTRANSACTIONSUCCESS,
	payload: PublishTransactionResponse,
}

// ValidateAddress
export interface ValidateAddressState {
	readonly validateAddressAttempting: boolean,
	readonly validateAddressResponse: ValidateAddressResponse | null
	readonly errorValidateAddress: AppError | null
}

export const VALIDATEADDRESSATTEMPT = 'VALIDATEADDRESSATTEMPT'
export const VALIDATEADDRESSFAILED = 'VALIDATEADDRESSFAILED'
export const VALIDATEADDRESSSUCCESS = 'VALIDATEADDRESSSUCCESS'

export interface ValidateAddressAttemptAction {
	type: typeof VALIDATEADDRESSATTEMPT,
}

export interface ValidateAddressFailedAction {
	type: typeof VALIDATEADDRESSFAILED,
	error: AppError
}

export interface ValidateAddressSuccessAction {
	type: typeof VALIDATEADDRESSSUCCESS,
	payload: ProtobufMessage,
}

// CommittedTickets
export interface CommittedTicketsState {
	readonly committedTicketsAttempting: boolean,
	readonly committedTicketsResponse: CommittedTicketsResponse | null
	readonly errorCommittedTickets: AppError | null
}

export const COMMITTEDTICKETSATTEMPT = 'COMMITTEDTICKETSATTEMPT'
export const COMMITTEDTICKETSFAILED = 'COMMITTEDTICKETSFAILED'
export const COMMITTEDTICKETSSUCCESS = 'COMMITTEDTICKETSSUCCESS'

export interface CommittedTicketsAttemptAction {
	type: typeof COMMITTEDTICKETSATTEMPT,
}

export interface CommittedTicketsFailedAction {
	type: typeof COMMITTEDTICKETSFAILED,
	error: AppError
}

export interface CommittedTicketsSuccessAction {
	type: typeof COMMITTEDTICKETSSUCCESS,
	payload: ProtobufMessage,
}


// SweepAccount
export interface SweepAccountState {
	readonly sweepAccountAttempting: boolean
	readonly sweepAccountResponse: SweepAccountResponse | null
	readonly errorSweepAccount: AppError | null
}

export const SWEEPACCOUNTATTEMPT = 'SWEEPACCOUNTATTEMPT'
export const SWEEPACCOUNTFAILED = 'SWEEPACCOUNTFAILED'
export const SWEEPACCOUNTSUCCESS = 'SWEEPACCOUNTSUCCESS'

export interface SweepAccountAttemptAction {
	type: typeof SWEEPACCOUNTATTEMPT,
}

export interface SweepAccountFailedAction {
	type: typeof SWEEPACCOUNTFAILED,
	error: AppError
}

export interface SweepAccountSuccessAction {
	type: typeof SWEEPACCOUNTSUCCESS,
	payload: SweepAccountResponse,
}

export type ITransactionState =
	GetTransactionsState &
	ConstructTransactionState &
	SignTransactionState &
	PublishTransactionState &
	CommittedTicketsState &
	ValidateAddressState &
	SweepAccountState

export type TransactionsActionTypes =
	GetTransactionAttemptAction |
	GetTransactionFailedAction |
	GetTransactionSuccessAction |
	TransactionNotificationsSubscribe |
	TransactionNotificationsReceived |
	ConstructTransactionAttemptAction |
	ConstructTransactionFailedAction |
	ConstructTransactionSuccessAction |
	SignTransactionAttemptAction |
	SignTransactionFailedAction |
	SignTransactionSuccessAction |
	PublishTransactionAttemptAction |
	PublishTransactionFailedAction |
	PublishTransactionSuccessAction |
	CommittedTicketsAttemptAction |
	CommittedTicketsFailedAction |
	CommittedTicketsSuccessAction |
	ValidateAddressAttemptAction |
	ValidateAddressFailedAction |
	ValidateAddressSuccessAction |
	SweepAccountAttemptAction |
	SweepAccountFailedAction |
	SweepAccountSuccessAction

