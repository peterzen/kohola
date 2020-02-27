
import * as React from 'react';
import _ from 'lodash';

import {
	faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tabs, Tab, Card } from 'react-bootstrap';

import { WalletAccount } from '../../models';
import ListUTXOs from '../unspents/ListUTXOs';
import Fade from 'react-reveal/Fade';
import RecentTransactions from '../../components/Transactions/RecentTransactionsContainer';
import { connect } from 'react-redux';
import { IApplicationState } from '../../store/store';
import { fetchUnspentsAttempt } from '../unspents/unspentsSlice';

class AccountDetails extends React.Component<Props, {}> {
	componentWillMount() {
		this.props.dispatch(fetchUnspentsAttempt(this.props.account.getAccountNumber()))
	}
	render() {
		const account = this.props.account
		return (
			<div>
				<Tabs defaultActiveKey="transactions" id="uncontrolled-tab">
					<Tab eventKey="transactions" title="Transactions">
						<Fade fade>
							<RecentTransactions account={account}/>
						</Fade>
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




type Props = OwnProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.accounts,
	};
}

export default connect(mapStateToProps)(AccountDetails)

