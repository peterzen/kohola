import { createSlice, PayloadAction, ActionCreator } from '@reduxjs/toolkit'
import { WalletBalance } from "../../models";
import { AppError } from '../../store/types';
import LorcaBackend from '../../datasources/lorca';
import { AppThunk } from '../../store/store';
import { getAllAccountNumbers } from '../accounts/accountSlice';


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
