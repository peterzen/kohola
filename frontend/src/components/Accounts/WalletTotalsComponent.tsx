import * as React from "react";
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';

import { Amount, FiatAmount } from "../Shared/shared";
import { WalletTotals } from "../../models";
import AccountBalancePieChart from "./AccountBalancePieChart";
import { sprintf } from "sprintf-js";

interface IWalletTotals {
	totals: WalletTotals
}

const ValueCol = (props: { amount: number, total: number, label: string, variant: string }) => {
	const clazz = "spendable spendable-" + props.variant
	const pct = sprintf("%.1f%%", 100 * props.amount / props.total)
	return (
		<Col>
			<h1>{pct}</h1>
			<div>
				<ProgressBar className={clazz} now={100 * props.amount / props.total} />
			</div>
			<p className=" text-muted">{props.label}</p>
			<h4 className="text-right text-muted"><Amount amount={props.amount} showCurrency /></h4>
			<h4 className="text-right text-muted"><FiatAmount amount={props.amount} showCurrency currency="USD" /></h4>
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
					<div>
						<ProgressBar className="spendable spendable-total" now={100} />
					</div>
					<p className="text-muted">Total DCR</p>
					<h4 className="text-right text-muted"><Amount amount={totals.total} showCurrency /></h4>
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
					label="Locked"
					amount={totals.votingauth}
					total={totals.total}
					variant="locked"></ValueCol>
			</Row>
		)
	}
}
