import _ from "lodash"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { AppError, IApplicationState } from "../../store/types"
import { Transaction, WalletAccount } from "../../middleware/models"
import {
    TransactionDetails,
    ConstructTransactionRequest,
    SignTransactionResponse,
    PublishTransactionResponse,
    ValidateAddressResponse,
    SweepAccountResponse,
} from "../../proto/api_pb"
import { TransactionType, TransactionDirection } from "../../constants"
import { AuthoredTransactionMetadata } from "./models"
import { getWalletConfig } from "../app/walletSlice"


// GetTransactions
export interface GetTransactionsState {
    readonly txList: Transaction[]
    readonly getTransactionsAttempting: boolean
    readonly startBlockHeight: number
    readonly endBlockHeight: number
    readonly targetTxCount: number
    readonly activeTypeFilter:
    | TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap]
    | null
    readonly errorGetTransactions: AppError | null
}

// CreateTransaction
export interface CreateTransactionState {
    readonly errorCreateTransaction: AppError | null
    readonly createTransactionRequest: ConstructTransactionRequest | null
    readonly createTransactionAttempting: boolean
    readonly unsignedTransaction: Uint8Array | null
    readonly txInfo: AuthoredTransactionMetadata | null
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

interface ICreateTransactionSuccessPayload {
    txInfo: AuthoredTransactionMetadata
    unsignedTx: Uint8Array
}

export const initialState: GetTransactionsState &
    CreateTransactionState &
    SignTransactionState &
    PublishTransactionState &
    ValidateAddressState &
    SweepAccountState = {
    txList: [],
    getTransactionsAttempting: false,
    errorGetTransactions: null,
    // The block height to begin including transactions from.
    // If this field is non- zero, starting_block_hash must be
    // set to its default value to avoid ambiguity.
    // If positive, the field is interpreted as a block height.
    // If negative, the height is subtracted from the block wallet /
    // considers itself in sync with.
    startBlockHeight: -1,

    // The block height of the last block to include transactions from.
    // If non- zero, the ending_block_hash field must be set to its
    // default value to avoid ambiguity. If both this field and ending_block_hash
    // are set to their default values, no upper block limit is used
    // and transactions through the best block and all
    // unmined transactions are included.
    endBlockHeight: 1,
    targetTxCount: 0,
    activeTypeFilter: TransactionType.REGULAR,

    // CreateTransaction
    errorCreateTransaction: null,
    createTransactionRequest: null,
    createTransactionAttempting: false,
    unsignedTransaction: null,
    txInfo: null,

    // SignTransaction
    signTransactionAttempting: false,
    signTransactionResponse: null,
    errorSignTransaction: null,

    // PublishTransaction
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
        createTransactionAttempt(state) {
            state.errorCreateTransaction = null
            state.createTransactionRequest = null
            state.createTransactionAttempting = true
        },
        createTransactionFailed(state, action: PayloadAction<AppError>) {
            state.errorCreateTransaction = action.payload
            state.createTransactionRequest = null
            state.createTransactionAttempting = false
        },
        createTransactionSuccess(
            state,
            action: PayloadAction<ICreateTransactionSuccessPayload>
        ) {
            const {
                txInfo,
                unsignedTx,
            } = action.payload
            state.txInfo = txInfo
            state.errorCreateTransaction = null
            state.createTransactionRequest = null
            state.createTransactionAttempting = false
            state.unsignedTransaction = unsignedTx
        },

        // SignTransaction
        signTransactionAttempt(state) {
            state.errorSignTransaction = null
            state.signTransactionAttempting = true
        },
        signTransactionCancel(state) {
            state.errorSignTransaction = null
            state.signTransactionAttempting = false
        },
        signTransactionFailed(state, action: PayloadAction<AppError>) {
            state.errorSignTransaction = action.payload
            state.signTransactionAttempting = false
        },
        signTransactionSuccess(
            state,
            action: PayloadAction<SignTransactionResponse>
        ) {
            state.errorSignTransaction = null
            state.signTransactionResponse = action.payload
            state.signTransactionAttempting = false
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
        publishTransactionSuccess(
            state,
            action: PayloadAction<PublishTransactionResponse>
        ) {
            state.txInfo = null
            state.errorPublishTransaction = null
            state.signTransactionResponse = null
            state.publishTransactionResponse = action.payload
            state.publishTransactionAttempting = false
        },

        resetSendTransaction(state) {
            state.txInfo = null
            state.errorPublishTransaction = null
            state.signTransactionResponse = null
            state.publishTransactionResponse = null
            state.publishTransactionAttempting = false

            state.errorSignTransaction = null
            state.signTransactionResponse = null
            state.signTransactionAttempting = false

            state.errorCreateTransaction = null
            state.createTransactionRequest = null
            state.createTransactionAttempting = false
            state.unsignedTransaction = null
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
        validateAddressSuccess(
            state,
            action: PayloadAction<ValidateAddressResponse>
        ) {
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
    },
})

export const {
    // GetTransactions
    getTransactionsAttempt,
    getTransactionsFailed,
    getTransactionsSuccess,

    // CreateTransaction
    createTransactionAttempt,
    createTransactionFailed,
    createTransactionSuccess,

    // SignTransaction
    signTransactionAttempt,
    signTransactionCancel,
    signTransactionFailed,
    signTransactionSuccess,

    // PublishTransaction
    publishTransactionAttempt,
    publishTransactionFailed,
    publishTransactionSuccess,

    resetSendTransaction,

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

export const getUnminedTransactions = (
    state: IApplicationState
): Transaction[] => {
    return _.chain(getTransactions(state))
        .filter((t) => t.isMined() == false)
        .orderBy((e) => e.getTimestamp(), "desc")
        .value()
}

export const getMinedTransactions = (
    state: IApplicationState
): Transaction[] => {
    return _.chain(getTransactions(state))
        .filter((t) => t.isMined() == true)
        .orderBy((e) => e.getTimestamp(), "desc")
        .value()
}

export const getWalletTransactions = (
    state: IApplicationState
): Transaction[] => {
    return _.chain(getTransactions(state))
        .filter((t) => t.getType() == state.transactions.activeTypeFilter)
        .filter(
            (t) =>
                t.getDirection() ==
                TransactionDirection.TRANSACTION_DIR_RECEIVED ||
                t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT
        )
        .filter(t => isTxMixed(state, t) == false)
        .orderBy((e) => e.getTimestamp(), "desc")
        .value()
}

export const getMixTransactions = (
    state: IApplicationState
): Transaction[] => {
    return _.chain(getTransactions(state))
        .filter((t) => t.getType() == state.transactions.activeTypeFilter)
        .filter(
            (t) =>
                t.getDirection() ==
                TransactionDirection.TRANSACTION_DIR_RECEIVED ||
                t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT
        )
        .filter(t => isTxMixed(state, t))
        .orderBy((e) => e.getTimestamp(), "desc")
        .value()
}



export const getAddressTransactions = (
    state: IApplicationState,
    address: string
): Transaction[] => {
    return _.chain(getTransactions(state))
        .filter((t) => t.getType() == state.transactions.activeTypeFilter)
        .filter(
            (t) =>
                t.getDirection() ==
                TransactionDirection.TRANSACTION_DIR_RECEIVED ||
                t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT
        )
        .filter((t) => {
            // @FIXME - this doesn't work
            return _.find(t.getCreditAddresses(), address) != undefined
        })
        .orderBy((e) => e.getTimestamp(), "desc")
        .value()
}

export const getAccountTransactions = (
    state: IApplicationState,
    account: WalletAccount
): Transaction[] => {
    return _.chain(getTransactions(state))
        .filter((t) => t.getType() == state.transactions.activeTypeFilter)
        .filter(
            (t) =>
                t.getDirection() ==
                TransactionDirection.TRANSACTION_DIR_RECEIVED ||
                t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT
        )
        .filter((t) => isTxLinkedToAccount(t, account))
        .filter(t => isTxMixed(state, t) == false)
        .orderBy((e) => e.getTimestamp(), "desc")
        .value()
}

export const getTransactions = (state: IApplicationState): Transaction[] => {
    return _.orderBy(state.transactions.txList, (e) => e.getTimestamp(), "desc")
}

function isTxLinkedToAccount(tx: Transaction, account: WalletAccount): boolean {
    const accountNumber = account.getAccountNumber()
    return (
        _.find(
            tx.getDebitsList(),
            (input) => input.getPreviousAccount() == accountNumber
        ) != undefined ||
        _.find(
            tx.getCreditsList(),
            (output) => output.getAccount() == accountNumber
        ) != undefined
    )
}


export function isTxMixed(state: IApplicationState, tx: Transaction): boolean {
    const walletConfig = getWalletConfig(state)
    if (walletConfig.MixedAccount == null || walletConfig.ChangeAccount == null) {
        return false
    }
    const txAccounts = tx.getAccountNumbers()
    return !!(
        _.find(txAccounts, a => walletConfig.MixedAccount!.getAccountNumber() == a) &&
        _.find(txAccounts, a => walletConfig.ChangeAccount!.getAccountNumber() == a)
    )
}
