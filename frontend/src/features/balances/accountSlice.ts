import _ from 'lodash';

import { createSlice, PayloadAction, ActionCreator } from '@reduxjs/toolkit'
import { IndexedWalletAccounts, WalletAccount, NextAddress } from "../../api/models";
import { AppError, AppThunk, IApplicationState } from '../../store/types';
import LorcaBackend from '../../api/lorca';
import { AccountNotificationsResponse, NextAccountResponse, RenameAccountResponse } from '../../proto/api_pb';
import { loadWalletBalance } from './walletBalanceSlice';
import { getAccountPrefs } from '../appconfiguration/settingsSlice';
import { batch } from 'react-redux';

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

// NextAccount
export interface NextAccountState {
	readonly getNextAccountAttempting: boolean
	readonly nextAccountName: string
	readonly nextAccountResponse: NextAccountResponse | null
	readonly errorNextAccount: AppError | null
}

// RenameAccount
export interface RenameAccountState {
	readonly renameAccountAttempting: Boolean
	readonly renameAccountResponse: RenameAccountResponse | null
	readonly renameAccountName: string
	readonly errorRenameAccount: AppError | null
}


export const initialState: WalletAccountsState & NextAddressState & NextAccountState & RenameAccountState = {
	accounts: {},
	getAccountsAttempting: false,
	getAccountsError: null,

	// NextAddress
	nextAddressAccount: null,
	nextAddressResponse: null,
	getNextAddressAttempting: false,
	errorNextAddress: null,

	// NextAccount
	getNextAccountAttempting: false,
	nextAccountName: "",
	nextAccountResponse: null,
	errorNextAccount: null,

	// RenameAccount
	renameAccountAttempting: false,
	renameAccountName: "",
	renameAccountResponse: null,
	errorRenameAccount: null,
}

const accountSlice = createSlice({
	name: "accountSlice",
	initialState,
	reducers: {
		getAccountsAttempt(state) {
			state.accounts = {}
			state.getAccountsError = null
			state.getAccountsAttempting = true
		},
		getAccountsFailed(state, action: PayloadAction<AppError>) {
			state.accounts = {}
			state.getAccountsError = action.payload
			state.getAccountsAttempting = false
		},
		getAccountsSuccess(state, action: PayloadAction<IndexedWalletAccounts>) {
			state.accounts = action.payload
			state.getAccountsError = null
			state.getAccountsAttempting = false
		},

		// NextAddress
		nextAddressAttempt(state) {
			state.getNextAddressAttempting = true
			state.errorNextAddress = null
		},
		nextAddressFailed(state, action: PayloadAction<AppError>) {
			state.getNextAddressAttempting = false
			state.nextAddressResponse = null
			state.errorNextAddress = action.payload
		},
		nextAddressSuccess(state, action) {
			state.getNextAddressAttempting = false
			state.nextAddressResponse = action.payload.response
			state.nextAddressAccount = action.payload.account
			state.errorNextAddress = null
		},

		// NextAccount
		nextAccountAttempt(state) {
			state.getNextAccountAttempting = true
			state.errorNextAccount = null
		},
		nextAccountFailed(state, action: PayloadAction<AppError>) {
			state.getNextAccountAttempting = false
			state.nextAccountResponse = null
			state.errorNextAccount = action.payload
		},
		nextAccountSuccess(state, action: PayloadAction<NextAccountResponse>) {
			state.getNextAccountAttempting = false
			state.nextAccountResponse = action.payload
			state.errorNextAccount = null
		},

		// RenameAccount
		renameAccountAttempt(state) {
			state.renameAccountAttempting = true
			state.errorRenameAccount = null
		},
		renameAccountFailed(state, action: PayloadAction<AppError>) {
			state.renameAccountAttempting = false
			state.errorRenameAccount = action.payload
		},
		renameAccountSuccess(state, action: PayloadAction<RenameAccountResponse>) {
			state.renameAccountAttempting = false
			state.renameAccountResponse = action.payload
			state.errorRenameAccount = null
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

	nextAccountAttempt,
	nextAccountFailed,
	nextAccountSuccess,

	renameAccountAttempt,
	renameAccountFailed,
	renameAccountSuccess,

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


export const loadAccountsAttempt: ActionCreator<any> = (): AppThunk => {
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


export const accountNotification: ActionCreator<any> = (message: AccountNotificationsResponse): AppThunk => {
	return (dispatch) => {
		batch(() => {
			dispatch(accountNotificationsReceive(message))
			dispatch(loadAccountsAttempt());
			dispatch(loadWalletBalance());
		})
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


export const loadNextAccountAttempt = (accountName: string, passphrase: string): AppThunk => {
	return async (dispatch, getState) => {
		if (getState().accounts.getNextAccountAttempting) {
			return
		}

		dispatch(nextAddressAttempt())
		try {
			const resp = await LorcaBackend.fetchNextAccount(accountName, passphrase)
			dispatch(nextAccountSuccess(resp))
		} catch (error) {
			dispatch(nextAccountFailed(error))
		}
	}
};

export const doRenameAccountAttempt = (account: WalletAccount, newName: string): AppThunk => {
	return async (dispatch, getState) => {
		if (getState().accounts.renameAccountAttempting) {
			return
		}

		dispatch(renameAccountAttempt())
		try {
			const resp = await LorcaBackend.renameAccount(account.getAccountNumber(), newName)
			dispatch(renameAccountSuccess(resp))
		} catch (error) {
			dispatch(renameAccountFailed(error))
		}
	}
};


// Selectors

export const isAccountVisible = (state: IApplicationState, accountNumber: number) => {
	const accountPrefs = getAccountPrefs(state)
	return accountPrefs[accountNumber] ?
		accountPrefs[accountNumber].getIsHidden() == false : true
}

export const getAccounts = (state: IApplicationState): IndexedWalletAccounts => {
	return state.accounts.accounts
}

export const getVisibleAccounts = (state: IApplicationState): IndexedWalletAccounts => {

	const filteredAccounts: IndexedWalletAccounts = {}
	_.each(getAccounts(state), (account, accountNumber) => {
		const n = parseInt(accountNumber)
		if (isAccountVisible(state, n)) {
			filteredAccounts[n] = account
		}
	})
	return filteredAccounts
}

export const getAccountNumbers = (state: IApplicationState): number[] => {
	return _.chain(getAccounts(state))
		.keys()
		.map((s) => parseInt(s))
		.value()
}

export const lookupAccount = (state: IApplicationState, accountNumber: number): WalletAccount => {
	return state.accounts.accounts[accountNumber]
}

export const lookupAccounts = (state: IApplicationState, accountNumbers: number[]): WalletAccount[] => {
	return _.map(accountNumbers, n => state.accounts.accounts[n])
}

