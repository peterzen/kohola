import { BestBlockState } from "./bestblock/types";
import { PingState } from "./ping/types";


export type IApplicationState = {
    ping: PingState,
    bestblock: BestBlockState
}

