import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import ping from './ping/reducers';
import staking from "./staking/reducers";
import accounts from './accounts/reducers'
import bestblock from './bestblock/reducers';
import transactions from "./transactions/reducers";
import walletbalance from "./walletbalance/reducers";

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        ping,
		staking,
		accounts,
        bestblock,
		transactions,
		walletbalance
    });
}


