import { BestBlock } from "../models";



let initialState = {
    ping: {
        getPingError: null,
        getPingRequestAttempt: false,
        getPingResponse: null,
        pingTimer: null,
    },

    bestblock: {
        currentBlock: new BestBlock(),
        getBestBlockHeightRequest: false
    },
}


export default initialState;