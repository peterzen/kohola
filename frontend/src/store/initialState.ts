import { IApplicationState } from "./types";

import { pingInitialState } from "./ping/reducers";
import { ticketsInitialState } from "./staking/reducers";
import { accountsInitialState } from "./accounts/reducers";
import { networkInfoInitialState } from "./networkinfo/reducers";
import { votechoicesInitialState } from "./votechoices/reducers";
import { transactionsInitialState } from "./transactions/reducers";
import { walletbalanceInitialState } from "./walletbalance/reducers";
import { stopautobuyerInitialState } from "./stopautobuyer/reducers";
import { ticketbuyerconfigInitialState } from "./ticketbuyerconfig/reducers";
import { loadactivedatafiltersInitialState } from "./loadactivedatafilters/reducers";


const initialState: IApplicationState = {
	ping: pingInitialState,
	staking: ticketsInitialState,
	accounts: accountsInitialState,
	networkinfo: networkInfoInitialState,
	votechoices: votechoicesInitialState,
	transactions: transactionsInitialState,
	walletbalance: walletbalanceInitialState,
	stopautobuyer: stopautobuyerInitialState,
	ticketbuyerconfig: ticketbuyerconfigInitialState,
	loadactivedatafilters: loadactivedatafiltersInitialState,
}


export default initialState;
