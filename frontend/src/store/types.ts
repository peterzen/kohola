
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

export interface IGetState {
	(): IApplicationState
}
