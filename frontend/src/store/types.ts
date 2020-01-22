
import { grpc } from "@improbable-eng/grpc-web";

import { PingState } from "./ping/types";
import { TicketsState } from "./tickets/types";
import { BestBlockState } from "./bestblock/types";
import { TransactionsState } from "./transactions/types";
import { WalletBalanceState } from "./walletbalance/types";
import { WalletAccountsState } from "./accounts/types";

export type IApplicationState = {
	ping: PingState,
	bestblock: BestBlockState,
	accounts: WalletAccountsState,
	transactions: TransactionsState,
	tickets: TicketsState,
	walletbalance: WalletBalanceState
}

export type AppError = {
	status: number | typeof grpc.Code,
	msg: string
}

export interface IGetState {
	(): IApplicationState
}
