import { IndexedWalletAccounts, NextAddress, WalletAccount } from "../../models";
import { AppError } from "../types";
import { AccountNotificationsResponse } from "../../proto/api_pb";


export type IAccountsState = WalletAccountsState & NextAddressState

export interface WalletAccountsState {
	readonly accounts: IndexedWalletAccounts,
	readonly getAccountsRequest: boolean,
}

// GetAccounts
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

// NextAddress
export interface NextAddressState {
	readonly getNextAddressRequest: boolean
	readonly nextAddressAccount: WalletAccount | null
	readonly nextAddressResponse: NextAddress | null
	readonly errorNextAddress: AppError | null
}

export const NEXTADDRESSATTEMPT = 'NEXTADDRESSATTEMPT'
export const NEXTADDRESSFAILED = 'NEXTADDRESSFAILED'
export const NEXTADDRESSSUCCESS = 'NEXTADDRESSSUCCESS'

export interface NextAddressAttemptAction {
	type: typeof NEXTADDRESSATTEMPT,
}

export interface NextAddressFailedAction {
	type: typeof NEXTADDRESSFAILED,
	error: AppError
}

export interface NextAddressSuccessAction {
	type: typeof NEXTADDRESSSUCCESS,
	payload: NextAddress,
	account:WalletAccount
}

// AccountNotifications
export const ACCOUNTSNOTIFICATIONS_SUBSCRIBE = 'ACCOUNTSNOTIFICATIONS_SUBSCRIBE'
export const ACCOUNTSNOTIFICATIONS_RECEIVED = 'ACCOUNTSNOTIFICATIONS_RECEIVED'

export interface AccountNotificationsSubscribe {
	type: typeof ACCOUNTSNOTIFICATIONS_SUBSCRIBE,
}

export interface AccountNotificationsReceived {
	type: typeof ACCOUNTSNOTIFICATIONS_RECEIVED,
	payload: AccountNotificationsResponse
}

export type GetAccountsActionTypes =
	GetAccountsAttemptAction |
	GetAccountsFailedAction |
	GetAccountsSuccessAction |
	AccountNotificationsSubscribe |
	AccountNotificationsReceived |
	NextAddressAttemptAction |
	NextAddressFailedAction |
	NextAddressSuccessAction
