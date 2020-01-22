import { IApplicationState } from "./types";

import { transactionsInitialState } from "./transactions/reducers";
import { pingInitialState } from "./ping/reducers";
import { bestblockInitialState } from "./bestblock/reducers";
import { accountsInitialState } from "./accounts/reducers";


const initialState: IApplicationState = {
	ping: pingInitialState,
	bestblock: bestblockInitialState,
	accounts: accountsInitialState,
	transactions: transactionsInitialState
}


export default initialState;
