interface ActionInterface {
    type: string,
    payload: object,
    error: object
}

import {GETBESTBLOCK_ATTEMPT,GETBESTBLOCK_FAILED,GETBESTBLOCK_SUCCESS} from '../actions/WalletRpcActions'

export default function walletrpc(state = {}, action: ActionInterface) {

    switch (action.type) {
        case GETBESTBLOCK_ATTEMPT:
            return {
              ...state,
              getBestBlockHeightRequest: true,
              getAccountNumberError: null
            };
          case GETBESTBLOCK_FAILED:
            return {
              ...state,
              getBestBlockHeightRequest: false,
              getAccountNumberError: error
            };
          case GETBESTBLOCK_SUCCESS:
            return {
              ...state,
              getBestBlockHeightRequest: false,
              getAccountNumberError: null,
              currentBlock: action.payload
            };
    }

    return state;
}