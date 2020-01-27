import { IApplicationState } from "../types";
import { WalletBalance } from "../../models";



export const getWalletBalances = (state: IApplicationState): WalletBalance => {
	return state.walletbalance.balances
}
