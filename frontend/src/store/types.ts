
import { grpc } from "@improbable-eng/grpc-web";
import { Dispatch, AnyAction } from "redux";

import { PingState } from "./ping/types";
import { StakingState } from "./staking/types";
import { BestBlockState } from "./bestblock/types";
import { TransactionsState } from "./transactions/types";
import { WalletBalanceState } from "./walletbalance/types";
import { WalletAccountsState } from "./accounts/types";
import { NetworkState } from "./network/types";
import { AgendasState } from "./agendas/types";
import { StakeInfoState } from "./stakeinfo/types";
import { VoteChoicesState } from "./votechoices/types";
import { StopAutoBuyerState } from "./stopautobuyer/types";
import { TicketBuyerConfigState } from "./ticketbuyerconfig/types";
import { LoadActiveDataFiltersState } from "./loadactivedatafilters/types";

export type IApplicationState = {
	ping: PingState,
	staking: StakingState,
	bestblock: BestBlockState,
	accounts: WalletAccountsState,
	transactions: TransactionsState,
	walletbalance: WalletBalanceState,
	network: NetworkState,
	agendas: AgendasState,
	stakeinfo: StakeInfoState,
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

