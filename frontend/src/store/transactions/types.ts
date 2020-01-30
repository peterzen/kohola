import { AppError } from "../types";
import { Transaction, WalletAccount } from "../../models";
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
import { DecodedrawTx, ConstructTxOutput } from "../../datasources/models";
import { ProtobufMessage } from "@improbable-eng/grpc-web/dist/typings/message";
import { HumanreadableTxInfo } from "./actions";

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
	readonly txInfo: HumanreadableTxInfo | null,
	readonly errorConstructTransaction: AppError | null,
	readonly constructTransactionRequest: ConstructTransactionRequest | null,
	readonly constructTransactionResponse: ConstructTransactionResponse | null,
	readonly constructTransactionAttempting: boolean,
	readonly changeScriptCache: IChangeScriptByAccount,
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
	currentStep: SendTransactionSteps
}

export interface ConstructTransactionSuccessAction {
	type: typeof CONSTRUCTTRANSACTIONSUCCESS
	txInfo: HumanreadableTxInfo,
	constructTxReq: ConstructTransactionRequest;
	constructTxResp: ConstructTransactionResponse,
	changeScriptCache: IChangeScriptByAccount,
	currentStep: SendTransactionSteps
}

export type HumanreadableTxInfo = {
	rawTx: DecodedrawTx,
	outputs: ConstructTxOutput[]
	totalAmount: number,
	sourceAccount: WalletAccount,
	changeScript?: Buffer,
	constructTxReq: ConstructTransactionRequest,
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
export const SIGNTRANSACTIONCANCEL = 'SIGNTRANSACTIONCANCEL'

export interface SignTransactionAttemptAction {
	type: typeof SIGNTRANSACTIONATTEMPT,
}

export interface SignTransactionCancelAction {
	type: typeof SIGNTRANSACTIONCANCEL,
	currentStep: SendTransactionSteps
}

export interface SignTransactionFailedAction {
	type: typeof SIGNTRANSACTIONFAILED,
	error: AppError
}

export interface SignTransactionSuccessAction {
	type: typeof SIGNTRANSACTIONSUCCESS,
	payload: SignTransactionResponse,
	currentStep: SendTransactionSteps,
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
	currentStep: SendTransactionSteps,
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


export enum SendTransactionSteps {
	CONSTRUCT_DIALOG,
	SIGN_DIALOG,
	PUBLISH_DIALOG,
	PUBLISH_CONFIRM_DIALOG
}

// Send transaction
export interface GUISendTransaction {
	sendTransactionCurrentStep: SendTransactionSteps
}

export type ITransactionState =
	GetTransactionsState &
	ConstructTransactionState &
	SignTransactionState &
	PublishTransactionState &
	CommittedTicketsState &
	ValidateAddressState &
	SweepAccountState &
	GUISendTransaction

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
	SignTransactionCancelAction |
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

