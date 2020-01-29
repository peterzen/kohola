import { Moment } from "moment";
import { formatTimestamp, reverseHash } from "../../helpers";
import React, { useState, useEffect } from "react";
import { Transaction } from "../../models";
import _ from "lodash";
import { sprintf } from "sprintf-js";


import { Button } from 'react-bootstrap';

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
	rounding?: number
	showCurrency?: boolean
}

export function Amount(props: AmountProps) {

	const showCurrency = props.showCurrency || false
	const rounding = props.rounding || 4;
	const dcrAmount = props.amount / 100000000;
	const split = dcrAmount.toFixed(rounding).toString().split(".");
	const head = [split[0], split[1].slice(0, 2)].join(".");
	const tail = split[1].slice(2).replace(/0{1,3}$/, "");
	const negativeZero = (parseFloat(head) === 0) && (dcrAmount < 0);

	return (
		<span className="amount" title={dcrAmount.toString()}>
			<span>{sprintf("%s%02.02f", negativeZero ? '-' : '', head)}</span>
			<span className="fractions" >{tail}</span>&nbsp;
			{showCurrency ? <span className="currency">DCR</span> : ""}
		</span>
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



export function NoRouteMatch() {
	return (
		<div>
			No route match
  		</div>
	)
}






function simulateNetworkRequest() {
	return new Promise(resolve => setTimeout(resolve, 2000));
}

export function LoadingButton(props: {
	label: string,
	loadingLabel: string,
	onClick: any
}) {
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			simulateNetworkRequest().then(() => {
				setLoading(false);
			});
		}
	}, [isLoading]);

	function handleClick() {
		setLoading(true);
		return props.onClick(arguments);
	}

	return (
		<Button
			type="submit"
			variant="primary"
			disabled={isLoading}
			onClick={!isLoading ? handleClick : null}
		>
			{isLoading ? props.loadingLabel : props.label}
		</Button>
	);
}


