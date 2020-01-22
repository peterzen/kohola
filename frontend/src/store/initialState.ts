import { BestBlock } from "../models";



let initialState = {
    walletrpc: {

        // Ping
        // getPingError: null,
        // getPingRequestAttempt: false,
        // getPingResponse: null,
        // pingTimer: null,

        currentBlock: new BestBlock(),
        getBestBlockHeightRequest: false
        // GetTransactions
        // minedTransactions: Array(),
        // unminedTransactions: Array(),
        // transactions: Array(), // unmined + mined. Calculated on the grpc reducer.
        // maximumTransactionCount: 10,
        // noMoreTransactions: false,
        // transactionsFilter: {
        //     search: null, // The freeform text in the Search box
        //     listDirection: "desc", // asc = oldest -> newest, desc => newest -> oldest
        //     types: [], // desired transaction types (code). All if blank.
        //     direction: null, // direction of desired transactions (sent/received/transfer)
        //     maxAmount: null,
        //     minAmount: null
        // },
        // lastTransaction: null, //last transaction obtained
    }
}


export default initialState;