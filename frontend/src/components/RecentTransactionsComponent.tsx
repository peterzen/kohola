import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { Transaction } from "../models";
import { formatTxType } from '../helpers';
import { Timestamp, TransactionHash, Amount } from './shared';
import { IApplicationState } from '../store/types';
import { TransactionsState } from '../store/transactions/types';


interface TransactionListProps {
	items: Transaction[]
}

interface TransactionListItemProps {
	tx: Transaction
}

export function TransactionListItem(props: TransactionListItemProps) {
	const tx = props.tx;
	return (
		<tr>
			<td><Timestamp ts={tx.getTimestamp()} /></td>
			<td><Amount amount={tx.getAmount()} /></td>
			<td>{formatTxType(tx.getType())}</td>
			<td><TransactionHash tx={tx} /></td>
		</tr>
	);
}

export function TransactionList(props: TransactionListProps) {
	const list = props.items.map((tx: Transaction) => {
		return (
			<TransactionListItem tx={tx} key={tx.getHash()} />
		)
	});
	return (
		<table>
			<tbody>
				{list}
			</tbody>
		</table>
	)
}

class RecentTransactionsComponent extends React.Component<TransactionsState, TransactionsState> {

	render() {
		const
			unminedTxList = this.props.unminedTx,
			minedTxList = this.props.minedTx;
		return (
			<div>
				<div>
					<h3>Unmined transactions ({unminedTxList.length})</h3>
					<TransactionList items={unminedTxList} />
				</div>
				<div>
					<h3>Mined transactions ({minedTxList.length})</h3>
					<TransactionList items={minedTxList} />
				</div>
			</div>
		)
	}
}

const mapStateToProps = function (state: IApplicationState, ownProps: any) {
	return {
		unminedTx: state.transactions.unminedTx,
		minedTx: state.transactions.unminedTx
	};
}

export default withRouter(connect(mapStateToProps, {
})(RecentTransactionsComponent));
