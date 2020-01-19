import { Moment } from "moment";
import { formatTimestamp, formatAmount } from "../helpers";
import React from "react";
import { Transaction } from "../models";
import _ from "lodash";


interface TimestampProps {
    ts: Moment
}
export function Timestamp(props: TimestampProps) {
    return (
        <span className="timestamp" title={props.ts.format()}>{formatTimestamp(props.ts)}</span>
    )
}

interface TransactionHashProps {
    tx: Transaction
}

export function TransactionHash(props: TransactionHashProps) {
    return (
        <span className="tx-hash" title={props.tx.getHash()}>{_.truncate(props.tx.getHash(), { length: 15 })}</span>
    )
}

interface AmountProps {
    amount: number
}

export function Amount(props: AmountProps) {
    return (
        <span className="amount">{formatAmount(props.amount)}</span>
    )
}