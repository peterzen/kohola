
import * as React from 'react';
import _ from 'lodash';

import {
	faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tabs, Tab, Card } from 'react-bootstrap';

import { history, IApplicationState } from '../../store/store'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { WalletAccount } from '../../models';
import ListUTXOs from '../unspents/ListUTXOs';
import Fade from 'react-reveal/Fade';
import RecentTransactions from '../../components/Transactions/RecentTransactionsContainer';

export default class AccountDetails extends React.Component<OwnProps, {}> {
	render() {
		const account = this.props.account
		return (
			<div>
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
								<ListUTXOs account={account} />
							</Card>
						</Fade>
					</Tab>
				</Tabs>
			</div>
		)
	}
}


interface OwnProps {
	account: WalletAccount
}





