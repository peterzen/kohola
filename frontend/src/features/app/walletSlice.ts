import { WalletAccount, IndexedWalletAccounts } from "../../middleware/models"
import _ from "lodash"
import { IApplicationState, AppThunk, AppDispatch, IGetState } from "../../store/types"
import { ActionCreator } from "redux"
import { getAccounts } from "../balances/accountSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface WalletState {
	readonly walletConfiguration: WalletConfiguration
}

export interface WalletConfiguration {
	CSPPServer: string
	CSPPServerCA: string
	MixedAccount: WalletAccount | null
	ChangeAccount: WalletAccount | null
	TicketSplitAccount: WalletAccount | null
	MixedBranch: number
	MixChange: boolean
}

const defaultWalletConfig = {
	CSPPServer: "cspp.decred.org",
	CSPPServerCA: "",
	MixedAccount: null,
	ChangeAccount: null,
	TicketSplitAccount: null,
	MixedBranch: 0,
	MixChange: true,
}

export const initialState: WalletState = {
	walletConfiguration: defaultWalletConfig
}

const walletSlice = createSlice({
	name: "walletSlice",
	initialState,
	reducers: {
		setWalletConfig(state, action: PayloadAction<WalletConfiguration>) {
			state.walletConfiguration = action.payload
		}
	}
})

export const {
	setWalletConfig
} = walletSlice.actions

export default walletSlice.reducer

let walletConfig: WalletConfiguration

// actions
export const loadWalletConfig: ActionCreator<any> = (): AppThunk => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		const accounts = getAccounts(getState())
		walletConfig = _.assign({}, defaultWalletConfig)
		_.each(accounts, (account, accountNumber) => {
			if (account.getAccountName() == "unmixed") {
				walletConfig.ChangeAccount = account
			}
			if (account.getAccountName() == "mixed") {
				walletConfig.MixedAccount = account
			}
		})
		dispatch(setWalletConfig(walletConfig))
	}
}

// selectors
export const getWalletConfig = (state: IApplicationState) => {
	return state.wallet.walletConfiguration
}
