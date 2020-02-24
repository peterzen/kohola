
import { grpc } from "@improbable-eng/grpc-web";

import { PingState } from "./ping/types";
import { IStakingState } from "./staking/types";
import { IAccountsState } from "./accounts/types";
import { INetworkInfoState } from "./networkinfo/types";
import { ITransactionState } from "./transactions/types";
import { IAppConfigurationState } from "./appconfiguration/types";
import { sprintf } from "sprintf-js";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { IWalletBalanceState } from "../features/walletbalance/walletBalanceSlice";
import { IApplicationState } from "./store";

// export type IApplicationState = {
// 	ping: PingState,
// 	staking: IStakingState,
// 	networkinfo: INetworkInfoState,
// 	accounts: IAccountsState,
// 	transactions: ITransactionState,
// 	walletbalance: IWalletBalanceState,
// 	votechoices: VoteChoicesState,
// 	stopautobuyer: StopAutoBuyerState,
// 	appconfiguration: IAppConfigurationState,
// 	ticketbuyerconfig: TicketBuyerConfigState,
// 	loadactivedatafilters: LoadActiveDataFiltersState,
// }

export type AppError = {
	status: number | typeof grpc.Code,
	msg: string
}

export class GenericError {
	public code: number
	public msg: string
	constructor(code: number, msg: string) {
		this.code = code
		this.msg = msg
	}
	toString() {
		return sprintf("[%d] %s", this.code, this.msg)
	}
}

export interface IGetState {
	(): IApplicationState
}


export interface ILorcaMessage {
	error: {
		code: number
		msg: string
	}
	payload: Uint8Array
	apayload: Uint8Array[]
}
