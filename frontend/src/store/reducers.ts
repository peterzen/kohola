import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'

import ping from '../features/networkinfo/pingSlice'
import staking from "./staking/reducers"
import accounts from '../features/accounts/accountSlice'
import networkinfo from '../features/networkinfo/networkInfoSlice'
import transactions from "./transactions/reducers";
import walletbalance from '../features/walletbalance/walletBalanceSlice'
import unspentoutputs from '../features/unspents/unspentsSlice'
import appconfiguration from '../features/appconfiguration/settingsSlice'
import { History } from "history";

export default function createRootReducer(history: History<History.PoorMansUnknown>) {
	return combineReducers({
		router: connectRouter(history),
		ping,
		staking,
		accounts,
		networkinfo,
		transactions,
		walletbalance,
		unspentoutputs,
		appconfiguration,
	});
}

