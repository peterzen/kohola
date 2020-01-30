import _ from "lodash"
import { IApplicationState } from "../types"
import { IndexedWalletAccounts, WalletAccount } from "../../models"

export const getAccounts = (state: IApplicationState): IndexedWalletAccounts => {
	return state.accounts.accounts
}

export const getAllAccountNumbers = (state: IApplicationState): number[] => {
	return _.keys(state.accounts.accounts)
}

export const lookupAccount = (state: IApplicationState, accountNumber: number): WalletAccount => {
	return state.accounts.accounts[accountNumber]
}
