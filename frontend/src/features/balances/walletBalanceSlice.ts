import _ from 'lodash';

import { createSlice, PayloadAction, ActionCreator } from '@reduxjs/toolkit'

import { WalletBalance, WalletTotals } from "../../models";
import { AppError, AppThunk, IApplicationState } from '../../store/types';
import LorcaBackend from '../../datasources/lorca';
import { getAllAccountNumbers, isAccountVisible } from './accountSlice';


export interface IWalletBalanceState {
	readonly balances: WalletBalance,
	readonly getBalanceAttempting: boolean,
	readonly error: AppError | null,
}

export const initialState: IWalletBalanceState = {
	balances: {},
	getBalanceAttempting: false,
	error: null
}

const walletBalanceSlice = createSlice({
	name: "walletBalanceDisplay",
	initialState,
	reducers: {
		getBalanceAttempt(state) {
			state.getBalanceAttempting = true
		},
		getBalanceFailed(state, action: PayloadAction<AppError>) {
			state.getBalanceAttempting = false
			state.error = action.payload
		},
		getBalanceSuccess(state, action: PayloadAction<WalletBalance>) {
			state.getBalanceAttempting = false
			state.balances = action.payload
			state.error = null
		}
	}
})


export const {
	getBalanceAttempt,
	getBalanceFailed,
	getBalanceSuccess,
} = walletBalanceSlice.actions

export default walletBalanceSlice.reducer


export const loadWalletBalance: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {
		if (getState().walletbalance.getBalanceAttempting) {
			return
		}

		dispatch(getBalanceAttempt())
		const accountNumbers = getAllAccountNumbers(getState());
		try {
			const resp = await LorcaBackend.fetchWalletBalance(accountNumbers) as WalletBalance
			dispatch(getBalanceSuccess(resp));
		}
		catch (error) {
			dispatch(getBalanceFailed(error))
		}
	}
}


// selectors
export const getWalletBalances = (state: IApplicationState): WalletBalance => {
	return _.filter(state.walletbalance.balances, (balance, accountNumber: string) => isAccountVisible(state, parseInt(accountNumber)))
}

export const getAccountBalance = (state: IApplicationState, accountNumber: number) => {
	const acc = getWalletBalances(state)[accountNumber]
	if (acc == undefined) {
		throw new Error("non-existent account")
	}
	return acc
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


