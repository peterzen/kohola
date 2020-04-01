import _ from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppError, IApplicationState } from "../../store/types";
import { Transaction, WalletAccount } from "../../middleware/models";
import {
	TransactionDetails,
	ConstructTransactionRequest,
	ConstructTransactionResponse,
	SignTransactionResponse,
	PublishTransactionResponse,
	ValidateAddressResponse,
	SweepAccountResponse,
	CreateRawTransactionRequest,
	CreateRawTransactionResponse,
} from "../../proto/api_pb";
import { DecodedrawTx, ConstructTxOutput } from "../../middleware/models";
import { TransactionType, TransactionDirection } from "../../constants";

// GetTransactions
export interface GetTransactionsState {
	readonly txList: Transaction[]
	readonly getTransactionsAttempting: boolean
	readonly startBlockHeight: number
	readonly endBlockHeight: number
	readonly targetTxCount: number
	readonly activeTypeFilter: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap] | null
	readonly errorGetTransactions: AppError | null
}

// ConstructTransaction
export interface ConstructTransactionState {
	readonly errorConstructTransaction: AppError | null
	readonly constructTransactionRequest: ConstructTransactionRequest | null
	readonly constructTransactionResponse: ConstructTransactionResponse | null
	readonly constructTransactionAttempting: boolean
	readonly changeScriptCache: IChangeScriptByAccount
}

// CreateRawTransaction
export interface CreateRawTransactionState {
	readonly errorCreateRawTransaction: AppError | null
	readonly createRawTransactionRequest: CreateRawTransactionRequest | null
	readonly createRawTransactionResponse: CreateRawTransactionResponse | null
	readonly createRawTransactionAttempting: boolean
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
	readonly txInfo: HumanreadableTxInfo | null
	readonly sendTransactionCurrentStep: SendTransactionSteps
}

interface IConstructTransactionSuccessPayload {
	txInfo: HumanreadableTxInfo
	response: ConstructTransactionResponse
	currentStep: SendTransactionSteps
	changeScriptCache: IChangeScriptByAccount
}

interface IICreateRawTransactionSuccessPayload {
	txInfo: HumanreadableTxInfo
	response: CreateRawTransactionResponse
	currentStep: SendTransactionSteps
}

export const initialState: GetTransactionsState &
	ConstructTransactionState &
	CreateRawTransactionState &
	SignTransactionState &
	PublishTransactionState &
	ValidateAddressState &
	SweepAccountState &
	GUISendTransaction = {

	txList: [],
	getTransactionsAttempting: false,
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
	targetTxCount: 1000,
	activeTypeFilter: TransactionType.REGULAR,

	// ConstructTransaction
	changeScriptCache: {},
	errorConstructTransaction: null,
	constructTransactionRequest: null,
	constructTransactionResponse: null,
	constructTransactionAttempting: false,

	// CreateRawTransaction
	errorCreateRawTransaction: null,
	createRawTransactionRequest: null,
	createRawTransactionResponse: null,
	createRawTransactionAttempting: false,

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
			state.getTransactionsAttempting = true
		},
		getTransactionsFailed(state, action: PayloadAction<AppError>) {
			state.errorGetTransactions = action.payload
			state.getTransactionsAttempting = false
		},
		getTransactionsSuccess(state, action: PayloadAction<Transaction[]>) {
			state.txList = action.payload
			state.errorGetTransactions = null
			state.getTransactionsAttempting = false
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
			state.txInfo = txInfo
			state.changeScriptCache = changeScriptCache
			state.sendTransactionCurrentStep = currentStep
			state.constructTransactionResponse = response
			state.errorConstructTransaction = null
			state.constructTransactionRequest = null
			state.constructTransactionAttempting = false
		},

		// CreateRawTransaction
		createRawTransactionAttempt(state) {
			state.errorCreateRawTransaction = null
			state.createRawTransactionRequest = null
			state.createRawTransactionResponse = null
			state.createRawTransactionAttempting = true
		},
		createRawTransactionFailed(state, action: PayloadAction<AppError>) {
			state.errorCreateRawTransaction = action.payload
			state.createRawTransactionRequest = null
			state.createRawTransactionResponse = null
			state.createRawTransactionAttempting = false
		},
		createRawTransactionSuccess(state, action: PayloadAction<IICreateRawTransactionSuccessPayload>) {
			const { txInfo, response, currentStep } = action.payload
			state.txInfo = txInfo
			state.sendTransactionCurrentStep = currentStep
			state.createRawTransactionRequest = null
			state.createRawTransactionResponse = response
			state.createRawTransactionAttempting = false
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

	// ConstructTransaction
	constructTransactionAttempt,
	constructTransactionFailed,
	constructTransactionSuccess,

	// CreateRawTransaction
	createRawTransactionAttempt,
	createRawTransactionFailed,
	createRawTransactionSuccess,

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
	return _.chain(getTransactions(state))
		.filter((t) => t.isMined() == false)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}

export const getMinedTransactions = (state: IApplicationState): Transaction[] => {
	return _.chain(getTransactions(state))
		.filter((t) => t.isMined() == true)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}

export const getWalletTransactions = (state: IApplicationState): Transaction[] => {
	return _.chain(getTransactions(state))
		.filter((t) => t.getType() == state.transactions.activeTypeFilter)
		.filter((t) =>
			t.getDirection() == TransactionDirection.TRANSACTION_DIR_RECEIVED ||
			t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}

export const getAddressTransactions = (state: IApplicationState, address: string): Transaction[] => {
	return _.chain(getTransactions(state))
		.filter((t) => t.getType() == state.transactions.activeTypeFilter)
		.filter((t) =>
			t.getDirection() == TransactionDirection.TRANSACTION_DIR_RECEIVED ||
			t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT
		)
		.filter((t) => {
			// @FIXME - this doesn't work
			return _.find(t.getCreditAddresses(), address) != undefined
		})
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}

export const getAccountTransactions = (state: IApplicationState, account: WalletAccount): Transaction[] => {
	const accountNumber = account.getAccountNumber()
	return _.chain(getTransactions(state))
		.filter((t) => t.getType() == state.transactions.activeTypeFilter)
		.filter((t) =>
			t.getDirection() == TransactionDirection.TRANSACTION_DIR_RECEIVED ||
			t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT)
		.filter((t) => isTxLinkedToAccount(t, account))
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}


export const getTransactions = (state: IApplicationState): Transaction[] => {
	return _.orderBy(state.transactions.txList, (e) => e.getTimestamp(), "desc")
}


export const getChangeScriptCache = (state: IApplicationState): IChangeScriptByAccount => {
	return state.transactions.changeScriptCache
}

function isTxLinkedToAccount(tx: Transaction, account: WalletAccount): boolean {
	const accountNumber = account.getAccountNumber()
	return _.find(tx.getDebitsList(), (input) => input.getPreviousAccount() == accountNumber) != undefined ||
		_.find(tx.getCreditsList(), (output) => output.getAccount() == accountNumber) != undefined
}
