import * as React from "react";
import { Container, Row, Col } from 'react-bootstrap';

import { Amount } from "../Shared/shared";
import { WalletTotals } from "../../models";

interface IWalletTotals {
	totals: WalletTotals
}

export default class WalletTotalsComponent extends React.Component<IWalletTotals, {}> {
	render() {
		const totals = this.props.totals
		return (
			<Row>
				<Col>
					<h2><Amount amount={totals.total} /></h2>
					<h6 className="text-muted">Total DCR</h6>
				</Col>
				<Col>
					<h2><Amount amount={totals.spendable} /></h2>
					<h6 className="text-muted">Spendable DCR</h6>
				</Col>
				<Col>
					<h2><Amount amount={totals.immature_stake} /></h2>
					<h6 className="text-muted">Immature stake DCR</h6>
				</Col>
				<Col>
					<h2><Amount amount={totals.votingauth} /></h2>
					<h6 className="text-muted">Voting auth DCR</h6>
				</Col>
			</Row>
		)
	}
}
