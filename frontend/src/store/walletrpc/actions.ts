
import DcrwalletDatasource from '../../datasources/dcrwallet';
import { ActionTypes } from './types';
import { Dispatch } from 'redux';


// https://spin.atomicobject.com/2018/11/19/redux-thunk-async-actions/

export function getBestBlockHeightAttempt(): any {
    return function (dispatch: Dispatch, getState: any): void {
        const { getBestBlockHeightRequest } = getState().walletrpc.getBestBlockHeightRequest;
        if (getBestBlockHeightRequest) {
            return;
        }
        dispatch({ type: ActionTypes.GETBESTBLOCK_ATTEMPT });
        DcrwalletDatasource.BestBlock()
            .then(function (resp: any) {
                dispatch({ payload: resp, type: ActionTypes.GETBESTBLOCK_SUCCESS });
            })
            .catch(function (error: any) {
                dispatch({ error, type: ActionTypes.GETBESTBLOCK_FAILED });
            });
    }
};

// export const GETPING_ATTEMPT = "GETPING_ATTEMPT";
// export const GETPING_FAILED = "GETPING_FAILED";
// export const GETPING_SUCCESS = "GETPING_SUCCESS";
// export const GETPING_CANCELED = "GETPING_CANCELED";




// export const getPingAttempt = () => (dispatch, getState) =>
// DcrwalletDatasource.ping(sel.walletService(getState()))
//     .then(() => {
//       const pingTimer = setTimeout(() => dispatch(getPingAttempt()), 10000);
//       dispatch({ pingTimer, type: GETPING_SUCCESS });
//     })
//     .catch(error => {
//       const { daemon: { shutdownRequested, walletError } } = getState();
//       dispatch({ error, type: GETPING_FAILED });
//       if (!shutdownRequested && !walletError) setTimeout(() => { dispatch(pushHistory("/walletError")); }, 1000);
//     });

// export const cancelPingAttempt = () => (dispatch, getState) => {
//   const { pingTimer } = getState().grpc;
//   if (pingTimer) {
//     clearTimeout(pingTimer);
//     dispatch({ type: GETPING_CANCELED });
//   }
// };