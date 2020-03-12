import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'

import app from '../features/app/appSlice'
import staking from '../features/staking/stakingSlice'
import accounts from '../features/balances/accountSlice'
import networkinfo from '../features/app/networkinfo/networkInfoSlice'
import transactions from '../features/transactions/transactionsSlice'
import walletbalance from '../features/balances/walletBalanceSlice'
import unspentoutputs from '../features/unspents/unspentsSlice'
import appconfiguration from '../features/appconfiguration/settingsSlice'
import { History } from "history";

export default function createRootReducer(history: History<History.PoorMansUnknown>) {
	return combineReducers({
		router: connectRouter(history),
		app,
		staking,
		accounts,
		networkinfo,
		transactions,
		walletbalance,
		unspentoutputs,
		appconfiguration,
	});
}

