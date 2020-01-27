import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IWalletBalanceState } from '../store/walletbalance/types';
import { IApplicationState } from '../store/types';
import { AccountBalance, WalletAccounts, IndexedWalletAccounts, WalletAccount } from '../models';
import { Amount } from './shared';
import { loadWalletBalance } from '../store/walletbalance/actions';

import { Table } from 'react-bootstrap';
import { getAccounts } from '../store/accounts/selectors';
import { getWalletBalances } from '../store/walletbalance/selectors';
import AccountToolsDropdown from './AccountToolsDropdown';
import { Dispatch } from 'redux';
import { showNewAddressDialog } from '../store/actions';
import NewAddressModal from './NewAddressModal';

interface IBalanceProps {
	account: WalletAccount,
	balance: AccountBalance
}

class WalletBalanceComponent extends React.Component<Props, InternalState>{

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
					<AccountToolsDropdown account={account} menuHandler={this.props.menuHandler} />
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
				<NewAddressModal show={false}  />
			</div>
		)
	}
	componentDidMount() {
		this.props.loadData();
		// this.props.dispatch(loadWalletBalance())
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
	// propFromParent: number
}

interface DispatchProps {
	menuHandler: (evtKey: string, account: WalletAccount) => void,
	newAddress: (account: WalletAccount) => void,
	loadData: () => void
}

type Props = IWalletBalanceState & DispatchProps & IWalletBalanceOwnProps

interface InternalState {
	// internalComponentStateField: string
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	menuHandler: (evtKey: string, account: WalletAccount) => {
		switch (evtKey) {
			case 'newaddress':
				NewAddressModal.handleShow()
		}
	},
	newAddress: (account: WalletAccount) => {
		dispatch(showNewAddressDialog(account))
	},
	loadData: () => {
		dispatch(loadWalletBalance())
	}
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletBalanceComponent));
