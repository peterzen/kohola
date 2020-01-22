import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import ping from './ping/reducers';
import tickets from "./tickets/reducers";
import accounts from './accounts/reducers'
import bestblock from './bestblock/reducers';
import transactions from "./transactions/reducers";

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        ping,
		tickets,
		accounts,
        bestblock,
		transactions,
    });
}


