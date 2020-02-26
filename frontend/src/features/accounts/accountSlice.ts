import _ from 'lodash';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IndexedWalletAccounts, WalletAccount, NextAddress } from "../../models";
import { AppError } from '../../store/types';
import LorcaBackend from '../../datasources/lorca';
import { AppThunk, IApplicationState } from '../../store/store';
import { AccountNotificationsResponse } from '../../proto/api_pb';


export interface WalletAccountsState {
	readonly accounts: IndexedWalletAccounts,
	readonly getAccountsAttempting: boolean,
	readonly getAccountsError: AppError | null
}


// NextAddress
export interface NextAddressState {
	readonly getNextAddressAttempting: boolean
	readonly nextAddressAccount: WalletAccount | null
	readonly nextAddressResponse: NextAddress | null
	readonly errorNextAddress: AppError | null
}

export const initialState: WalletAccountsState & NextAddressState = {
	accounts: {},
	getAccountsAttempting: false,
	getAccountsError: null,

	// NextAddress
	nextAddressAccount: null,
	nextAddressResponse: null,
	getNextAddressAttempting: false,
	errorNextAddress: null,
}

const accountSlice = createSlice({
	name: "accountSlice",
	initialState,
	reducers: {
		getAccountsAttempt(state) {
			state.getAccountsAttempting = true
		},
		getAccountsFailed(state, action: PayloadAction<AppError>) {
			state.getAccountsAttempting = false
			state.getAccountsError = action.payload
		},
		getAccountsSuccess(state, action: PayloadAction<IndexedWalletAccounts>) {
			state.getAccountsAttempting = false
			state.accounts = action.payload
		},

		// NextAddress
		nextAddressAttempt(state) {
			state.getNextAddressAttempting = true
			state.errorNextAddress = null
		},
		nextAddressFailed(state, action: PayloadAction<AppError>) {
			state.getNextAddressAttempting = false
			state.errorNextAddress = action.payload
		},
		nextAddressSuccess(state, action) {
			state.getNextAddressAttempting = false
			state.nextAddressResponse = action.payload.response
			state.nextAddressAccount = action.payload.account
			state.errorNextAddress = null
		},

		// AccountNotifications
		accountNotificationsReceive(state, action: PayloadAction<AccountNotificationsResponse>) {
		},
		accountNotificationsSubscribe(state) {
		}
	}
})

export const {
	getAccountsAttempt,
	getAccountsFailed,
	getAccountsSuccess,

	nextAddressAttempt,
	nextAddressFailed,
	nextAddressSuccess,

	accountNotificationsReceive,
	accountNotificationsSubscribe,

} = accountSlice.actions

export default accountSlice.reducer



const mapAccounts = (accounts: WalletAccount[]): IndexedWalletAccounts => {
	const indexedAccounts: IndexedWalletAccounts = {};
	_.each(accounts, (account) => {
		indexedAccounts[account.getAccountNumber()] = account;
	});
	return indexedAccounts;
}


export const loadAccountsAttempt = (): AppThunk => {
	return async (dispatch, getState) => {
		if (getState().accounts.getAccountsAttempting) {
			return
		}
		dispatch(getAccountsAttempt())
		try {
			const resp = await LorcaBackend.fetchAccounts()
			dispatch(getAccountsSuccess(mapAccounts(resp.getAccountsList())))
		}
		catch (error) {
			dispatch(getAccountsFailed(error))
		}
	}
};


export const accountNotification = (message: AccountNotificationsResponse): AppThunk => {
	return (dispatch) => {
		dispatch(accountNotificationsReceive(message))
		dispatch(loadAccountsAttempt());
		dispatch(loadWalletBalance());
	}
}

export const loadNextAddressAttempt = (account: WalletAccount): AppThunk => {
	return async (dispatch, getState) => {
		if (getState().accounts.getNextAddressAttempting) {
			return
		}

		dispatch(nextAddressAttempt())
		try {
			const resp = await LorcaBackend.fetchNextAddress(account, 0, 2)
			dispatch(nextAddressSuccess({
				response: resp,
				account: account
			}))
		} catch (error) {
			dispatch(nextAddressFailed(error))
		}
	}
};


// Selectors
export const getAccounts = (state: IApplicationState): IndexedWalletAccounts => {
	return _.filter(state.accounts.accounts, (r) => r.getAccountName() != "imported")
}

export const getAllAccountNumbers = (state: IApplicationState): number[] => {
	return _.chain(state.accounts.accounts)
		.filter((r) => r.getAccountName() != "imported")
		.keys()
		.map((s) => parseInt(s))
		.value()
}

export const lookupAccount = (state: IApplicationState, accountNumber: number): WalletAccount => {
	return state.accounts.accounts[accountNumber]
}
