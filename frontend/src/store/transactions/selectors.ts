import _ from 'lodash'

import { IApplicationState } from "../types"
import { Transaction } from "../../models"

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

export const getTransactions = (state: IApplicationState): Transaction[] => {
	return _.orderBy(state.transactions.txList, (e) => e.getTimestamp(), "desc")
}