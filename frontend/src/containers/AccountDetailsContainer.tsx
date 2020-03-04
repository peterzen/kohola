
import * as React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter, RouteChildrenProps } from 'react-router-dom';

import {
	faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Alert, Col, Row } from 'react-bootstrap';

import { IApplicationState } from '../store/store'
import { IndexedWalletAccounts, WalletAccount } from '../models';
import AccountBalanceTotals from '../features/accounts/AccountBalanceTotals';
import GetNewAddressDialog from '../features/accounts/GetNewAddressDialog';
import { bindActionCreators, Dispatch } from 'redux';
import { loadNextAddressAttempt } from '../features/accounts/accountSlice';
import UTXOContainer from '../features/unspents/UTXOContainer';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import SendTransaction from '../features/transactions/SendTransaction';

class AccountDetailsContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
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
				{this.state.account != null && (
					<div>
						<Row>
							<Col xs={8}>
								<h2>
									<Button variant="link" size="lg" onClick={_.bind(this.handleBack, this)} className="text-muted">
										<FontAwesomeIcon icon={faChevronLeft} />
									</Button>&nbsp;
									Account: {this.state.account.getAccountName()}
								</h2>
							</Col>
							<Col xs={4} className="text-right">
								<SendTransaction defaultAccount={this.state.account} />&nbsp;
								<Button variant="outline-primary" onClick={() => this.showReceiveDialog()}>Receive</Button>
							</Col>
						</Row>

						<Card>
							<Card.Body>
								<AccountBalanceTotals account={this.state.account} />
							</Card.Body>
						</Card>
						<div className="mt-3">
							<Fade fade>
								<Card>
									<Card.Body>
										<Card.Title>UTXOs</Card.Title>
									</Card.Body>
									<UTXOContainer account={this.state.account} />
								</Card>
							</Fade>

						</div>
						<GetNewAddressDialog
							modalTitle="New receive address"
							show={this.state.showModal}
							onHide={_.bind(this.hideModal, this)} />
					</div>
				)}
				{this.state.account == null && (
					<Alert variant="danger">Account not found</Alert>
				)}
			</div>
		)
	}

	handleBack() {
		this.props.history.goBack()
	}

	showModal() {
		this.setState({ showModal: true })
	}
	hideModal() {
		this.setState({ showModal: false })
	}
	showReceiveDialog() {
		if (this.state.account == null) {
			return
		}
		this.props.loadNextAddressAttempt(this.state.account)
		this.showModal();
	}
}


interface OwnProps {
	accounts: IndexedWalletAccounts
}

interface InternalState {
	showModal: boolean
	account: WalletAccount | null
}

interface DispatchProps {
	loadNextAddressAttempt: (account: WalletAccount) => void
}

type Props = OwnProps & DispatchProps & RouteChildrenProps<{ accountNumber: string }>

const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.accounts,
	};
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	loadNextAddressAttempt: loadNextAddressAttempt,
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDetailsContainer))








