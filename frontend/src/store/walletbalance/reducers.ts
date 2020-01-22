import {
	WalletBalanceState, GetBalanceActionTypes,
	GETBALANCE_ATTEMPT, GETBALANCE_FAILED, GETBALANCE_SUCCESS
} from "./types";


export const walletbalanceInitialState: WalletBalanceState = {
	balances: {},
	getBalanceRequest: false,
}

export default function walletbalance(
	state: WalletBalanceState = walletbalanceInitialState,
	action: GetBalanceActionTypes) {

	switch (action.type) {
		case GETBALANCE_ATTEMPT:
			return {
				...state,
				getBalanceRequest: true,
			};
		case GETBALANCE_FAILED:
			return {
				...state,
				getBalanceRequest: false,
			};
		case GETBALANCE_SUCCESS:
			return {
				...state,
				getBalanceRequest: false,
				balances: action.payload
			};
		default:
			return state;
	}
}
