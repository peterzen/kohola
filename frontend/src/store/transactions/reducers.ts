
import {
	ITransactionState, TransactionsActionTypes,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_FAILED, GETTRANSACTION_SUCCESS,
	TRANSACTIONNOTIFICATIONS_SUBSCRIBE, TRANSACTIONNOTIFICATIONS_RECEIVED,
	CONSTRUCTTRANSACTIONATTEMPT, CONSTRUCTTRANSACTIONFAILED, CONSTRUCTTRANSACTIONSUCCESS, SIGNTRANSACTIONATTEMPT, SIGNTRANSACTIONFAILED, SIGNTRANSACTIONSUCCESS, PUBLISHTRANSACTIONATTEMPT, PUBLISHTRANSACTIONFAILED, PUBLISHTRANSACTIONSUCCESS, COMMITTEDTICKETSATTEMPT, COMMITTEDTICKETSFAILED, COMMITTEDTICKETSSUCCESS, VALIDATEADDRESSATTEMPT, VALIDATEADDRESSFAILED, VALIDATEADDRESSSUCCESS, SWEEPACCOUNTATTEMPT, SWEEPACCOUNTFAILED, SWEEPACCOUNTSUCCESS,
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
	constructTransactionResponse: null,
	constructTransactionAttempting: false,
	errorConstructTransaction: null,
	changeScriptByAccount: {},

	// SignTransaction
	signTransactionAttempting: false,
	signTransactionResponse: null,
	errorSignTransaction: null,

	// CommittedTickets
	committedTicketsAttempting: false,
	committedTicketsResponse: null,
	errorCommittedTickets: null,

	//  ValidateAddress
	validateAddressAttempting: false,
	validateAddressResponse: null,
	errorValidateAddress: null,

	// SweepAccount
	sweepAccountAttempting: false,
	sweepAccountResponse: null,
	errorSweepAccount: null
}


export default function transactions(
	state: ITransactionState = transactionsInitialState,
	action: TransactionsActionTypes) {

	switch (action.type) {
		// GetTransaction
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

		// TransactionNotifications
		case TRANSACTIONNOTIFICATIONS_SUBSCRIBE:
			return {
				...state
			};
		case TRANSACTIONNOTIFICATIONS_RECEIVED:
			return {
				...state
			};

		// ConstructTransaction
		case CONSTRUCTTRANSACTIONATTEMPT:
			return {
				...state,
				constructTransactionAttempting: true,
				errorConstructTransaction: null,
			};
		case CONSTRUCTTRANSACTIONFAILED:
			return {
				...state,
				constructTransactionAttempting: false,
				errorConstructTransaction: action.error,
			};
		case CONSTRUCTTRANSACTIONSUCCESS:
			return {
				...state,
				constructTransactionAttempting: false,
				constructTransactionResponse: action.response,
				errorConstructTransaction: null,
				changeScriptByAccount: action.changeScriptByAccount,
			};

		// SignTransaction
		case SIGNTRANSACTIONATTEMPT:
			return {
				...state,
				signTransactionAttempting: true,
				errorSignTransaction: null,
			};
		case SIGNTRANSACTIONFAILED:
			return {
				...state,
				signTransactionAttempting: false,
				errorSignTransaction: action.error,
			};
		case SIGNTRANSACTIONSUCCESS:
			return {
				...state,
				signTransactionAttempting: false,
				signTransactionResponse: action.payload,
				errorSignTransaction: null
			};

		// PublishTransaction
		case PUBLISHTRANSACTIONATTEMPT:
			return {
				...state,
				publishTransactionAttempting: true,
				errorPublishTransaction: null,
			};
		case PUBLISHTRANSACTIONFAILED:
			return {
				...state,
				publishTransactionAttempting: false,
				errorPublishTransaction: action.error,
			};
		case PUBLISHTRANSACTIONSUCCESS:
			return {
				...state,
				publishTransactionAttempting: false,
				publishTransactionResponse: action.payload,
				errorPublishTransaction: null
			};

		// CommittedTickets
		case COMMITTEDTICKETSATTEMPT:
			return {
				...state,
				committedTicketsAttempting: true,
				errorCommittedTickets: null,
			};
		case COMMITTEDTICKETSFAILED:
			return {
				...state,
				committedTicketsAttempting: false,
				errorCommittedTickets: action.error,
			};
		case COMMITTEDTICKETSSUCCESS:
			return {
				...state,
				committedTicketsAttempting: false,
				committedTicketsResponse: action.payload,
				errorCommittedTickets: null
			};

		// ValidateAddress
		case VALIDATEADDRESSATTEMPT:
			return {
				...state,
				validateAddressAttempting: true,
				errorValidateAddress: null,
			};
		case VALIDATEADDRESSFAILED:
			return {
				...state,
				validateAddressAttempting: false,
				errorValidateAddress: action.error,
			};
		case VALIDATEADDRESSSUCCESS:
			return {
				...state,
				validateAddressAttempting: false,
				validateAddressResponse: action.payload,
				errorValidateAddress: null
			};

		// SweepAccount
		case SWEEPACCOUNTATTEMPT:
			return {
				...state,
				sweepAccountAttempting: true,
				errorSweepAccount: null,
			};
		case SWEEPACCOUNTFAILED:
			return {
				...state,
				sweepAccountAttempting: false,
				errorSweepAccount: action.error,
			};
		case SWEEPACCOUNTSUCCESS:
			return {
				...state,
				sweepAccountAttempting: false,
				sweepAccountResponse: action.payload,
				errorSweepAccount: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
