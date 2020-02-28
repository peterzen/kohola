import { WalletBalance, WalletTotals } from "../../models";
import _ from "lodash";
import { IApplicationState } from "../../store/store";

export const getWalletBalances = (state: IApplicationState): WalletBalance | null => {
	return state.walletbalance.balances
}

export const getWalletTotals = (state: IApplicationState): WalletTotals => {
	const totals = {
		unconfirmed: 0,
		immature_stake: 0,
		immature_coinbase: 0,
		votingauth: 0,
		locked: 0,
		spendable: 0,
		total: 0,
	}
	_.each(getWalletBalances(state), (b) => {
		totals.unconfirmed += b.getUnconfirmed()
		totals.immature_stake += b.getImmatureStakeGeneration()
		totals.immature_coinbase += b.getImmatureReward()
		totals.votingauth += b.getVotingAuthority()
		totals.locked += b.getLockedByTickets()
		totals.spendable += b.getSpendable()
		totals.total += b.getTotal()
	});
	return totals
}


export const getAccountBalance = (state: IApplicationState, accountNumber: number) => {
	const acc = getWalletBalances(state)[accountNumber]
	if (acc == undefined) {
		throw new Error("non-existent account")
	}
	return acc
}
