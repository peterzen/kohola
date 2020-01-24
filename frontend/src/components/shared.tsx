import { Moment } from "moment";
import { formatTimestamp, reverseHash } from "../helpers";
import React from "react";
import { Transaction } from "../models";
import _ from "lodash";
import { sprintf } from "sprintf-js";



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

	const dcr = props.amount / 100000000;
	const rounding = 2;
	let amount = dcr.toString()
	let decAmount = sprintf("%02.4f", amount)

	let a1 = "", a2 = "";
	let decPointPos = decAmount.indexOf(".");

	a1 = decAmount.substr(0, decPointPos+rounding+1);
	a2 = decAmount.substr(decPointPos + rounding + 1);
	
	if (dcr == 0) {
		amount = a1 = "0";
		a2 = "";
	}
	return (
		<span className="amount" title={amount}><span>{a1}</span><span className="fractions" >{a2}</span></span>
	)
}

interface HashProps {
	hash: Uint8Array
}

export function Hash(props: HashProps) {
	if (!props.hash.length) {
		return null;
	}
	const fmtHash = Buffer.from(props.hash).toString("hex")
	return (
		<span>{fmtHash}</span>
	)
}
