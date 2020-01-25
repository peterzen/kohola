import { IApplicationState } from "./types";

import { pingInitialState } from "./ping/reducers";
import { ticketsInitialState } from "./staking/reducers";
import { networkInitialState } from "./network/reducers";
import { accountsInitialState } from "./accounts/reducers";
import { bestblockInitialState } from "./bestblock/reducers";
import { stakeinfoInitialState } from "./stakeinfo/reducers";
import { votechoicesInitialState } from "./votechoices/reducers";
import { transactionsInitialState } from "./transactions/reducers";
import { walletbalanceInitialState } from "./walletbalance/reducers";
import { stopautobuyerInitialState } from "./stopautobuyer/reducers";
import { ticketbuyerconfigInitialState } from "./ticketbuyerconfig/reducers";
import { loadactivedatafiltersInitialState } from "./loadactivedatafilters/reducers";


const initialState: IApplicationState = {
	ping: pingInitialState,
	staking: ticketsInitialState,
	network: networkInitialState,
	accounts: accountsInitialState,
	bestblock: bestblockInitialState,
	votechoices: votechoicesInitialState,
	transactions: transactionsInitialState,
	walletbalance: walletbalanceInitialState,
	stopautobuyer: stopautobuyerInitialState,
	ticketbuyerconfig: ticketbuyerconfigInitialState,
	loadactivedatafilters: loadactivedatafiltersInitialState,
}


export default initialState;
