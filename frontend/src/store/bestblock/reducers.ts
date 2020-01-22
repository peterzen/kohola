
import { BestBlockActionTypes, BestBlockState, GETBESTBLOCK_ATTEMPT, GETBESTBLOCK_FAILED, GETBESTBLOCK_SUCCESS } from './types'
import { BestBlock } from '../../models';

export const initialState: BestBlockState = {
  currentBlock: new BestBlock(),
  getBestBlockHeightRequest: false,
}


export default function bestblock(
  state: BestBlockState = initialState,
  action: BestBlockActionTypes) {

  switch (action.type) {
    case GETBESTBLOCK_ATTEMPT:
      return {
        ...state,
        getBestBlockHeightRequest: true,
      };
    case GETBESTBLOCK_FAILED:
      return {
        ...state,
        getBestBlockHeightRequest: false,
      };
    case GETBESTBLOCK_SUCCESS:
      return {
        ...state,
        getBestBlockHeightRequest: false,
        currentBlock: action.payload
      };
    default:
      return state;
  }
}