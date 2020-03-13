import React from "react";

import { sprintf } from "sprintf-js";

import "./Amount.scss"
import { ATOMS_DIVISOR } from "../../constants";

interface AmountProps {
	amount: number
	rounding?: number
	currency?: string
	showCurrency?: boolean
}

export function Amount(props: AmountProps) {

	const showCurrency = props.showCurrency || false
	const rounding = props.rounding || 4;
	const dcrAmount = props.amount / ATOMS_DIVISOR;
	const split = dcrAmount.toFixed(rounding).toString().split(".");
	const head = [split[0], split[1].slice(0, 2)].join(".");
	const tail = split[1].slice(2).replace(/0{1,3}$/, "");
	const negativeZero = (parseFloat(head) === 0) && (dcrAmount < 0);

	return (
		<span className="amount" title={dcrAmount.toString()}>
			<span>{sprintf("%s%02.02f", negativeZero ? '-' : '', head)}</span>
			<span className="fractions" >{tail}</span>
			{showCurrency ? <span className="currency"> DCR</span> : ""}
		</span>
	)
}


export function FiatAmount(props: AmountProps) {

	// @TODO hook this up to exchange rate server backend
	const MOCK_EXCHANGE_RATE = 21;

	const showCurrency = props.showCurrency || false
	const rounding = props.rounding || 4;
	const dcrAmount = props.amount / ATOMS_DIVISOR * MOCK_EXCHANGE_RATE
	const split = dcrAmount.toFixed(rounding).toString().split(".");
	const head = [split[0], split[1].slice(0, 2)].join(".");
	const negativeZero = (parseFloat(head) === 0) && (dcrAmount < 0);

	return (
		<span className="amount" title={dcrAmount.toString()}>
			<span>{sprintf("%s%2f", negativeZero ? '-' : '', head)}</span>&nbsp;
			{showCurrency ? <span className="currency">{props.currency}</span> : ""}
		</span>
	)
}
