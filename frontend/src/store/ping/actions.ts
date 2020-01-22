
import { Dispatch } from 'redux';

import DcrwalletDatasource from '../../datasources/dcrwallet';

import {
    PingActionTypes,
    GETPING_SUCCESS, GETPING_FAILED, GETPING_CANCELED
} from './types';
import { WalletPing } from '../../models';

export function getPingAttempt(): any {

    return function (dispatch: Dispatch<PingActionTypes>, getState: any) {
        const pingTimer = setTimeout(() => dispatch(getPingAttempt()), 10000);
        DcrwalletDatasource.Ping()
            .then((resp: WalletPing) => {
                dispatch({ pingTimer, getPingResponse: resp, type: GETPING_SUCCESS });
            })
            .catch((error: object) => {
                dispatch({ error, pingTimer, type: GETPING_FAILED });
            });
    }
}

export function cancelPingAttempt() {
    return function (dispatch: Dispatch<PingActionTypes>, getState: any) {
        const { pingTimer } = getState().ping;
        if (pingTimer) {
            clearTimeout(pingTimer);
            dispatch({ type: GETPING_CANCELED });
        }
    };

}



