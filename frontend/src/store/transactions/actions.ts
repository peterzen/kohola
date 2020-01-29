import _ from 'lodash';

import { Dispatch, ActionCreator } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import DcrwalletDatasource, { decodeRawTransaction } from '../../datasources/dcrwallet';

import {
	TransactionsActionTypes, TransactionNotificationsReceived,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_SUCCESS, GETTRANSACTION_FAILED,
	TRANSACTIONNOTIFICATIONS_RECEIVED,
	CONSTRUCTTRANSACTIONATTEMPT, CONSTRUCTTRANSACTIONSUCCESS, CONSTRUCTTRANSACTIONFAILED, SIGNTRANSACTIONATTEMPT, SIGNTRANSACTIONSUCCESS, SIGNTRANSACTIONFAILED, PUBLISHTRANSACTIONATTEMPT, PUBLISHTRANSACTIONSUCCESS, PUBLISHTRANSACTIONFAILED
} from './types';

import { CONSTRUCTTX_OUTPUT_SELECT_ALGO_UNSPECIFIED, CONSTRUCTTX_OUTPUT_SELECT_ALGO_ALL } from '../../constants';

import { IGetState, AppError } from '../types';
import { loadTicketsAttempt, loadStakeInfoAttempt } from '../staking/actions';
import { loadWalletBalance } from '../walletbalance/actions';
import { ConstructTransactionRequest } from '../../proto/api_pb';
import { rawToHex, reverseRawHash } from '../../helpers/byteActions';
import { ConstructTxOutput } from '../../datasources/models';
import { SignTransactionActionTypes } from '../signtransaction/types';


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





export const signTransactionAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {

		const { signTransactionAttempting } = getState().transactions;

		if (signTransactionAttempting) {
			return Promise.resolve();
		}
		
		dispatch({ type: SIGNTRANSACTIONATTEMPT });
		try {
			const resp = await DcrwalletDatasource.signTransaction()
			dispatch({ type: SIGNTRANSACTIONSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: SIGNTRANSACTIONFAILED });
		}
	}
};


export const publishTransactionAttempt: ActionCreator<any> = () => {
	return async (dispatch: ThunkDispatch<{}, {}, TransactionsActionTypes>, getState: IGetState): Promise<any> => {

		const { publishTransactionAttempting } = getState().transactions;

		if (publishTransactionAttempting) {
			return Promise.resolve();
		}
		
		dispatch({ type: PUBLISHTRANSACTIONATTEMPT });
		try {
			const resp = await DcrwalletDatasource.publishTransaction()
			dispatch({ type: PUBLISHTRANSACTIONSUCCESS, payload: resp });
		} catch (error) {
			dispatch({ error, type: PUBLISHTRANSACTIONFAILED });
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
