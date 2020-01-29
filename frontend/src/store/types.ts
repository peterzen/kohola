
import { grpc } from "@improbable-eng/grpc-web";

import { PingState } from "./ping/types";
import { IStakingState } from "./staking/types";
import { IAccountsState } from "./accounts/types";
import { INetworkInfoState } from "./networkinfo/types";
import { ITransactionState } from "./transactions/types";
import { IWalletBalanceState } from "./walletbalance/types";
import { VoteChoicesState } from "./votechoices/types";
import { StopAutoBuyerState } from "./stopautobuyer/types";
import { TicketBuyerConfigState } from "./ticketbuyerconfig/types";
import { LoadActiveDataFiltersState } from "./loadactivedatafilters/types";
import { sprintf } from "sprintf-js";

export type IApplicationState = {
	ping: PingState,
	staking: IStakingState,
	networkinfo: INetworkInfoState,
	accounts: IAccountsState,
	transactions: ITransactionState,
	walletbalance: IWalletBalanceState,
	votechoices: VoteChoicesState,
	stopautobuyer: StopAutoBuyerState,
	ticketbuyerconfig: TicketBuyerConfigState,
	loadactivedatafilters: LoadActiveDataFiltersState,
}

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
