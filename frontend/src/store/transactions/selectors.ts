import _ from 'lodash'

import { IApplicationState } from "../types"
import { Transaction } from "../../models"
import { TransactionDirection } from '../../constants'

export const getUnminedTransactions = (state: IApplicationState): Transaction[] => {
	return _.chain(state.transactions.txList)
		.filter((t) => t.isMined() == false)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}

export const getMinedTransactions = (state: IApplicationState): Transaction[] => {
	return _.chain(state.transactions.txList)
		.filter((t) => t.isMined() == true)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}

export const getFilteredTransactions = (state: IApplicationState): Transaction[] => {
	console.log("getFilteredTransactions", state.transactions.activeTypeFilter)
	return _.chain(state.transactions.txList)
		.filter((t) => t.getType() == state.transactions.activeTypeFilter)
		.filter((t) => t.getDirection() == TransactionDirection.TRANSACTION_DIR_RECEIVED || t.getDirection() == TransactionDirection.TRANSACTION_DIR_SENT)
		.orderBy((e) => e.getTimestamp(), "desc")
		.value()
}


export const getTransactions = (state: IApplicationState): Transaction[] => {
	return _.orderBy(state.transactions.txList, (e) => e.getTimestamp(), "desc")
}
