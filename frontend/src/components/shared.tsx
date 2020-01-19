import { Moment } from "moment";
import { formatTimestamp } from "../helpers";
import React from "react";
import { Transaction } from "../models";
import _ from "lodash";


interface TimestampProps {
    ts: Moment
}
export function Timestamp(props: TimestampProps) {
    return (
        <span title={props.ts.format()}>{formatTimestamp(props.ts)}</span>
    )
}

interface TransactionHashProps {
    tx: Transaction
}

export function TransactionHash(props: TransactionHashProps) {
    return (
        <span title={props.tx.getHash()}>{_.truncate(props.tx.getHash(), { length: 15 })}</span>
    )
}