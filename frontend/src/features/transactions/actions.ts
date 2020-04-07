import _ from 'lodash';
import { ActionCreator } from 'redux';
import { batch } from 'react-redux';

import {
	CONSTRUCTTX_OUTPUT_SELECT_ALGO_UNSPECIFIED,
	CONSTRUCTTX_OUTPUT_SELECT_ALGO_ALL,
	TransactionType
} from '../../constants';

import {
	ConstructTransactionRequest,
	SignTransactionRequest, PublishTransactionRequest,
	TransactionNotificationsResponse,
	AccountNotificationsResponse,
	CreateRawTransactionRequest
} from '../../proto/api_pb';

import { ConstructTxOutput } from '../../middleware/models';
import LorcaBackend from '../../middleware/lorca';
import {
	getTransactionsAttempt,
	getTransactionsSuccess,
	getTransactionsFailed,
	getChangeScriptCache,
	SendTransactionSteps,
	constructTransactionFailed,
	AuthoredTransactionMetadata,
	constructTransactionSuccess,
	signTransactionCancel,
	signTransactionSuccess,
	signTransactionFailed,
	publishTransactionSuccess,
	publishTransactionFailed,
	validateAddressSuccess,
	validateAddressFailed,
	signTransactionAttempt,
	constructTransactionAttempt,
	publishTransactionAttempt,
	createRawTransactionAttempt,
	createRawTransactionFailed,
	createRawTransactionSuccess
} from './transactionsSlice';
import { AppError, IGetState, AppDispatch, AppThunk } from '../../store/types';

import { loadWalletBalance } from '../balances/walletBalanceSlice';
import { loadBestBlockHeight } from '../app/networkinfo/networkInfoSlice';
import { lookupAccount, accountNotification } from '../balances/accountSlice';
import { loadStakeInfoAttempt, loadTicketsAttempt } from '../../features/staking/stakingSlice';
import { Transaction } from '../../middleware/models';
import { displayTXNotification } from '../app/appSlice';
import { hexToRaw, rawHashToHex, reverseRawHash, rawToHex } from '../../helpers/byteActions';
import { reverseHash } from '../../helpers/helpers';

export const loadTransactionsAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const { getTransactionsAttempting: getTransactionsRequest, startBlockHeight, endBlockHeight, targetTxCount } = getState().transactions
		if (getTransactionsRequest) {
			return
		}
		dispatch(getTransactionsAttempt())
		try {
			const resp = await LorcaBackend.fetchTransactions(startBlockHeight, endBlockHeight, targetTxCount)
			dispatch(getTransactionsSuccess(resp))
		}
		catch (error) {
			dispatch(getTransactionsFailed(error))
		}
	}
}


export const processTransactionNotification: ActionCreator<any> = (
	unminedTxList: Transaction[]
): AppThunk => {
	return async (dispatch) => {

		_.map(unminedTxList, tx => dispatch(displayTXNotification(tx)))

		batch(() => {
			dispatch(loadBestBlockHeight());
			dispatch(loadStakeInfoAttempt());
			dispatch(loadTicketsAttempt());
			dispatch(loadTransactionsAttempt());
			dispatch(loadWalletBalance());
		})
	}
}

const w = (window as any)

export const createTxNotificationReceivers: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch) => {

		w.lorcareceiver__OnTxNotification = (serializedMsg: string) => {
			const message = TransactionNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
			console.log("TxNotification received", message)
			const unminedTxList = _.map(message.getUnminedTransactionsList(), td => new Transaction(td))
			dispatch(processTransactionNotification(unminedTxList))
		}

		// w.lorcareceiver__OnConfirmNotification = (serializedMsg: Uint8Array) => {
		// 	const message = ConfirmationNotificationsResponse.deserializeBinary(hexToRaw(serializedMsg))
		// 	dispatch(transactionNotification(message))
		// }

	}
}

export const constructTransaction: ActionCreator<any> = (
	account: number,
	confirmations: number,
	outputs: ConstructTxOutput[],
	sendAllFlag: boolean): AppThunk => {

	return async (dispatch: AppDispatch, getState: IGetState) => {
		const { constructTransactionAttempting } = getState().transactions;
		if (constructTransactionAttempting) {
			return
		}
		const request = new ConstructTransactionRequest();
		request.setSourceAccount(account);
		request.setRequiredConfirmations(confirmations);
		let totalAmount = 0;
		const changeScriptCache = Object.assign({}, getChangeScriptCache(getState()))

		if (!sendAllFlag) {
			request.setOutputSelectionAlgorithm(CONSTRUCTTX_OUTPUT_SELECT_ALGO_UNSPECIFIED);
			outputs.map(output => {
				const outputDest = new ConstructTransactionRequest.OutputDestination();
				outputDest.setAddress(output.destination);
				const newOutput = new ConstructTransactionRequest.Output();
				newOutput.setDestination(outputDest);
				newOutput.setAmount(output.amount);
				request.addNonChangeOutputs(newOutput);
				totalAmount += output.amount;
			});

			// If there's a previously stored change address for this account, use it.
			// This alleviates a possible gap limit address exhaustion. See
			// issue dcrwallet#1622.
			const cachedChangeScript = changeScriptCache[account] || null;
			if (cachedChangeScript) {
				const changeDest = new ConstructTransactionRequest.OutputDestination();
				changeDest.setScript(cachedChangeScript);
				request.setChangeDestination(changeDest);
			}
		} else {
			if (outputs.length > 1) {
				return (dispatch: AppDispatch) => {
					const error = new AppError(1, "Too many outputs provided for a send all request.")
					dispatch(constructTransactionFailed(error))
				}
			}
			else if (outputs.length == 0) {
				return (dispatch: AppDispatch) => {
					const error = new AppError(2, "No destination specified for send all request.")
					dispatch(constructTransactionFailed(error))
				}
			}
			else {
				const output = outputs[0];
				request.setOutputSelectionAlgorithm(CONSTRUCTTX_OUTPUT_SELECT_ALGO_ALL);
				const outputDest = new ConstructTransactionRequest.OutputDestination();
				outputDest.setAddress(output.destination);
				request.setChangeDestination(outputDest);
			}
		}

		dispatch(constructTransactionAttempt())

		try {
			const constructTxResponse = await LorcaBackend.constructTransaction(request)
			const decoded = await LorcaBackend.decodeRawTransaction(constructTxResponse.getUnsignedTransaction_asU8())
			const decodedTx = decoded.getTransaction()
			if (decodedTx == undefined) {
				throw new AppError(0, "Constructed transaction could not be decoded.  Probably an internal error.")
			}
			if (!sendAllFlag) {
				// Store the change address we just generated so that future changes to
				// the tx being constructed will use the same address and prevent gap
				// limit exhaustion (see above note on issue dcrwallet#1622).
				const changeIndex = constructTxResponse.getChangeIndex();
				if (changeIndex > -1) {
					// rawTx = Buffer.from(constructTxResponse.getUnsignedTransaction_asU8());
					// const decoded = decodeRawTransaction(rawTx);
					// console.log("DECODED decodeRawTransaction", decoded)
					const changeScript = decodedTx?.getOutputsList()[changeIndex].getScript_asU8()
					if (changeScript != undefined) {
						changeScriptCache[account] = Buffer.from(changeScript)
					}
				}
			}
			else {
				totalAmount = constructTxResponse.getTotalOutputAmount();
			}

			console.log("DECODED RAW", decodedTx)

			const humanreadableTxInfo = new AuthoredTransactionMetadata(
				constructTxResponse.getUnsignedTransaction_asU8(),
				decodedTx,
				lookupAccount(getState(), account),
				request
			)

			dispatch(constructTransactionSuccess({
				txInfo: humanreadableTxInfo,
				unsignedTx: constructTxResponse.getUnsignedTransaction_asU8(),
				currentStep: SendTransactionSteps.SIGN_DIALOG,
				changeScriptCache: changeScriptCache,
			}))

			return constructTxResponse;
		}
		catch (error) {
			return dispatch(constructTransactionFailed(error))
		}
	}
}



export const createRawTransaction: ActionCreator<any> = (request: CreateRawTransactionRequest): AppThunk => {

	return async (dispatch: AppDispatch, getState: IGetState) => {

		if (getState().transactions.createRawTransactionAttempting) return

		dispatch(createRawTransactionAttempt())

		try {
			const response = await LorcaBackend.createRawTransaction(request)
			console.log("DEBUG ###", rawToHex(response.getUnsignedTransaction_asU8()))
			const decoded = await LorcaBackend.decodeRawTransaction(response.getUnsignedTransaction_asU8())
			const decodedTx = decoded.getTransaction()
			if (decodedTx == undefined) {
				throw new AppError(0, "Constructed transaction could not be decoded.  Probably an internal error.")
			}

			const humanreadableTxInfo = new AuthoredTransactionMetadata(
				response.getUnsignedTransaction_asU8(),
				decodedTx,
			)

			dispatch(constructTransactionSuccess({
				txInfo: humanreadableTxInfo,
				currentStep: SendTransactionSteps.SIGN_DIALOG,
				unsignedTx: response.getUnsignedTransaction_asU8(),
			}))

			// const humanreadableTxInfo: HumanreadableTxInfo = {
			// 	rawTx: decodeRawTransaction(Buffer.from(constructTxResponse.getUnsignedTransaction_asU8())),
			// 	outputs: outputs,
			// 	totalAmount: totalAmount,
			// 	sourceAccount: lookupAccount(getState(), account),
			// 	constructTxReq: request,
			// }

			// dispatch(createRawTransactionSuccess({
			// 	txInfo: humanreadableTxInfo,
			// 	response: response,
			// 	currentStep: SendTransactionSteps.SIGN_DIALOG,
			// }))
		}
		catch (error) {
			dispatch(createRawTransactionFailed(error))
		}
	}
}

export const cancelSignTransaction: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch) => {
		dispatch(signTransactionCancel(SendTransactionSteps.CONSTRUCT_DIALOG))
	}
}



export const signTransaction: ActionCreator<any> = (unsignedTx: Uint8Array, passphrase: string): AppThunk => {
	return async (dispatch: AppDispatch, getState) => {

		if (getState().transactions.signTransactionAttempting) return

		const request = new SignTransactionRequest()
		request.setPassphrase(new Uint8Array(Buffer.from(passphrase)))
		request.setSerializedTransaction(new Uint8Array(Buffer.from(unsignedTx)))

		dispatch(signTransactionAttempt())

		try {
			const resp = await LorcaBackend.signTransaction(request)
			dispatch(signTransactionSuccess({
				currentStep: SendTransactionSteps.PUBLISH_DIALOG,
				response: resp
			}))
			const decoded = await LorcaBackend.decodeRawTransaction(resp.getTransaction_asU8())
			const decodedTx = decoded.getTransaction()
			if (decodedTx == undefined) {
				throw new AppError(0, "Signed transaction could not be decoded.  Probably an internal error.")
			}
			console.log("DECODED SIGNED TX",decodedTx)

		} catch (error) {
			dispatch(signTransactionFailed(error))
		}
	}
}


export const publishTransaction: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const { publishTransactionAttempting, signTransactionResponse } = getState().transactions;
		if (publishTransactionAttempting) {
			return
		}

		if (signTransactionResponse == null) {
			throw {
				status: 10,
				msg: "Signed tx should not be null"
			}
		}
		const tx = signTransactionResponse.getTransaction_asU8();
		const request = new PublishTransactionRequest()
		request.setSignedTransaction(new Uint8Array(Buffer.from(tx)))

		dispatch(publishTransactionAttempt())

		try {
			const resp = await LorcaBackend.publishTransaction(request)
			dispatch(publishTransactionSuccess({
				currentStep: SendTransactionSteps.PUBLISH_CONFIRM_DIALOG,
				response: resp
			}))
		} catch (error) {
			dispatch(publishTransactionFailed(error))
		}
	}
}


export const validateAddressAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {

		const { publishTransactionAttempting } = getState().transactions;
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

