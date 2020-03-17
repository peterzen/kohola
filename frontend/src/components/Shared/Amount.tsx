import React from "react";
import { connect } from "react-redux";
import { sprintf } from "sprintf-js";

import "./Amount.scss"
import { ATOMS_DIVISOR } from "../../constants";
import { AppDispatch, IApplicationState } from "../../store/types";
import { getCurrentExchangeRate } from "../../features/app/exchangerateSlice";
import { AltCurrencyRates } from "../../proto/dcrwalletgui_pb";

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

class _FiatAmount extends React.Component<FiatAmountProps>{

	render() {

		const exchangeRate = this.props.getCurrentExchangeRate("usd")

		if (exchangeRate == undefined) {
			return null
		}

		const showCurrency = this.props.showCurrency || false
		const rounding = this.props.rounding || 4;
		const dcrAmount = this.props.amount / ATOMS_DIVISOR * exchangeRate
		const split = dcrAmount.toFixed(rounding).toString().split(".");
		const head = [split[0], split[1].slice(0, 2)].join(".");
		const negativeZero = (parseFloat(head) === 0) && (dcrAmount < 0);

		return (
			<span className="amount" title={dcrAmount.toString()}>
				<span>{sprintf("%s%2f", negativeZero ? '-' : '', head)}</span>&nbsp;
				{showCurrency ? <span className="currency">{this.props.currency}</span> : ""}
			</span>
		)
	}
}



interface FiatAmountOwnProps {

}

interface FiatAmountDispatchProps {
	currentRates: AltCurrencyRates
	getCurrentExchangeRate: (currencyCode: string) => number
}

const mapStateToProps = (state: IApplicationState) => {
	return {
		currentRates:state.exchangerates.currentRates,
		getCurrentExchangeRate: (currencyCode: string) => {
			const r = getCurrentExchangeRate(state, currencyCode)
			return r
		}
	}
}

type FiatAmountProps = AmountProps & FiatAmountOwnProps & FiatAmountDispatchProps
export const FiatAmount = connect(mapStateToProps)(_FiatAmount)

