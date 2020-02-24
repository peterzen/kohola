import { IApplicationState } from "./types";

import { pingInitialState } from "./ping/reducers";
import { ticketsInitialState } from "./staking/reducers";
import { accountsInitialState } from "./accounts/reducers";
import { initialState as networkInfoInitialState } from "../features/networkinfo/networkInfoSlice"
import { transactionsInitialState } from "./transactions/reducers";
import { initialState as walletbalanceInitialState } from "../features/walletbalance/walletBalanceSlice";
import { appConfigurationInitialState } from "./appconfiguration/reducers";


const initialState: IApplicationState = {
	ping: pingInitialState,
	staking: ticketsInitialState,
	accounts: accountsInitialState,
	networkinfo: networkInfoInitialState,
	transactions: transactionsInitialState,
	walletbalance: walletbalanceInitialState,
	appconfiguration: appConfigurationInitialState,
}


export default initialState;
