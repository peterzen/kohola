// import { combineReducers } from "redux";
import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'

import ping from './ping/reducers';
import staking from "./staking/reducers";
import accounts from './accounts/reducers'
import networkinfo from '../features/networkinfo/networkInfoSlice'
import votechoices from './votechoices/reducers'
import transactions from "./transactions/reducers";
// import walletbalance from "./walletbalance/reducers";
import walletbalance from '../features/walletbalance/walletBalanceSlice'
import stopautobuyer from './stopautobuyer/reducers';
import appconfiguration from './appconfiguration/reducers';
import ticketbuyerconfig from './ticketbuyerconfig/reducers'
import loadactivedatafilters from './loadactivedatafilters/reducers'
import { History } from "history";

export default function createRootReducer(history: History<History.PoorMansUnknown>) {
	return combineReducers({
		router: connectRouter(history),
		ping,
		staking,
		accounts,
		networkinfo,
		votechoices,
		transactions,
		walletbalance,
		stopautobuyer,
		appconfiguration,
		ticketbuyerconfig,
		loadactivedatafilters,
	});
}


// export type RootState = ReturnType<typeof rootReducer>
