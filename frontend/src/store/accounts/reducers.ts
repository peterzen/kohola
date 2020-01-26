import {
	WalletAccountsState,
	GetAccountsActionTypes,
	GETACCOUNTS_ATTEMPT, GETACCOUNTS_FAILED, GETACCOUNTS_SUCCESS, ACCOUNTSNOTIFICATIONS_RECEIVED
} from "./types";

export const accountsInitialState: WalletAccountsState = {
	accounts: {},
	getAccountsRequest: false,
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
		case ACCOUNTSNOTIFICATIONS_RECEIVED:
			return {
				...state,
			};
		default:
			return state;
	}
}