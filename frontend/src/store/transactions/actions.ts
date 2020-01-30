import _ from 'lodash';

import { Dispatch, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource, { decodeRawTransaction } from '../../datasources/dcrwallet';

import {
	TransactionsActionTypes, TransactionNotificationsReceived,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_SUCCESS, GETTRANSACTION_FAILED,
	TRANSACTIONNOTIFICATIONS_RECEIVED,
	CONSTRUCTTRANSACTIONATTEMPT, CONSTRUCTTRANSACTIONSUCCESS, CONSTRUCTTRANSACTIONFAILED, SIGNTRANSACTIONATTEMPT, SIGNTRANSACTIONSUCCESS, SIGNTRANSACTIONFAILED, PUBLISHTRANSACTIONATTEMPT, PUBLISHTRANSACTIONSUCCESS, PUBLISHTRANSACTIONFAILED, SendTransactionSteps, HumanreadableTxInfo, SIGNTRANSACTIONCANCEL
} from './types';

import { CONSTRUCTTX_OUTPUT_SELECT_ALGO_UNSPECIFIED, CONSTRUCTTX_OUTPUT_SELECT_ALGO_ALL, DEFAULT_FEE } from '../../constants';

import { IGetState, AppError } from '../types';
import { loadTicketsAttempt, loadStakeInfoAttempt } from '../staking/actions';
import { loadWalletBalance } from '../walletbalance/actions';
import { ConstructTransactionRequest, SignTransactionRequest, PublishTransactionRequest } from '../../proto/api_pb';
import { rawToHex } from '../../helpers/byteActions';
import { ConstructTxOutput } from '../../datasources/models';
import { getChangeScriptCache } from './selectors';
import { WalletAccount } from '../../models';
import { lookupAccount } from '../accounts/selectors';


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
	outputs: ConstructTxOutput[],
	sendAllFlag: boolean) => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {

		const { constructTransactionAttempting } = getState().transactions;

		if (constructTransactionAttempting) {
			return Promise.resolve()
		}

		var request = new ConstructTransactionRequest();
		request.setSourceAccount(account);
		request.setRequiredConfirmations(confirmations);
		let totalAmount = 0;
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
			const changeScript = getChangeScriptCache(getState())[account] || null;
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
					dispatch({
						error,
						currentStep: SendTransactionSteps.CONSTRUCT_DIALOG,
						type: CONSTRUCTTRANSACTIONFAILED
					});
				};
			} else if (outputs.length == 0) {
				return (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>) => {
					const error = {
						status: 2,
						msg: "No destination specified for send all request."
					};
					dispatch({
						error,
						currentStep: SendTransactionSteps.CONSTRUCT_DIALOG,
						type: CONSTRUCTTRANSACTIONFAILED
					});
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

		let rawTx;

		try {
			const constructTxResponse = await DcrwalletDatasource.constructTransaction(request);
			const changeScriptCache = getChangeScriptCache(getState()) || {};
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

			} else {
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

			dispatch({
				type: CONSTRUCTTRANSACTIONSUCCESS,
				txInfo: humanreadableTxInfo,
				constructTxReq: request,
				constructTxResp: constructTxResponse,
				changeScriptCache: changeScriptCache,
				currentStep: SendTransactionSteps.SIGN_DIALOG,
			});

			return constructTxResponse;
		}
		catch (error) {
			dispatch({
				error,
				currentStep: SendTransactionSteps.SIGN_DIALOG,
				type: CONSTRUCTTRANSACTIONFAILED
			});
		}
	}
};




export const cancelSignTransaction: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>): Promise<any> => {
		dispatch({
			type: SIGNTRANSACTIONCANCEL,
			currentStep: SendTransactionSteps.CONSTRUCT_DIALOG
		});
	}
};




export const signTransactionAttempt: ActionCreator<any> = (
	passphrase: string,
) => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {

		const { signTransactionAttempting, constructTransactionResponse } = getState().transactions;


		if (signTransactionAttempting) {
			return Promise.resolve();
		}

		if (constructTransactionResponse == null) {
			throw "null constructTransactionResponse"
		}

		const rawTx = constructTransactionResponse.getUnsignedTransaction_asU8()
		const request = new SignTransactionRequest()
		request.setPassphrase(new Uint8Array(Buffer.from(passphrase)))
		request.setSerializedTransaction(new Uint8Array(Buffer.from(rawTx)))

		dispatch({ type: SIGNTRANSACTIONATTEMPT });
		try {
			const resp = await DcrwalletDatasource.signTransaction(request)
			dispatch({
				type: SIGNTRANSACTIONSUCCESS,
				payload: resp,
				currentStep: SendTransactionSteps.PUBLISH_DIALOG
			});
		} catch (error) {
			dispatch({
				error,
				type: SIGNTRANSACTIONFAILED
			});

		}
	}
};


export const publishTransactionAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {

		const { publishTransactionAttempting, signTransactionResponse } = getState().transactions;

		if (publishTransactionAttempting) {
			return Promise.resolve();
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

		dispatch({ type: PUBLISHTRANSACTIONATTEMPT });
		try {
			const resp = await DcrwalletDatasource.publishTransaction(request)
			dispatch({
				type: PUBLISHTRANSACTIONSUCCESS,
				payload: resp,
				currentStep: SendTransactionSteps.PUBLISH_CONFIRM_DIALOG
			});
		} catch (error) {
			dispatch({
				error,
				type: PUBLISHTRANSACTIONFAILED
			});
		}
	}
};


export const validateAddressAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {

		const { publishTransactionAttempting } = getState().transactions;

		if (publishTransactionAttempting) {
			return Promise.resolve();
		}

		dispatch({ type: PUBLISHTRANSACTIONATTEMPT });
		try {
			const resp = await DcrwalletDatasource.validateAddress()
			dispatch({ type: PUBLISHTRANSACTIONSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: PUBLISHTRANSACTIONFAILED });
		}
	}
};
export const committedTicketsAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {

		const { publishTransactionAttempting } = getState().transactions;

		if (publishTransactionAttempting) {
			return Promise.resolve();
		}

		dispatch({ type: PUBLISHTRANSACTIONATTEMPT });
		try {
			const resp = await DcrwalletDatasource.committedTickets()
			dispatch({ type: PUBLISHTRANSACTIONSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: PUBLISHTRANSACTIONFAILED });
		}
	}
};


/*


export const CLEARTX = "CLEARTX";

export const clearTransaction = () => ({ type: CLEARTX });

export const SIGNTX_ATTEMPT = "SIGNTX_ATTEMPT";
export const SIGNTX_FAILED = "SIGNTX_FAILED";
export const SIGNTX_SUCCESS = "SIGNTX_SUCCESS";

export const signTransactionAttempt = (passphrase, rawTx) => (dispatch, getState) => {
  dispatch({ type: SIGNTX_ATTEMPT });
  return wallet.signTransaction(sel.walletService(getState()), passphrase, rawTx)
    .then(signTransactionResponse => {
      dispatch({ signTransactionResponse: signTransactionResponse, type: SIGNTX_SUCCESS });
      dispatch(publishTransactionAttempt(signTransactionResponse.getTransaction()));
    })
    .catch(error => dispatch({ error, type: SIGNTX_FAILED }));
};

export const PUBLISHTX_ATTEMPT = "PUBLISHTX_ATTEMPT";
export const PUBLISHTX_FAILED = "PUBLISHTX_FAILED";
export const PUBLISHTX_SUCCESS = "PUBLISHTX_SUCCESS";

export const publishTransactionAttempt = (tx) => (dispatch, getState) => {
  dispatch({ type: PUBLISHTX_ATTEMPT });
  return wallet.publishTransaction(sel.walletService(getState()), tx)
    .then(res => {
      // If one of the outputs of the just published tx is one of the recorded
      // change scripts, clear it as to prevent address reuse. This is needed
      // due to dcrwallet#1622.
      const rawTx = Buffer.from(tx, "hex");
      const decoded = wallet.decodeRawTransaction(rawTx);
      const changeScriptByAccount = getState().control.changeScriptByAccount || {};
      const newChangeScriptByAccount = {};
      Object.keys(changeScriptByAccount).forEach(account => {
        const foundScript = decoded.outputs.some(out => {
          if (out.script.equals(changeScriptByAccount[account])) {
            return true;
          }
        });
        if (!foundScript) {
          newChangeScriptByAccount[account] = changeScriptByAccount[account];
        }
      });

      dispatch({ hash: reverseRawHash(res.getTransactionHash()),
        changeScriptByAccount: newChangeScriptByAccount, type: PUBLISHTX_SUCCESS });
    })
    .catch(error => dispatch({ error, type: PUBLISHTX_FAILED }));
};
*/
