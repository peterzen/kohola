
import {
	ITransactionState, TransactionsActionTypes,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_FAILED, GETTRANSACTION_SUCCESS,
	TRANSACTIONNOTIFICATIONS_SUBSCRIBE, TRANSACTIONNOTIFICATIONS_RECEIVED,
	CONSTRUCTTRANSACTIONATTEMPT, CONSTRUCTTRANSACTIONFAILED, CONSTRUCTTRANSACTIONSUCCESS, 
} from './types'
import { TransactionType } from '../../constants';

export const transactionsInitialState: ITransactionState = {
	txList: [],
	getTransactionsRequest: false,
	// The block height to begin including transactions from. 
	// If this field is non- zero, starting_block_hash must be
	// set to its default value to avoid ambiguity.
	// If positive, the field is interpreted as a block height.
	// If negative, the height is subtracted from the block wallet /
	// considers itself in sync with.
	startBlockHeight: -4,

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
	constructTransactionRequest: null,
	constructTransactionResponse: null,
	constructTransactionAttempting: false,
	errorConstructTransaction: null,
}


export default function transactions(
	state: ITransactionState = transactionsInitialState,
	action: TransactionsActionTypes) {

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
				txList: action.payload,
			};
		case TRANSACTIONNOTIFICATIONS_SUBSCRIBE:
			return {
				...state
			};
		case TRANSACTIONNOTIFICATIONS_RECEIVED:
			return {
				...state
			};
		case CONSTRUCTTRANSACTIONATTEMPT:
			return {
				...state,
				getConstructTransactionRequest: true,
				errorConstructTransaction: null,
			};
		case CONSTRUCTTRANSACTIONFAILED:
			return {
				...state,
				getConstructTransactionRequest: false,
				errorConstructTransaction: action.error,
			};
		case CONSTRUCTTRANSACTIONSUCCESS:
			return {
				...state,
				getConstructTransactionRequest: false,
				_ConstructTransaction: action.payload,
				errorConstructTransaction: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
