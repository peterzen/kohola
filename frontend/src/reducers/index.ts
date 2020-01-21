
import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import walletrpc from './walletrpc';

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        walletrpc
    });
}


