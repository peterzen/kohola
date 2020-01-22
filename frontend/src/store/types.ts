import { grpc } from "@improbable-eng/grpc-web";

import { BestBlockState } from "./bestblock/types";
import { PingState } from "./ping/types";
import { WalletAccountsState } from "./accounts/types";

export type IApplicationState = {
    ping: PingState,
    bestblock: BestBlockState,
    accounts: WalletAccountsState
}

export type AppError = {
    status: number | typeof grpc.Code,
    msg: string
}