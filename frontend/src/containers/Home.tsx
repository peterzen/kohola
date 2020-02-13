import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Nav, Tabs, Tab, Card } from "react-bootstrap";
import Fade from 'react-reveal/Fade';

import RecentTransactions from '../components/Transactions/RecentTransactionsContainer';
import { IApplicationState } from "../store/types";
import WalletBalanceContainer from "../components/Accounts/WalletBalanceContainer";
import ListUTXOs from "../components/Accounts/ListUTXOs";

class Home extends React.Component {

	render() {
		return (
			<div >
				<Fade><WalletBalanceContainer /></Fade>
				<div className="mt-3" />
				<Tabs defaultActiveKey="transactions" id="uncontrolled-tab">
					<Tab eventKey="transactions" title="Transactions">
						<RecentTransactions />
					</Tab>
					<Tab eventKey="coins" title="Coins">
						<Fade fade>
							<Card>
								<Card.Body>
									<Card.Title>UTXOs</Card.Title>
								</Card.Body>
								<ListUTXOs />
							</Card>
						</Fade>
					</Tab>
				</Tabs>
			</div>
		)
	}
}


const mapStateToProps = function (state: IApplicationState, ownProps: any) {

	return state
}

export default withRouter(connect(mapStateToProps)(Home));
