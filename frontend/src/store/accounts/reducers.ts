import { WalletAccounts } from "../../models";
import {
    WalletAccountsState,
    GetAccountsActionTypes,
    GETACCOUNTS_ATTEMPT, GETACCOUNTS_FAILED, GETACCOUNTS_SUCCESS
} from "./types";


export const initialState: WalletAccountsState = {
    accounts: [],
    getAccountsRequest: false,
}


export default function accounts(
    state: WalletAccountsState = initialState,
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
        default:
            return state;
    }
}