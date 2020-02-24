import { IApplicationState } from "./types";

import { pingInitialState } from "./ping/reducers";
import { ticketsInitialState } from "./staking/reducers";
import { accountsInitialState } from "./accounts/reducers";
import { initialState as networkInfoInitialState } from "../features/networkinfo/networkInfoSlice"
import { votechoicesInitialState } from "./votechoices/reducers";
import { transactionsInitialState } from "./transactions/reducers";
import { initialState as walletbalanceInitialState } from "../features/walletbalance/walletBalanceSlice";
import { stopautobuyerInitialState } from "./stopautobuyer/reducers";
import { appConfigurationInitialState } from "./appconfiguration/reducers";
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
	appconfiguration: appConfigurationInitialState,
	ticketbuyerconfig: ticketbuyerconfigInitialState,
	loadactivedatafilters: loadactivedatafiltersInitialState,
}


export default initialState;
