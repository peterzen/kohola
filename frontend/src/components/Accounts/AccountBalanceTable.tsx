import * as React from 'react';
import _ from 'lodash';

import { AccountBalance, IndexedWalletAccounts, WalletAccount, WalletBalance } from '../../models';

import { Amount } from '../Shared/shared';
import AccountToolsDropdown from './AccountToolsDropdown';

import { Table } from 'react-bootstrap';

export default class AccountBalanceTable extends React.Component<OwnProps, InternalState>{

	renderBalanceRow(props: { account: WalletAccount, balance: AccountBalance }) {
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
						menuHandler={this.props.menuHandler} />
				</td>
			</tr>
		)
	}

	renderItems(): any {
		const accounts = this.props.accounts;
		return _.map(this.props.balances, (balance, account) => {
			return this.renderBalanceRow({
				account: accounts[account],
				balance: balance
			})
		});
	}

	render() {
		return (
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
		)
	}
}




interface OwnProps {
	accounts: IndexedWalletAccounts,
	balances: WalletBalance,
	menuHandler: (evtKey: string, account: WalletAccount) => void
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps

interface InternalState {
}

