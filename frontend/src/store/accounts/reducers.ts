import {
	WalletAccountsState,
	GetAccountsActionTypes,
	GETACCOUNTS_ATTEMPT, GETACCOUNTS_FAILED, GETACCOUNTS_SUCCESS, ACCOUNTSNOTIFICATIONS_RECEIVED, NextAddressState, NEXTADDRESSATTEMPT, NEXTADDRESSFAILED, NEXTADDRESSSUCCESS, IAccountsState, ACCOUNTSNOTIFICATIONS_SUBSCRIBE
} from "./types";

export const accountsInitialState: IAccountsState = {
	accounts: {},
	getAccountsRequest: false,

	// NextAddress
	nextAddressAccount: null,
	nextAddressResponse: null,
	getNextAddressRequest: false,
	errorNextAddress: null,
}


export default function accounts(
	state: WalletAccountsState = accountsInitialState,
	action: GetAccountsActionTypes) {

	switch (action.type) {
		case GETACCOUNTS_ATTEMPT:
			return {
				...state,
				getAccountsRequest: true,
			};
		case GETACCOUNTS_FAILED:
			return {
				...state,
				getAccountsRequest: false,
			};
		case GETACCOUNTS_SUCCESS:
			return {
				...state,
				getAccountsRequest: false,
				accounts: action.payload
			};
		// AccountNotifications
		case ACCOUNTSNOTIFICATIONS_SUBSCRIBE:
			return {
				...state,
			};
		case ACCOUNTSNOTIFICATIONS_RECEIVED:
			return {
				...state,
			};

		// NextAddress
		case NEXTADDRESSATTEMPT:
			return {
				...state,
				getNextAddressRequest: true,
				errorNextAddress: null,
			};
		case NEXTADDRESSFAILED:
			return {
				...state,
				getNextAddressRequest: false,
				errorNextAddress: action.error,
			};
		case NEXTADDRESSSUCCESS:
			return {
				...state,
				getNextAddressRequest: false,
				nextAddressResponse: action.payload,
				nextAddressAccount: action.account,
				errorNextAddress: null
			};
		default:
			neverReached(action);
			return state;
	}
}

const neverReached = (never: never) => { };
