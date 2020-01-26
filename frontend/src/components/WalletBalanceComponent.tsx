import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { WalletBalanceState } from '../store/walletbalance/types';
import { IApplicationState } from '../store/types';
import { AccountBalance } from '../models';
import { Amount } from './shared';
import { loadWalletBalance } from '../store/walletbalance/actions';

import { Table } from 'react-bootstrap';

interface IBalanceProps {
	accountNumber: string,
	accountName: string,
	balance: AccountBalance
}

class WalletBalanceComponent extends React.Component<WalletBalanceState, WalletBalanceState>{

	accountBalance(props: IBalanceProps) {
		const { accountName, accountNumber, balance } = props;
		return (
			<tr key={accountNumber}>
				<td>{accountName}</td>
				<td><Amount amount={balance.getUnconfirmed()} /></td>
				<td><Amount amount={balance.getImmatureStakeGeneration()} /></td>
				<td><Amount amount={balance.getVotingAuthority()} /></td>
				<td><Amount amount={balance.getLockedByTickets()} /></td>
				<td><Amount amount={balance.getSpendable()} /></td>
				<td><Amount amount={balance.getTotal()} /></td>
			</tr>
		)
	}

	renderItems(): any {
		const accounts = this.props.accounts;
		return _.map(this.props.balances, (balance, account) => {
			return this.accountBalance({
				accountName: accounts[account].getAccountName(),
				accountNumber: account,
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
						</tr>
					</thead>
					<tbody>
						{this.renderItems()}
					</tbody>
				</Table>
			</div>
		)
	}
	componentDidMount() {
		this.props.dispatch(loadWalletBalance())
	}
}





const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		accounts: state.accounts.accounts,
		balances: state.walletbalance.balances
	};
}
export default withRouter(connect(mapStateToProps)(WalletBalanceComponent));