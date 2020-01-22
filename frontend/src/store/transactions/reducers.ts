
import {
	TransactionsState, GetTransactionsActionTypes,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_FAILED, GETTRANSACTION_SUCCESS
} from './types'

export const transactionsInitialState: TransactionsState = {
	minedTx: [],
	unminedTx: [],
	getTransactionsRequest: false,
	startBlockHeight: 0,
	endBlockHeight: 0,
	txCount: 0
}


export default function transactions(
	state: TransactionsState = transactionsInitialState,
	action: GetTransactionsActionTypes) {

	switch (action.type) {
		case GETTRANSACTION_ATTEMPT:
			return {
				...state,
				getTransactionsRequest: true,
			};
		case GETTRANSACTION_FAILED:
			return {
				...state,
				getTransactionsRequest: false,
			};
		case GETTRANSACTION_SUCCESS:
			return {
				...state,
				getTransactionsRequest: false,
				minedTx: action.payload.minedTx,
				unminedTx: action.payload.unminedTx
			};
		default:
			return state;
	}
}
