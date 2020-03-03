
import { initialState as pingInitialState } from '../features/networkinfo/pingSlice',
import { initialState as ticketsInitialState } from '../features/staking/stakingSlice'
import { initialState as accountsInitialState } from '../features/accounts/accountSlice'
import { initialState as networkInfoInitialState } from "../features/networkinfo/networkInfoSlice"
import { transactionsInitialState } from "./transactions/reducers";
import { initialState as walletbalanceInitialState } from "../features/walletbalance/walletBalanceSlice";
import { initialState as appConfigurationInitialState } from "../features/appconfiguration/settingsSlice"
import { initialState as unspentoutputsInitialState } from '../features/unspents/unspentsSlice'
import { IApplicationState } from "./store";


const initialState: IApplicationState = {
	ping: pingInitialState,
	staking: ticketsInitialState,
	accounts: accountsInitialState,
	networkinfo: networkInfoInitialState,
	transactions: transactionsInitialState,
	walletbalance: walletbalanceInitialState,
	unspentoutputs: unspentoutputsInitialState,
	appconfiguration: appConfigurationInitialState,
}


export default initialState;
