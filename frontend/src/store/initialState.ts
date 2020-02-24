
import { pingInitialState } from "./ping/reducers";
import { ticketsInitialState } from "./staking/reducers";
import { accountsInitialState } from "./accounts/reducers";
import { initialState as networkInfoInitialState } from "../features/networkinfo/networkInfoSlice"
import { transactionsInitialState } from "./transactions/reducers";
import { initialState as walletbalanceInitialState } from "../features/walletbalance/walletBalanceSlice";
import { initialState as appConfigurationInitialState } from "../features/appconfiguration/settingsSlice"
import { IApplicationState } from "./store";


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
