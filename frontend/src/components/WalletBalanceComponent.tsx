import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import { getAccounts } from '../store/accounts/selectors';
import { loadWalletBalance } from '../store/walletbalance/actions';
import { getWalletBalances } from '../store/walletbalance/selectors';
import { IApplicationState } from '../store/types';
import { IWalletBalanceState } from '../store/walletbalance/types';
import { AccountBalance, IndexedWalletAccounts, WalletAccount } from '../models';

import { Amount } from './Shared/shared';
import GetNewAddressDialog from './GetNewAddressDialog';
import AccountToolsDropdown from './AccountToolsDropdown';

import { Table } from 'react-bootstrap';

interface IBalanceProps {
	account: WalletAccount,
	balance: AccountBalance
}

class WalletBalanceComponent extends React.Component<Props, InternalState>{

	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			selectedAccount: null
		}
		this.menuHandler = this.menuHandler.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.showModal = this.showModal.bind(this);
	}

	renderAccountBalance(props: IBalanceProps) {
		const { account, balance } = props;
		return (
			<tr key={account.getAccountNumber()}>
				<td>{account.getAccountName()}</td>
				<td><Amount amount={balance.getUnconfirmed()} /></td>
				<td><Amount amount={balance.getImmatureStakeGeneration()} /></td>
				<td><Amount amount={balance.getVotingAuthority()} /></td>
				<td><Amount amount={balance.getLockedByTickets()} /></td>
				<td><Amount amount={balance.getSpendable()} /></td>
				<td><Amount amount={balance.getTotal()} /></td>
				<td>
					<AccountToolsDropdown
						account={account}
						menuHandler={this.menuHandler} />
				</td>
			</tr>
		)
	}

	renderItems(): any {
		const accounts = this.props.accounts;
		return _.map(this.props.balances, (balance, account) => {
			return this.renderAccountBalance({
				account: accounts[account],
				balance: balance
			})
		});
	}

	render() {
		return (
			<div>
				<Table striped hover>
					<thead>
						<tr>
							<th></th>
							<th>unconfirmed</th>
							<th>immature stake</th>
							<th>votingauth</th>
							<th>locked</th>
							<th>spendable</th>
							<th>total</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.renderItems()}
					</tbody>
				</Table>
				<GetNewAddressDialog
					account={this.state.selectedAccount}
					modalTitle="Get new address"
					show={this.state.showModal}
					onHide={this.hideModal} />
			</div>
		)
	}
	componentDidMount() {
		this.props.loadData();
	}
	showModal() {
		this.setState({
			showModal: true
		})
	}
	hideModal() {
		this.setState({
			showModal: false
		})
	}
	menuHandler(evtKey: string, account: WalletAccount) {
		switch (evtKey) {
			case 'newaddress':
				this.setState({ selectedAccount: account })
				this.showModal();
				break;
		}
	}
}



const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.walletbalance,
		accounts: getAccounts(state),
		balances: getWalletBalances(state),
	};
}



export interface IWalletBalanceOwnProps {
	accounts: IndexedWalletAccounts
}

interface DispatchProps {
	loadData: () => void
}

type Props = IWalletBalanceState & DispatchProps & IWalletBalanceOwnProps

interface InternalState {
	showModal: boolean
	selectedAccount: WalletAccount | null
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	loadData: () => {
		dispatch(loadWalletBalance())
	}
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletBalanceComponent));
