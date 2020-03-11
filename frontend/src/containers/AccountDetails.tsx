
import * as React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter, RouteChildrenProps } from 'react-router-dom';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Alert, Col, Row, Tabs, Tab } from 'react-bootstrap';

import { WalletAccount, Transaction } from '../models';
import AccountBalanceTotals from '../features/balances/AccountBalanceTotals';
import GetNewAddressDialog from '../features/balances/GetNewAddressDialog';
import UTXOContainer from '../features/unspents/UTXOContainer';
import SendTransaction from '../features/transactions/SendTransaction';
import { IApplicationState } from '../store/types';
import { getAccountTransactions } from '../features/transactions/transactionsSlice';
import RecentTransactions from '../features/transactions/RecentTransactionsContainer';

class AccountDetails extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			showNewAddressModal: false,
		}
	}

	render() {
		if (this.props.match == null) {
			return null
		}
		const account = this.props.lookupAccount(parseInt(this.props.match.params.accountNumber))
		return (
			<div>
				{account != null && (
					<div>
						<Row>
							<Col xs={8}>
								<h2>
									<Button variant="link"
										size="lg"
										onClick={() => this.handleBack()}
										className="text-muted">
										<FontAwesomeIcon icon={faChevronLeft} />
									</Button>&nbsp;
									Account: {account.getAccountName()}
								</h2>
							</Col>
							<Col xs={4} className="text-right">
								<SendTransaction defaultAccount={account} />&nbsp;
								<Button variant="primary"
									onClick={() => this.showReceiveDialog(account)}
								>Receive</Button>
							</Col>
						</Row>

						<Card>
							<Card.Body>
								<AccountBalanceTotals account={account} />
							</Card.Body>
						</Card>
						<div className="mt-3">
							<Tabs
								id="accountdetails-tabs"
								defaultActiveKey="transactions"
								mountOnEnter={true}
								unmountOnExit={false}
							>
								<Tab eventKey="transactions" title="Recent transactions">
									<RecentTransactions
										txList={this.props.txList(account)}
										showAccount={false} />
								</Tab>
								<Tab eventKey="utxo" title="UTXOs">
									<Card>
										<Card.Body>
											<Card.Title>UTXOs</Card.Title>
										</Card.Body>
										<UTXOContainer account={account} />
									</Card>
								</Tab>
							</Tabs>
						</div>
						<GetNewAddressDialog
							modalTitle="New receive address"
							show={this.state.showNewAddressModal}
							account={account}
							onHide={() => this.setState({ showNewAddressModal: false })} />
					</div>
				)}
				{account == null && (
					<Alert variant="danger">Account not found</Alert>
				)}
			</div>
		)
	}

	handleBack() {
		this.props.history.goBack()
	}
	showModal() {
		this.setState({ showNewAddressModal: true })
	}
	showReceiveDialog(account: WalletAccount) {
		this.showModal();
	}
}

interface OwnProps {
	txList: (account: WalletAccount) => Transaction[]
	lookupAccount: (accountNumber: number) => WalletAccount
}

interface InternalState {
	showNewAddressModal: boolean
}

interface DispatchProps {
}

type Props = OwnProps & DispatchProps & RouteChildrenProps<{ accountNumber: string }>

const mapStateToProps = (state: IApplicationState) => {
	return {
		lookupAccount: (accountNumber: number) => state.accounts.accounts[accountNumber],
		txList: (account: WalletAccount) => getAccountTransactions(state, account)
	}
}

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDetails))








