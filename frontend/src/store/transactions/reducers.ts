
import {
	TransactionsState, GetTransactionsActionTypes,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_FAILED, GETTRANSACTION_SUCCESS
} from './types'

export const transactionsInitialState: TransactionsState = {
	minedTx: [],
	unminedTx: [],
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
	targetTxCount: 100
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
