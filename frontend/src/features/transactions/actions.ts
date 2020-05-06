import _ from "lodash"
import { ActionCreator } from "redux"
import { batch } from "react-redux"


import {
    SignTransactionRequest,
    PublishTransactionRequest,
    TransactionNotificationsResponse,
    PublishUnminedTransactionsRequest,
    ConfirmationNotificationsResponse,
} from "../../proto/api_pb"

import LorcaBackend from "../../middleware/lorca"
import {
    getTransactionsAttempt,
    getTransactionsSuccess,
    getTransactionsFailed,
    createTransactionFailed,
    createTransactionSuccess,
    signTransactionCancel,
    signTransactionSuccess,
    signTransactionFailed,
    publishTransactionSuccess,
    publishTransactionFailed,
    validateAddressSuccess,
    validateAddressFailed,
    signTransactionAttempt,
    createTransactionAttempt,
    publishTransactionAttempt,
    publishUnminedTransactionsAttempt,
    publishUnminedTransactionsFailed,
    publishUnminedTransactionsSuccess,
    publishUnminedTransactionsCleanup,
} from "./transactionsSlice"
import { AuthoredTransactionMetadata } from "./models"
import { AppError, IGetState, AppDispatch, AppThunk } from "../../store/types"

import { loadWalletBalance } from "../balances/walletBalanceSlice"
import { loadBestBlockHeight } from "../app/networkinfo/networkInfoSlice"
import {
    loadStakeInfoAttempt,
    loadTicketsAttempt,
} from "../../features/staking/stakingSlice"
import { Transaction } from "../../middleware/models"
import { displayTXNotification } from "../app/appSlice"
import { hexToRaw } from "../../helpers/byteActions"
import { CreateTransactionRequest } from "../../proto/walletgui_pb"

export const loadTransactionsAttempt: ActionCreator<any> = (): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        const {
            getTransactionsAttempting: getTransactionsRequest,
            startBlockHeight,
            endBlockHeight,
            targetTxCount,
        } = getState().transactions
        if (getTransactionsRequest) {
            return
        }
        dispatch(getTransactionsAttempt())
        try {
            const resp = await LorcaBackend.fetchTransactions(
                startBlockHeight,
                endBlockHeight,
                targetTxCount
            )
            dispatch(getTransactionsSuccess(resp))
        } catch (error) {
            dispatch(getTransactionsFailed(error))
        }
    }
}

export const processTransactionNotification: ActionCreator<any> = (
    unminedTxList: Transaction[]
): AppThunk => {
    return async (dispatch) => {

        batch(() => {
            dispatch(loadBestBlockHeight())
            dispatch(loadWalletBalance())
            dispatch(loadStakeInfoAttempt())
            dispatch(loadTicketsAttempt())
            // dispatch(loadTransactionsAttempt())
        })
    }
}

const w = window as any

export const createTxNotificationReceivers: ActionCreator<any> = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        w.lorcareceiver__OnTxNotification = (serializedMsg: string) => {
            const message = TransactionNotificationsResponse.deserializeBinary(
                hexToRaw(serializedMsg)
            )
            console.log("TxNotification received", message)
            const unminedTxList = _.map(
                message.getUnminedTransactionsList(),
                (td) => new Transaction(td)
            )
            _.map(unminedTxList, (tx) => dispatch(displayTXNotification(tx)))
            dispatch(processTransactionNotification())
        }

        w.lorcareceiver__OnConfirmNotification = (serializedMsg: string) => {
        	const message = ConfirmationNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
            dispatch(processTransactionNotification())
            // dispatch(loadBestBlockHeight())
            // dispatch(loadWalletBalance())
            // dispatch(loadStakeInfoAttempt())
            // dispatch(loadTicketsAttempt())
            // dispatch(loadTransactionsAttempt())
        }
    }
}


export const createTransaction: ActionCreator<any> = (
    request: CreateTransactionRequest
): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {

        if (getState().transactions.createTransactionAttempting) return

        dispatch(createTransactionAttempt())

        try {
            const response = await LorcaBackend.createTransaction(request)
            const decoded = await LorcaBackend.decodeRawTransaction(
                response.getUnsignedTransaction_asU8()
            )
            const decodedTx = decoded.getTransaction()
            if (decodedTx == undefined) {
                throw new AppError(
                    0,
                    "Constructed transaction could not be decoded.  Probably an internal error."
                )
            }

            const humanreadableTxInfo = new AuthoredTransactionMetadata(
                response,
                decodedTx
            )

            dispatch(
                createTransactionSuccess({
                    txInfo: humanreadableTxInfo,
                    unsignedTx: response.getUnsignedTransaction_asU8(),
                })
            )
        } catch (error) {
            dispatch(createTransactionFailed(error))
        }
    }
}

export const cancelSignTransaction: ActionCreator<any> = (): AppThunk => {
    return async (dispatch: AppDispatch) => {
        dispatch(signTransactionCancel())
    }
}

export const signTransaction: ActionCreator<any> = (
    unsignedTx: Uint8Array,
    passphrase: string
): AppThunk => {
    return async (dispatch: AppDispatch, getState) => {
        if (getState().transactions.signTransactionAttempting) return

        const request = new SignTransactionRequest()
        request.setPassphrase(new Uint8Array(Buffer.from(passphrase)))
        request.setSerializedTransaction(
            new Uint8Array(Buffer.from(unsignedTx))
        )

        dispatch(signTransactionAttempt())

        try {
            const resp = await LorcaBackend.signTransaction(request)
            dispatch(
                signTransactionSuccess(resp)
            )
            const decoded = await LorcaBackend.decodeRawTransaction(
                resp.getTransaction_asU8()
            )
            const decodedTx = decoded.getTransaction()
            if (decodedTx == undefined) {
                throw new AppError(
                    0,
                    "Signed transaction could not be decoded.  Probably an internal error."
                )
            }
            console.log("DECODED SIGNED TX", decodedTx)
        } catch (error) {
            dispatch(signTransactionFailed(error))
        }
    }
}

export const publishTransaction: ActionCreator<any> = (): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        const {
            publishTransactionAttempting,
            signTransactionResponse,
        } = getState().transactions
        if (publishTransactionAttempting) {
            return
        }

        if (signTransactionResponse == null) {
            throw new AppError(10, "Signed tx should not be null")
        }
        const tx = signTransactionResponse.getTransaction_asU8()
        const request = new PublishTransactionRequest()
        request.setSignedTransaction(new Uint8Array(Buffer.from(tx)))

        dispatch(publishTransactionAttempt())

        try {
            const resp = await LorcaBackend.publishTransaction(request)
            dispatch(
                publishTransactionSuccess(resp)
            )
        } catch (error) {
            dispatch(publishTransactionFailed(error))
        }
    }
}

export const validateAddressAttempt: ActionCreator<any> = (): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        const { publishTransactionAttempting } = getState().transactions
        if (publishTransactionAttempting) {
            return
        }

        dispatch(validateAddressAttempt())

        try {
            // TODO implement me
            const resp = await LorcaBackend.validateAddress()
            dispatch(validateAddressSuccess(resp))
        } catch (error) {
            dispatch(validateAddressFailed(error))
        }
    }
}

export const publishUnminedTransactions: ActionCreator<any> = (): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        const {
            publishUnminedTransactionsAttempting,
        } = getState().transactions
        if (publishUnminedTransactionsAttempting) {
            return
        }

        const request = new PublishUnminedTransactionsRequest()
        dispatch(publishUnminedTransactionsAttempt())

        try {
            const resp = await LorcaBackend.publishUnminedTransactions(request)
            dispatch(publishUnminedTransactionsSuccess(resp))
            setTimeout(() => {
                dispatch(publishUnminedTransactionsCleanup())
            }, 3000)            
        } catch (error) {
            dispatch(publishUnminedTransactionsFailed(error))
        }
    }
}