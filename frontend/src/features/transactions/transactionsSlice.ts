import _ from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppError, IApplicationState } from "../../store/types";
import { Transaction, WalletAccount } from "../../models";
import {
	TransactionDetails,
	ConstructTransactionRequest,
	ConstructTransactionResponse,
	SignTransactionResponse,
	PublishTransactionResponse,
	ValidateAddressResponse,
	SweepAccountResponse,
	TransactionNotificationsResponse
} from "../../proto/api_pb";
import { DecodedrawTx, ConstructTxOutput } from "../../datasources/models";
import { TransactionType, TransactionDirection } from "../../constants";

// GetTransactions
export interface GetTransactionsState {
	readonly txList: Transaction[]
	readonly getTransactionsRequest: boolean
	readonly startBlockHeight: number
	readonly endBlockHeight: number
	readonly targetTxCount: number
	readonly activeTypeFilter: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap] | null
	readonly errorGetTransactions: AppError | null
}

// ConstructTransaction
export interface ConstructTransactionState {
	readonly txInfo: HumanreadableTxInfo | null
	readonly errorConstructTransaction: AppError | null
	readonly constructTransactionRequest: ConstructTransactionRequest | null
	readonly constructTransactionResponse: ConstructTransactionResponse | null
	readonly constructTransactionAttempting: boolean
	readonly changeScriptCache: IChangeScriptByAccount
}

// SignTransaction
export interface SignTransactionState {
	readonly signTransactionAttempting: boolean
	readonly signTransactionResponse: SignTransactionResponse | null
	readonly errorSignTransaction: AppError | null
}

// PublishTransaction
export interface PublishTransactionState {
	readonly publishTransactionAttempting: boolean
	readonly publishTransactionResponse: PublishTransactionResponse | null
	readonly errorPublishTransaction: AppError | null
}

// ValidateAddress
export interface ValidateAddressState {
	readonly validateAddressAttempting: boolean
	readonly validateAddressResponse: ValidateAddressResponse | null
	readonly errorValidateAddress: AppError | null
}

// SweepAccount
export interface SweepAccountState {
	readonly sweepAccountAttempting: boolean
	readonly sweepAccountResponse: SweepAccountResponse | null
	readonly errorSweepAccount: AppError | null
}

export enum SendTransactionSteps {
	CONSTRUCT_DIALOG,
	SIGN_DIALOG,
	PUBLISH_DIALOG,
	PUBLISH_CONFIRM_DIALOG
}

export type HumanreadableTxInfo = {
	rawTx: DecodedrawTx
	outputs: ConstructTxOutput[]
	totalAmount: number
	sourceAccount: WalletAccount
	changeScript?: Buffer
	constructTxReq: ConstructTransactionRequest
}

export interface IChangeScriptByAccount {
	[accountNumber: number]: Buffer
}

// Send transaction
export interface GUISendTransaction {
	sendTransactionCurrentStep: SendTransactionSteps
}

export interface TxNotificationState {
	latestTxNotification: TransactionNotificationsResponse | null
}

interface IConstructTransactionSuccessPayload {
	txInfo: HumanreadableTxInfo
	response: ConstructTransactionResponse
	currentStep: SendTransactionSteps
	changeScriptCache: IChangeScriptByAccount
}

export const initialState: GetTransactionsState &
	ConstructTransactionState &
	SignTransactionState &
	PublishTransactionState &
	ValidateAddressState &
	SweepAccountState &
	GUISendTransaction &
	TxNotificationState = {

	txList: [],
	getTransactionsRequest: false,
	errorGetTransactions: null,
	// The block height to begin including transactions from. 
	// If this field is non- zero, starting_block_hash must be
	// set to its default value to avoid ambiguity.
	// If positive, the field is interpreted as a block height.
	// If negative, the height is subtracted from the block wallet /
	// considers itself in sync with.
	startBlockHeight: -10,

	// The block height of the last block to include transactions from. 
	// If non- zero, the ending_block_hash field must be set to its 
	// default value to avoid ambiguity. If both this field and ending_block_hash 
	// are set to their default values, no upper block limit is used
	// and transactions through the best block and all
	// unmined transactions are included.
	endBlockHeight: 1,
	targetTxCount: 100,
	activeTypeFilter: TransactionType.REGULAR,

	// ConstructTransaction
	changeScriptCache: {},
	errorConstructTransaction: null,
	constructTransactionRequest: null,
	constructTransactionResponse: null,
	constructTransactionAttempting: false,

	// Tx notifications
	latestTxNotification: null,

	// SignTransaction
	signTransactionAttempting: false,
	signTransactionResponse: null,
	errorSignTransaction: null,

	// PublishTransaction
	txInfo: null,
	publishTransactionAttempting: false,
	publishTransactionResponse: null,
	errorPublishTransaction: null,

	//  ValidateAddress
	validateAddressAttempting: false,
	validateAddressResponse: null,
	errorValidateAddress: null,

	// SweepAccount
	sweepAccountAttempting: false,
	sweepAccountResponse: null,
	errorSweepAccount: null,

	// Send transaction GUI
	sendTransactionCurrentStep: SendTransactionSteps.CONSTRUCT_DIALOG
}

const transactionsSlice = createSlice({
	name: "transactionsSlice",
	initialState,
	reducers: {
		// GetTransactions
		getTransactionsAttempt(state) {
			state.errorGetTransactions = null
			state.getTransactionsRequest = true
		},
		getTransactionsFailed(state, action: PayloadAction<AppError>) {
			state.errorGetTransactions = action.payload
			state.getTransactionsRequest = false
		},
		getTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
			state.txList = action.payload
			state.errorGetTransactions = null
			state.getTransactionsRequest = false
		},

		// TransactionNotifications
		transactionNotificationSubscribe(state) {

		},
		transactionNotificationReceived(state, action: PayloadAction<TransactionNotificationsResponse>) {
			state.latestTxNotification = action.payload
		},

		// ConstructTransaction
		constructTransactionAttempt(state) {
			state.errorConstructTransaction = null
			state.constructTransactionRequest = null
			state.constructTransactionResponse = null
			state.constructTransactionAttempting = true
		},
		constructTransactionFailed(state, action: PayloadAction<AppError>) {
			state.errorConstructTransaction = action.payload
			state.constructTransactionRequest = null
			state.constructTransactionResponse = null
			state.constructTransactionAttempting = false
		},
		constructTransactionSuccess(state, action: PayloadAction<IConstructTransactionSuccessPayload>) {
			const { txInfo, response, changeScriptCache, currentStep } = action.payload
			console.log("REDUCER", action.payload)
			state.txInfo = txInfo
			state.changeScriptCache = changeScriptCache
			state.sendTransactionCurrentStep = currentStep
			state.constructTransactionResponse = response
			state.errorConstructTransaction = null
			state.constructTransactionRequest = null
			state.constructTransactionAttempting = false
		},

		// SignTransaction
		signTransactionAttempt(state) {
			state.errorSignTransaction = null
			state.signTransactionAttempting = true
		},
		signTransactionCancel(state, action: PayloadAction<SendTransactionSteps>) {
			state.errorSignTransaction = null
			state.signTransactionAttempting = false
			state.sendTransactionCurrentStep = action.payload
		},
		signTransactionFailed(state, action: PayloadAction<AppError>) {
			state.errorSignTransaction = action.payload
			state.signTransactionAttempting = false
		},
		signTransactionSuccess(state, action: PayloadAction<{ currentStep: SendTransactionSteps, response: SignTransactionResponse }>) {
			const { currentStep, response } = action.payload
			state.errorSignTransaction = null
			state.signTransactionResponse = response
			state.signTransactionAttempting = false
			state.sendTransactionCurrentStep = currentStep
		},

		// PublishTransaction
		publishTransactionAttempt(state) {
			state.publishTransactionAttempting = true
			state.errorPublishTransaction = null
		},
		publishTransactionFailed(state, action: PayloadAction<AppError>) {
			state.publishTransactionAttempting = false
			state.errorPublishTransaction = action.payload
		},
		publishTransactionSuccess(state, action: PayloadAction<{ currentStep: SendTransactionSteps, response: PublishTransactionResponse }>) {
			const { currentStep, response } = action.payload
			state.txInfo = null
			state.errorPublishTransaction = null
			state.errorPublishTransaction = null
			state.signTransactionResponse = null
			state.sendTransactionCurrentStep = currentStep
			state.publishTransactionResponse = response
			state.constructTransactionResponse = null
			state.publishTransactionAttempting = false
		},

		// ValidateAddress
		validateAddress(state) {
			state.errorValidateAddress = null
			state.validateAddressAttempting = true
		},
		validateAddressFailed(state, action: PayloadAction<AppError>) {
			state.errorValidateAddress = action.payload
			state.validateAddressAttempting = false
		},
		validateAddressSuccess(state, action: PayloadAction<ValidateAddressResponse>) {
			state.errorValidateAddress = null
			state.validateAddressResponse = action.payload
			state.validateAddressAttempting = false
		},

		// SweepAccount
		sweepaccountAttempt(state) {
			state.errorSweepAccount = null
			state.sweepAccountAttempting = true
		},
		sweepaccountFailed(state, action: PayloadAction<AppError>) {
			state.errorSweepAccount = action.payload
			state.sweepAccountAttempting = false
		},
		sweepaccount(state, action: PayloadAction<SweepAccountResponse>) {
			state.errorSweepAccount = null
			state.sweepAccountResponse = action.payload
			state.sweepAccountAttempting = false
		},
	}
})


export const {
	// GetTransactions
	getTransactionsAttempt,
	getTransactionsFailed,
	getTransactionsSuccess,

	// TransactionNotifications
	transactionNotificationSubscribe,
	transactionNotificationReceived,

	// ConstructTransaction
	constructTransactionAttempt,
	constructTransactionFailed,
	constructTransactionSuccess,

	// SignTransaction
	signTransactionAttempt,
	signTransactionCancel,
	signTransactionFailed,
	signTransactionSuccess,

	// PublishTransaction
	publishTransactionAttempt,
	publishTransactionFailed,
	publishTransactionSuccess,

	// ValidateAddress
	validateAddress,
	validateAddressFailed,
	validateAddressSuccess,

	// SweepAccount
	sweepaccountAttempt,
	sweepaccountFailed,
	sweepaccount,

} = transactionsSlice.actions

export default transactionsSlice.reducer



// selectors

export const getUnminedTransactions = (state: IApplicationState): Transaction[] => {
	return _.chain(state.transactions.txList)
		.filter((t) => t.isMined() == false)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}

export const getMinedTransactions = (state: IApplicationState): Transaction[] => {
	return _.chain(state.transactions.txList)
		.filter((t) => t.isMined() == true)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}

export const getFilteredTransactions = (state: IApplicationState): Transaction[] => {
	// console.log("getFilteredTransactions", state.transactions.activeTypeFilter)
	return _.chain(state.transactions.txList)
		.filter((t) => t.getType() == state.transactions.activeTypeFilter)
		.filter((t) => t.getDirection() == TransactionDirection.TRANSACTION_DIR_RECEIVED || t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}


export const getTransactions = (state: IApplicationState): Transaction[] => {
	return _.orderBy(state.transactions.txList, (e) => e.getTimestamp(), "desc")
}


export const getChangeScriptCache = (state: IApplicationState): IChangeScriptByAccount => {
	return state.transactions.changeScriptCache
}
