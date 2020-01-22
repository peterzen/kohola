
import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import { 
    BestBlockActionTypes,
    GETBESTBLOCK_ATTEMPT, GETBESTBLOCK_SUCCESS, GETBESTBLOCK_FAILED 
} from './types';

import { BestBlock } from '../../models';


export function getBestBlockHeightAttempt(): any {
    return function (dispatch: Dispatch<BestBlockActionTypes>, getState: any): void {
        const { getBestBlockHeightRequest } = getState().bestblock.getBestBlockHeightRequest;
        if (getBestBlockHeightRequest) {
            return;
        }
        dispatch({ type: GETBESTBLOCK_ATTEMPT });
        DcrwalletDatasource.BestBlock()
            .then((resp: BestBlock) => {
                dispatch({ payload: resp, type: GETBESTBLOCK_SUCCESS });
            })
            .catch((error: object) => {
                dispatch({ error, type: GETBESTBLOCK_FAILED });
            });
    }
};



