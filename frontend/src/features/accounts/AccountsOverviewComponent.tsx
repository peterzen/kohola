import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Amount } from '../../components/Shared/shared';
import { WalletAccountsState } from './accountSlice';
import { IApplicationState } from '../../store/store';


class AccountsOverviewComponent extends React.Component<WalletAccountsState, WalletAccountsState> {

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
						{accounts.map(account => {
							<tr key={account.getAccountNumber()}>
								<td>{account.getAccountName()}</td>
								<td><Amount amount={account.getTotalBalance()} /></td>
							</tr>
						})}
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
