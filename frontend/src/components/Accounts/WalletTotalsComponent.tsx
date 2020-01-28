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
			<Container>
				<Row>
					<Col>
						<h2><Amount amount={totals.total} /></h2>
						<h6>Total DCR</h6>
					</Col>
					<Col>
						<h2><Amount amount={totals.spendable} /></h2>
						<h6>Spendable DCR</h6>
					</Col>
					<Col>
						<h2><Amount amount={totals.immature_stake} /></h2>
						<h6>Immature stake DCR</h6>
					</Col>
					<Col>
						<h2><Amount amount={totals.votingauth} /></h2>
						<h6>Voting auth DCR</h6>
					</Col>
				</Row>

			</Container>
		)
	}
}
