import { WalletAccount, IndexedWalletAccounts } from "../../models";
import { AppError } from "../types";


export interface WalletAccountsState {
    readonly accounts: IndexedWalletAccounts,
    readonly getAccountsRequest: boolean,
}

export const GETACCOUNTS_ATTEMPT = 'GETACCOUNTS_ATTEMPT'
export const GETACCOUNTS_FAILED = 'GETACCOUNTS_FAILED'
export const GETACCOUNTS_SUCCESS = 'GETACCOUNTS_SUCCESS'

export interface GetAccountsAttemptAction {
    type: typeof GETACCOUNTS_ATTEMPT,
}

export interface GetAccountsFailedAction {
    type: typeof GETACCOUNTS_FAILED,
    error: AppError
}

export interface GetAccountsSuccessAction {
    type: typeof GETACCOUNTS_SUCCESS,
    payload: IndexedWalletAccounts
}

export type GetAccountsActionTypes = GetAccountsAttemptAction | GetAccountsFailedAction | GetAccountsSuccessAction
