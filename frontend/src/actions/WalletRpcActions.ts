
import DcrwalletDatasource from '../datasources/dcrwallet';


export const GETBESTBLOCK_ATTEMPT = "GETBESTBLOCK_ATTEMPT";
export const GETBESTBLOCK_FAILED = "GETBESTBLOCK_FAILED";
export const GETBESTBLOCK_SUCCESS = "GETBESTBLOCK_SUCCESS";

export function getBestBlockHeightAttempt(cb: any|undefined) {
    return function (dispatch: any, getState: any) {
        const { getBestBlockHeightRequest } = getState().walletrpc;
        if (getBestBlockHeightRequest) {
            return;
        }
        dispatch({ type: GETBESTBLOCK_ATTEMPT });
        DcrwalletDatasource.BestBlock()
            .then(function (resp: any) {
                dispatch({ payload: resp, type: GETBESTBLOCK_SUCCESS });
                if (cb != undefined) {
                    dispatch(cb());
                }
            })
            .catch(function (error: any) {
                dispatch({ error, type: GETBESTBLOCK_FAILED });
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