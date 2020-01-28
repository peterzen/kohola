import _ from "lodash"
import { IApplicationState } from "../types"
import { IndexedWalletAccounts } from "../../models"

export const getAccounts = (state: IApplicationState): IndexedWalletAccounts => {
	return state.accounts.accounts
}

export const getAllAccountNumbers = (state: IApplicationState): number[] => {
	return _.keys(state.accounts.accounts)
}

