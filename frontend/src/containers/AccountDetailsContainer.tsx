
import * as React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter, RouteProps } from 'react-router-dom';

import {
	faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Row, Col, Tabs, Tab, Card } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';

import { history, IApplicationState } from '../store/store'
import { WalletAccounts, IndexedWalletAccounts, WalletAccount } from '../models';
import AccountDetails from '../features/accounts/AccountDetails';

class AccountDetailsContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			account: null
		}
	}
	componentDidMount() {
		console.log("%%%%%%", this.props)
		const accountNumber = this.props.match.params.accountNumber
		this.setState({
			account: this.props.accounts[accountNumber]
		})
	}
	render() {
		console.log("####", this.props)
		if (this.state.account == null) {
			return null
		}
		return (
			<div>
				<h2>
					<Button variant="link" size="lg" onClick={this.handleBack} className="text-muted">
						<FontAwesomeIcon icon={faAngleLeft} />
					</Button>&nbsp;
					Account details: {this.state.account.getAccountName()}</h2>

				<AccountDetails account={this.state.account} />
			</div>
		)
	}

	handleBack() {
		history.goBack()
	}
}


interface OwnProps {
	accounts: IndexedWalletAccounts
}

interface InternalState {
	account: WalletAccount | null
}

type Props = OwnProps & RouteProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.accounts,
	};
}

export default withRouter(connect(mapStateToProps)(AccountDetailsContainer))








