
import { grpc } from "@improbable-eng/grpc-web";
import { Dispatch, AnyAction } from "redux";

import { PingState } from "./ping/types";
import { IStakingState } from "./staking/types";
import { INetworkInfoState } from "./networkinfo/types";
import { TransactionsState } from "./transactions/types";
import { WalletBalanceState } from "./walletbalance/types";
import { WalletAccountsState } from "./accounts/types";
import { VoteChoicesState } from "./votechoices/types";
import { StopAutoBuyerState } from "./stopautobuyer/types";
import { TicketBuyerConfigState } from "./ticketbuyerconfig/types";
import { LoadActiveDataFiltersState } from "./loadactivedatafilters/types";

export type IApplicationState = {
	ping: PingState,
	staking: IStakingState,
	networkinfo: INetworkInfoState,
	accounts: WalletAccountsState,
	transactions: TransactionsState,
	walletbalance: WalletBalanceState,
	votechoices: VoteChoicesState,
	stopautobuyer: StopAutoBuyerState,
	ticketbuyerconfig: TicketBuyerConfigState,
	loadactivedatafilters: LoadActiveDataFiltersState,
}

export type AppError = {
	status: number | typeof grpc.Code,
	msg: string
}

export interface IGetState {
	(): IApplicationState
}

export interface IActionCreator {
	(dispatch?: Dispatch<AnyAction>, getState?: IGetState): any
}

