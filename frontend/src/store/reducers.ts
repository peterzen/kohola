import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import ping from './ping/reducers';
import network from './network/reducers'
import staking from "./staking/reducers";
import accounts from './accounts/reducers'
import bestblock from './bestblock/reducers';
import votechoices from './votechoices/reducers'
import transactions from "./transactions/reducers";
import walletbalance from "./walletbalance/reducers";
import stopautobuyer from './stopautobuyer/reducers'
import ticketbuyerconfig from './ticketbuyerconfig/reducers'
import loadactivedatafilters from './loadactivedatafilters/reducers'

export default function createRootReducer(history: History) {
	return combineReducers({
		router: connectRouter(history),
		ping,
		network,
		staking,
		accounts,
		bestblock,
		votechoices,
		transactions,
		walletbalance,
		stopautobuyer,
		ticketbuyerconfig,
		loadactivedatafilters,
	});
}


