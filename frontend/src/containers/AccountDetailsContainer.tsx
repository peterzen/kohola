
import * as React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter, RouteChildrenProps } from 'react-router-dom';

import {
	faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Col, Tabs, Tab, Card, Alert } from 'react-bootstrap';

import { IApplicationState } from '../store/store'
import { IndexedWalletAccounts, WalletAccount, WalletBalance } from '../models';
import AccountDetails from '../features/accounts/AccountDetails';
import AccountTotals from '../features/accounts/AccountTotals';

class AccountDetailsContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			account: null
		}
	}
	componentDidMount() {
		if (this.props.match == null) {
			return
		}
		const accountNumber = this.props.match.params.accountNumber
		if (accountNumber == undefined || parseInt(accountNumber) == undefined) {
			return
		}
		this.setState({
			account: this.props.accounts[parseInt(accountNumber)]
		})
	}
	render() {
		return (
			<div>
				{this.state.account == null && (
					<Alert variant="danger">Account not found</Alert>
				)}
				{this.state.account != null && (
					<div>
						<h2>
							<Button variant="link" size="lg" onClick={_.bind(this.handleBack, this)} className="text-muted">
								<FontAwesomeIcon icon={faChevronLeft} />
							</Button>&nbsp;
							Account details: {this.state.account.getAccountName()}</h2>
						<Card>
							<Card.Body>
								<AccountTotals account={this.state.account} />
							</Card.Body>
						</Card>
						<div className="mt-3">
							<AccountDetails account={this.state.account} />
						</div>
					</div>
				)}
			</div>
		)
	}

	handleBack() {
		this.props.history.goBack()
	}
}


interface OwnProps {
	accounts: IndexedWalletAccounts
}

interface InternalState {
	account: WalletAccount | null
}

type Props = OwnProps & RouteChildrenProps<{ accountNumber: string }>

const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.accounts,
	};
}

export default withRouter(connect(mapStateToProps)(AccountDetailsContainer))








