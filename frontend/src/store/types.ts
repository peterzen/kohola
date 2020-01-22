import { grpc } from "@improbable-eng/grpc-web";

import { BestBlockState } from "./bestblock/types";
import { PingState } from "./ping/types";
import { WalletAccountsState } from "./accounts/types";
import { TransactionsState } from "./transactions/types";
import { TicketsState } from "./tickets/types";

export type IApplicationState = {
	ping: PingState,
	bestblock: BestBlockState,
	accounts: WalletAccountsState,
	transactions: TransactionsState,
	tickets: TicketsState
}

export type AppError = {
	status: number | typeof grpc.Code,
	msg: string
}

export interface IGetState {
	(): IApplicationState
}
