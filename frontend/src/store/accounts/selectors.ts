import _ from "lodash"
import { IApplicationState } from "../types"
import { IndexedWalletAccounts, WalletAccount } from "../../models"

export const getAccounts = (state: IApplicationState): IndexedWalletAccounts => {
	return _.filter(state.accounts.accounts, (r)=>r.getAccountName()!="imported")
}

export const getAllAccountNumbers = (state: IApplicationState): number[] => {
	return _.chain(state.accounts.accounts)
		.filter((r)=>r.getAccountName()!="imported")
		.keys()
		.map((s) => parseInt(s))
		.value()

}

export const lookupAccount = (state: IApplicationState, accountNumber: number): WalletAccount => {
	return state.accounts.accounts[accountNumber]
}
