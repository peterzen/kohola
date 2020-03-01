import _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { Amount } from '../../components/Shared/shared';
import { WalletAccountsState } from './accountSlice';
import { IApplicationState } from '../../store/store';
import { Table, Button } from 'react-bootstrap';


import {
	faPencilAlt,
	faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class AccountsSetup extends React.Component<WalletAccountsState, WalletAccountsState> {

	render() {
		const accounts = _.values(this.props.accounts);
		return (
			<div>
				<Table>
					<thead>
						<tr>
							<th>account</th>
							<th>visible</th>
						</tr>
					</thead>
					<tbody>
						{accounts.map(account => (
							<tr key={account.getAccountNumber()}>
								<td>
									{account.getAccountName()} <Button variant="link"><FontAwesomeIcon icon={faPencilAlt} /></Button>
								</td>
								<td><input type="checkbox" /></td>
							</tr>
						))}
					</tbody>
				</Table>
				<Button variant="outline-secondary" size="sm">
					<FontAwesomeIcon icon={faPlus} /> Add account...
				</Button>
			</div>
		)
	}
}

const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		accounts: state.accounts.accounts
	};
}

export default connect(mapStateToProps)(AccountsSetup);
