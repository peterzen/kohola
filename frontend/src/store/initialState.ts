import { IApplicationState } from "./types";

import { pingInitialState } from "./ping/reducers";
import { ticketsInitialState } from "./staking/reducers";
import { accountsInitialState } from "./accounts/reducers";
import { bestblockInitialState } from "./bestblock/reducers";
import { transactionsInitialState } from "./transactions/reducers";
import { walletbalanceInitialState } from "./walletbalance/reducers";


const initialState: IApplicationState = {
	ping: pingInitialState,
	tickets: ticketsInitialState,
	accounts: accountsInitialState,
	bestblock: bestblockInitialState,
	transactions: transactionsInitialState,
	walletbalance: walletbalanceInitialState
}


export default initialState;
