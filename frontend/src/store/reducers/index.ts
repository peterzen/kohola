
import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import bestblock from '../bestblock/reducers';
import ping from '../ping/reducers';

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        bestblock,
        ping
    });
}


