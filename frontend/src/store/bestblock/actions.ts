
import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import { 
    BestBlockActionTypes,
    GETBESTBLOCK_ATTEMPT, GETBESTBLOCK_SUCCESS, GETBESTBLOCK_FAILED 
} from './types';

import { BestBlock } from '../../models';
import { AppError } from '../types';


export function getBestBlockHeightAttempt(): any {
    return function (dispatch: Dispatch<BestBlockActionTypes>, getState: any): Promise<any> {
        const { getBestBlockHeightRequest } = getState().bestblock.getBestBlockHeightRequest;
        if (getBestBlockHeightRequest) {
            return Promise.resolve();
        }
        dispatch({ type: GETBESTBLOCK_ATTEMPT });
        return DcrwalletDatasource.BestBlock()
            .then((resp: BestBlock) => {
                dispatch({ payload: resp, type: GETBESTBLOCK_SUCCESS });
            })
            .catch((error: AppError) => {
                dispatch({ error, type: GETBESTBLOCK_FAILED });
            });
    }
};



