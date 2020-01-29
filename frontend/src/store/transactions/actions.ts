
import { Dispatch, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource, { decodeRawTransaction } from '../../datasources/dcrwallet';

import {
	TransactionsActionTypes, TransactionNotificationsReceived,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_SUCCESS, GETTRANSACTION_FAILED,
	TRANSACTIONNOTIFICATIONS_RECEIVED,
	CONSTRUCTTRANSACTIONATTEMPT, CONSTRUCTTRANSACTIONSUCCESS, CONSTRUCTTRANSACTIONFAILED, IOutput
} from './types';

import { IGetState, AppError } from '../types';
import { loadTicketsAttempt, loadStakeInfoAttempt } from '../staking/actions';
import { loadWalletBalance } from '../walletbalance/actions';
import { ConstructTransactionRequest } from '../../proto/api_pb';
import _ from 'lodash';
import { CONSTRUCTTX_OUTPUT_SELECT_ALGO_UNSPECIFIED, CONSTRUCTTX_OUTPUT_SELECT_ALGO_ALL } from '../../constants';
import { rawToHex } from '../../helpers/byteActions';


export const loadTransactionsAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {
		const { getTransactionsRequest, startBlockHeight, endBlockHeight, targetTxCount } = getState().transactions
		if (getTransactionsRequest) {
			return Promise.resolve();
		}
		dispatch({ type: GETTRANSACTION_ATTEMPT });
		try {
			const resp = await DcrwalletDatasource.fetchTransactions(startBlockHeight, endBlockHeight, targetTxCount)
			dispatch({ payload: resp, type: GETTRANSACTION_SUCCESS });
		}
		catch (error) {
			dispatch({ error, type: GETTRANSACTION_FAILED });
		}
	}
};



export const subscribeTransactionNotifications: ActionCreator<any> = () => {
	return (dispatch: Dispatch<TransactionNotificationsReceived>) => {
		DcrwalletDatasource.txNotifications((message) => {
			dispatch({ type: TRANSACTIONNOTIFICATIONS_RECEIVED, payload: message });
			dispatch(loadTransactionsAttempt());
			dispatch(loadTicketsAttempt());
			dispatch(loadWalletBalance());
			dispatch(loadStakeInfoAttempt());
		});
	}
}



export const constructTransactionAttempt: ActionCreator<any> = (
	account: number,
	confirmations: number,
	outputs: IOutput[],
	all: boolean) => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {
		var request = new ConstructTransactionRequest();
		request.setSourceAccount(account);
		request.setRequiredConfirmations(confirmations);
		let totalAmount = 0;
		if (!all) {
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
			const changeScript = getState().transactions.changeScriptByAccount[account] || null;
			if (changeScript) {
				const changeDest = new ConstructTransactionRequest.OutputDestination();
				changeDest.setScript(changeScript);
				request.setChangeDestination(changeDest);
			}
		} else {
			if (outputs.length > 1) {
				return (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>) => {
					const error: AppError = {
						status: 1,
						msg: "Too many outputs provided for a send all request."
					};
					dispatch({ error, type: CONSTRUCTTRANSACTIONFAILED });
				};
			} else if (outputs.length == 0) {
				return (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>) => {
					const error = {
						status: 2,
						msg: "No destination specified for send all request."
					};
					dispatch({ error, type: CONSTRUCTTRANSACTIONFAILED });
				};
			} else {
				const output = outputs[0];
				request.setOutputSelectionAlgorithm(CONSTRUCTTX_OUTPUT_SELECT_ALGO_ALL);
				const outputDest = new ConstructTransactionRequest.OutputDestination();
				outputDest.setAddress(output.destination);
				request.setChangeDestination(outputDest);
			}
		}

		dispatch({ type: CONSTRUCTTRANSACTIONATTEMPT });

		try {
			const constructTxResponse = await DcrwalletDatasource.constructTransaction(request);
			const changeScriptByAccount = getState().transactions.changeScriptByAccount || {};
			if (!all) {
				// Store the change address we just generated so that future changes to
				// the tx being constructed will use the same address and prevent gap
				// limit exhaustion (see above note on issue dcrwallet#1622).
				const changeIndex = constructTxResponse.getChangeIndex();
				if (changeIndex > -1) {
					const rawTx = Buffer.from(constructTxResponse.getUnsignedTransaction_asU8());
					const decoded = decodeRawTransaction(rawTx);
					changeScriptByAccount[account] = decoded.outputs[changeIndex].script;
				}

			} else {
				totalAmount = constructTxResponse.getTotalOutputAmount();
			}
			const rawTx = rawToHex(constructTxResponse.getUnsignedTransaction_asU8());
			dispatch({
				response: constructTxResponse,
				changeScriptByAccount: changeScriptByAccount,
				rawTx: rawTx,
				totalAmount: totalAmount,
				type: CONSTRUCTTRANSACTIONSUCCESS
			});
			return constructTxResponse;
		}
		catch (error) {
			debugger
			if (String(error).indexOf("insufficient balance") > 0) {
				const error: AppError = {
					status: 3,
					msg: "Insufficient balance"
				};
				dispatch({ error, type: CONSTRUCTTRANSACTIONFAILED });
			} else if (String(error).indexOf("violates the unused address gap limit policy") > 0) {
				// Work around dcrwallet#1622: generate a new address in the internal
				// branch using the wrap gap policy so that change addresses can be
				// regenerated again.
				// We'll still error out to let the user know wrapping has occurred.
				// TODO
				wallet.getNextAddress(sel.walletService(getState()), account, 1);
				dispatch({ error, type: CONSTRUCTTRANSACTIONFAILED });
			} else {
				dispatch({ error, type: CONSTRUCTTRANSACTIONFAILED });
			}
		}
	}
};
