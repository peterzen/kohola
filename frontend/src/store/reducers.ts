import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'

import ping from './ping/reducers';
import staking from "./staking/reducers";
import accounts from './accounts/reducers'
import networkinfo from '../features/networkinfo/networkInfoSlice'
import transactions from "./transactions/reducers";
import walletbalance from '../features/walletbalance/walletBalanceSlice'
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
		appconfiguration,
	});
}

