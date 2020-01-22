import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
    GetAccountsActionTypes,
    GETACCOUNTS_ATTEMPT, GETACCOUNTS_SUCCESS, GETACCOUNTS_FAILED,
} from './types';

import { WalletAccounts } from '../../models';
import { AppError } from '../types';


export function getAccountsAttempt(): any {
    return function (dispatch: Dispatch<GetAccountsActionTypes>, getState: any): void {
        const { getBestBlockHeightRequest } = getState().bestblock.getBestBlockHeightRequest;
        if (getBestBlockHeightRequest) {
            return;
        }
        dispatch({ type: GETACCOUNTS_ATTEMPT });
        DcrwalletDatasource.Accounts()
            .then((resp: WalletAccounts) => {
                dispatch({ payload: resp.getAccountsList(), type: GETACCOUNTS_SUCCESS });
            })
            .catch((error: AppError) => {
                dispatch({ error, type: GETACCOUNTS_FAILED });
            });
    }
};



