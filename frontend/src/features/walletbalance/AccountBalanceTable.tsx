import * as React from 'react';
import _ from 'lodash';

import { AccountBalance, IndexedWalletAccounts, WalletAccount, WalletBalance, WalletTotals } from '../../models';

import { Amount } from '../../components/Shared/shared';
import AccountToolsDropdown, { MenuItems } from '../accounts/AccountToolsDropdown';

import { Table, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngleRight,
} from '@fortawesome/free-solid-svg-icons'


export default class AccountBalanceTable extends React.Component<OwnProps, InternalState>{

	renderBalanceRow(props: { account: WalletAccount, balance: AccountBalance }) {
		const { account, balance } = props;
		const immatureAmount = balance.getImmatureStakeGeneration() + balance.getImmatureReward()
		return (
			<tr key={account.getAccountNumber()} className="clickable p-4" onClick={() => {
				this.props.menuHandler(MenuItems[MenuItems.DETAILSVIEW], account)
			}}>
				<td>{account.getAccountName()}</td>
				<td><Amount amount={balance.getSpendable()} /></td>
				<td><Amount amount={balance.getTotal()} /></td>
				<td className="text-secondary"><Amount amount={balance.getUnconfirmed()} /></td>
				<td className="text-secondary"><Amount amount={immatureAmount} /></td>
				<td className="text-secondary"><Amount amount={balance.getVotingAuthority()} /></td>
				<td className="text-secondary"><Amount amount={balance.getLockedByTickets()} /></td>
				<td>
					<Button variant="link" size="lg" className="m-0 p-0" >
						<FontAwesomeIcon icon={faAngleRight} />
					</Button>
				</td>
				{/* <td>
					<AccountToolsDropdown
						account={account}
						menuHandler={this.props.menuHandler} />
				</td> */}
			</tr>
		)
	}

	renderItems() {
		const accounts = this.props.accounts;
		return _.map(this.props.balances, (balance, account) => {
			return this.renderBalanceRow({
				account: accounts[parseInt(account)],
				balance: balance
			})
		});
	}

	renderTotals() {
		const totals = this.props.walletTotals
		return (
			<tr key="totals">
				<th>Total</th>
				<th><Amount amount={totals.spendable} /></th>
				<th><Amount amount={totals.total} /></th>
				<th className="text-secondary"><Amount amount={totals.unconfirmed} /></th>
				<th className="text-secondary"><Amount amount={totals.immature_coinbase + totals.immature_stake} /></th>
				<th className="text-secondary"><Amount amount={totals.votingauth} /></th>
				<th className="text-secondary"><Amount amount={totals.locked} /></th>
				<th></th>
			</tr>
		)
	}

	render() {
		return (
			<Table hover>
				<thead>
					<tr>
						<th></th>
						<th>spendable</th>
						<th>total</th>
						<th className="text-secondary">unconf'd</th>
						<th className="text-secondary">immature<br /><small>stake/reward</small></th>
						<th className="text-secondary">voting<br />authority</th>
						<th className="text-secondary">locked</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{this.renderItems()}
				</tbody>
				<tfoot>
					{this.renderTotals()}
				</tfoot>
			</Table>
		)
	}
}




interface OwnProps {
	accounts: IndexedWalletAccounts,
	balances: WalletBalance,
	walletTotals: WalletTotals,
	menuHandler: (evtKey: string, account: WalletAccount) => void
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps

interface InternalState {
}

