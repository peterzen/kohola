
import {
	ITransactionState, TransactionsActionTypes,
	GETTRANSACTION_ATTEMPT, GETTRANSACTION_FAILED, GETTRANSACTION_SUCCESS,
	TRANSACTIONNOTIFICATIONS_SUBSCRIBE, TRANSACTIONNOTIFICATIONS_RECEIVED,
	CONSTRUCTTRANSACTIONATTEMPT, CONSTRUCTTRANSACTIONFAILED, CONSTRUCTTRANSACTIONSUCCESS, SIGNTRANSACTIONATTEMPT, SIGNTRANSACTIONFAILED, SIGNTRANSACTIONSUCCESS, PUBLISHTRANSACTIONATTEMPT, PUBLISHTRANSACTIONFAILED, PUBLISHTRANSACTIONSUCCESS, COMMITTEDTICKETSATTEMPT, COMMITTEDTICKETSFAILED, COMMITTEDTICKETSSUCCESS, VALIDATEADDRESSATTEMPT, VALIDATEADDRESSFAILED, VALIDATEADDRESSSUCCESS, SWEEPACCOUNTATTEMPT, SWEEPACCOUNTFAILED, SWEEPACCOUNTSUCCESS, SendTransactionSteps, SIGNTRANSACTIONCANCEL,
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
	startBlockHeight: -10,

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
	changeScriptCache: {},
	errorConstructTransaction: null,
	constructTransactionRequest: null,
	constructTransactionResponse: null,
	constructTransactionAttempting: false,

	// SignTransaction
	signTransactionAttempting: false,
	signTransactionResponse: null,
	errorSignTransaction: null,

	// PublishTransaction
	txInfo: null,
	publishTransactionAttempting: false,
	publishTransactionResponse: null,
	errorPublishTransaction: null,

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
	errorSweepAccount: null,

	// Send transaction GUI
	sendTransactionCurrentStep: SendTransactionSteps.CONSTRUCT_DIALOG
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
				errorConstructTransaction: null,
				constructTransactionRequest: null,
				constructTransactionResponse: null,
				constructTransactionAttempting: true,
			};
		case CONSTRUCTTRANSACTIONFAILED:
			return {
				...state,
				errorConstructTransaction: action.error,
				constructTransactionRequest: null,
				constructTransactionAttempting: false,
			};
		case CONSTRUCTTRANSACTIONSUCCESS:
			return {
				...state,
				txInfo: action.txInfo,
				changeScriptCache: action.changeScriptCache,
				errorConstructTransaction: null,
				sendTransactionCurrentStep: action.currentStep,
				constructTransactionRequest: action.constructTxReq,
				constructTransactionResponse: action.constructTxResp,
				constructTransactionAttempting: false,
			};

		// SignTransaction
		case SIGNTRANSACTIONATTEMPT:
			return {
				...state,
				signTransactionAttempting: true,
				errorSignTransaction: null,
			};
		case SIGNTRANSACTIONCANCEL:
			return {
				...state,
				signTransactionAttempting: false,
				errorSignTransaction: null,
				sendTransactionCurrentStep: action.currentStep,
			}
		case SIGNTRANSACTIONFAILED:
			return {
				...state,
				signTransactionAttempting: false,
				errorSignTransaction: action.error,
			};
		case SIGNTRANSACTIONSUCCESS:
			return {
				...state,
				sendTransactionCurrentStep: action.currentStep,
				signTransactionResponse: action.payload,
				signTransactionAttempting: false,
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
				txInfo: null,
				errorPublishTransaction: null,
				signTransactionResponse: null,
				sendTransactionCurrentStep: action.currentStep,
				publishTransactionResponse: action.payload,
				publishTransactionAttempting: false,
				constructTransactionResponse: null,
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
