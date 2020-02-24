import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { IApplicationState } from "../../store";
import { WalletAccountsState } from '../../store/accounts/types';
import { WalletAccount } from '../../models';
import { Amount } from '../Shared/shared';


class AccountsOverviewComponent extends React.Component<WalletAccountsState, WalletAccountsState> {

	renderAccountItem(account: WalletAccount) {
		return (
			<tr key={account.getAccountNumber()}>
				<td>{account.getAccountName()}</td>
				<td><Amount amount={account.getTotalBalance()} /></td>
			</tr>
		)
	}

	render() {
		const accounts = _.values(this.props.accounts);
		return (
			<div>
				<h3>Account Overview</h3>
				<table>
					<thead>
						<tr>
							<th>account</th>
							<th>spendable</th>
						</tr>
					</thead>
					<tbody>
						{accounts.map(this.renderAccountItem)}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		accounts: state.accounts.accounts
	};
}

export default connect(mapStateToProps)(AccountsOverviewComponent);
