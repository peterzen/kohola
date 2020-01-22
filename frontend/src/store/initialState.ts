import { BestBlock } from "../models";
import { IApplicationState } from "./types";

import { transactionsInitialState } from "./transactions/reducers";



let initialState: IApplicationState = {
	ping: {
		getPingError: "",
		getPingRequestAttempt: false,
		getPingResponse: null,
		pingTimer: null,
	},

	bestblock: {
		currentBlock: new BestBlock(),
		getBestBlockHeightRequest: false
	},

	accounts: {
		accounts: [],
		getAccountsRequest: false
	},

	transactions: transactionsInitialState
}


export default initialState;
