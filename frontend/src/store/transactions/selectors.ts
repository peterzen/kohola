import _ from 'lodash'

import { IApplicationState } from "../types"
import { Transaction } from "../../models"

export const getUnminedTransactions = (state: IApplicationState): Transaction[] => {
	return _.orderBy(state.transactions.unminedTx, (e) => e.getTimestamp(), "desc")
}

export const getMinedTransactions = (state: IApplicationState): Transaction[] => {
	return _.orderBy(state.transactions.minedTx, (e) => e.getTimestamp(), "desc")
}

