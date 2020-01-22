import { BestBlock } from "../../models";

// https://redux.js.org/recipes/usage-with-typescript



export interface WalletrpcState {
  readonly currentBlock: BestBlock
  readonly getBestBlockHeightRequest: boolean
}


export const enum ActionTypes {
  GETBESTBLOCK_ATTEMPT,
  GETBESTBLOCK_FAILED,
  GETBESTBLOCK_SUCCESS,
}

export interface GetBestBlockAttemptAction {
  type: ActionTypes,
  error?: object,
  payload?: BestBlock,
}



export type WalletrpcActionTypes = GetBestBlockAttemptAction
