import * as React from "react";
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

import { Amount, FiatAmount } from "../../components/Shared/shared";
import { WalletTotals } from "../../models";
import AccountBalancePieChart from "../accounts/AccountBalancePieChart";
import { sprintf } from "sprintf-js";

interface IWalletTotals {
	totals: WalletTotals
}

interface IValueColProps {
	amount: number
	total: number
	label: string
	variant: string
}

const ValueCol = (props: IValueColProps) => {
	const clazz = "spendable spendable-" + props.variant
	const pct = props.amount > 0 ? sprintf("%.1f%%", 100 * props.amount / props.total) : "0%"
	return (
		<Col>
			<h3>{pct}</h3>
			<div>
				<ProgressBar className={clazz} now={100 * props.amount / props.total} />
			</div>
			<p className=" text-muted">{props.label}</p>
			<h4 className="text-right text-muted"><Amount amount={props.amount} rounding={2} showCurrency /></h4>
			{/* <h4 className="text-right text-muted"><FiatAmount amount={props.amount} showCurrency currency="USD" /></h4> */}
		</Col>
	)
}
export default class WalletTotalsComponent extends React.PureComponent<IWalletTotals, {}> {
	render() {
		const totals = this.props.totals
		return (
			<Row>
				<Col>
					<h1><Amount amount={totals.total} /></h1>
					<p className="text-muted text-right">Total DCR</p>
					<h4 className="text-right text-muted"><FiatAmount amount={totals.total} showCurrency currency="USD" /></h4>
				</Col>

				<ValueCol
					label="Spendable"
					amount={totals.spendable}
					total={totals.total}
					variant="spendable"></ValueCol>

				<ValueCol
					label="Immature"
					amount={totals.immature_coinbase + totals.immature_stake}
					total={totals.total}
					variant="immature"></ValueCol>

				<ValueCol
					label="Voting auth"
					amount={totals.votingauth}
					total={totals.total}
					variant="votingauth"></ValueCol>
				
				<ValueCol
					label="Locked"
					amount={totals.locked}
					total={totals.total}
					variant="locked"></ValueCol>
			</Row>
		)
	}
}
