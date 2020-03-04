import _ from 'lodash';
import { ActionCreator } from 'redux';


import { CONSTRUCTTX_OUTPUT_SELECT_ALGO_UNSPECIFIED, CONSTRUCTTX_OUTPUT_SELECT_ALGO_ALL, DEFAULT_FEE } from '../../constants';

import { ConstructTransactionRequest, SignTransactionRequest, PublishTransactionRequest, TransactionNotificationsResponse } from '../../proto/api_pb';
import { ConstructTxOutput } from '../../datasources/models';
import { decodeRawTransaction } from '../../helpers/tx';
import LorcaBackend from '../../datasources/lorca';
import { AppThunk, AppDispatch } from '../../store/store';
import {
	getTransactionsAttempt,
	getTransactionsSuccess,
	getTransactionsFailed,
	transactionNotificationReceived,
	getChangeScriptCache,
	SendTransactionSteps,
	constructTransactionFailed,
	HumanreadableTxInfo,
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
	publishTransactionAttempt
} from './transactionsSlice';
import { AppError, IGetState } from '../../store/types';

import { loadWalletBalance } from '../balances/walletBalanceSlice';
import { loadBestBlockHeight } from '../../features/networkinfo/networkInfoSlice';
import { lookupAccount } from '../balances/accountSlice';
import { loadStakeInfoAttempt, loadTicketsAttempt } from '../../features/staking/stakingSlice';
import { batch } from 'react-redux';

export const loadTransactionsAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {

		const { getTransactionsRequest, startBlockHeight, endBlockHeight, targetTxCount } = getState().transactions
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


export const transactionNotification: ActionCreator<any> = (message: TransactionNotificationsResponse): AppThunk => {
	return async (dispatch) => {
		batch(() => {
			dispatch(loadBestBlockHeight());
			dispatch(loadStakeInfoAttempt());
			dispatch(loadTicketsAttempt());
			dispatch(loadTransactionsAttempt());
			dispatch(loadWalletBalance());
			dispatch(transactionNotificationReceived(message))
		})
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

		let rawTx;

		try {
			const constructTxResponse = await LorcaBackend.constructTransaction(request)
			if (!sendAllFlag) {
				// Store the change address we just generated so that future changes to
				// the tx being constructed will use the same address and prevent gap
				// limit exhaustion (see above note on issue dcrwallet#1622).
				const changeIndex = constructTxResponse.getChangeIndex();
				if (changeIndex > -1) {
					rawTx = Buffer.from(constructTxResponse.getUnsignedTransaction_asU8());
					const decoded = decodeRawTransaction(rawTx);
					changeScriptCache[account] = decoded.outputs[changeIndex].script;
				}
			}
			else {
				totalAmount = constructTxResponse.getTotalOutputAmount();
			}

			// for displaying the confirmation dialog
			const humanreadableTxInfo: HumanreadableTxInfo = {
				rawTx: decodeRawTransaction(Buffer.from(constructTxResponse.getUnsignedTransaction_asU8())),
				outputs: outputs,
				totalAmount: totalAmount,
				sourceAccount: lookupAccount(getState(), account),
				constructTxReq: request,
			}

			dispatch(constructTransactionSuccess({
				txInfo: humanreadableTxInfo,
				response: constructTxResponse,
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



export const cancelSignTransaction: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch) => {
		dispatch(signTransactionCancel(SendTransactionSteps.CONSTRUCT_DIALOG))
	}
}



export const signTransaction: ActionCreator<any> = (passphrase: string): AppThunk => {
	return async (dispatch: AppDispatch, getState) => {

		const { signTransactionAttempting, constructTransactionResponse } = getState().transactions;
		if (signTransactionAttempting) {
			return
		}

		if (constructTransactionResponse == null) {
			throw "null constructTransactionResponse"
		}

		const rawTx = constructTransactionResponse.getUnsignedTransaction_asU8()
		const request = new SignTransactionRequest()
		request.setPassphrase(new Uint8Array(Buffer.from(passphrase)))
		request.setSerializedTransaction(new Uint8Array(Buffer.from(rawTx)))

		dispatch(signTransactionAttempt())

		try {
			const resp = await LorcaBackend.signTransaction(request)
			dispatch(signTransactionSuccess({
				currentStep: SendTransactionSteps.PUBLISH_DIALOG,
				response: resp
			}))
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

