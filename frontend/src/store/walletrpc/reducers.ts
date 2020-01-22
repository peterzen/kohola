

import { ActionTypes, WalletrpcActionTypes, WalletrpcState } from './types'
import { BestBlock } from '../../models';



export const initialState: WalletrpcState = {
  currentBlock: new BestBlock(),
  getBestBlockHeightRequest: false
}


export default function walletrpc(
  state: WalletrpcState = initialState,
  action: WalletrpcActionTypes) {

  switch (action.type) {
    case ActionTypes.GETBESTBLOCK_ATTEMPT:
      return {
        ...state,
        getBestBlockHeightRequest: true,
      };
    case ActionTypes.GETBESTBLOCK_FAILED:
      return {
        ...state,
        getBestBlockHeightRequest: false,
      };
    case ActionTypes.GETBESTBLOCK_SUCCESS:
      return {
        ...state,
        getBestBlockHeightRequest: false,
        currentBlock: action.payload
      };
    default:
      return state;
  }
}