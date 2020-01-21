import BestBlock from "../components/BestBlock";
import { BestBlockResponse } from "../proto/api_pb";

type IState = {
    walletrpc: {
        currentBlock: object
    }
}
let initialState: IState = {
    walletrpc: {

        // Ping
        // getPingError: null,
        // getPingRequestAttempt: false,
        // getPingResponse: null,
        // pingTimer: null,

        currentBlock: new BestBlockResponse(),
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