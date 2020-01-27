import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { Transaction } from "../models";
import { TransactionHash, Amount } from './shared';
import { IApplicationState } from '../store/types';
import { TransactionsState } from '../store/transactions/types';
import { getTransactions, getFilteredTransactions } from '../store/transactions/selectors';
import { loadTransactionsAttempt } from '../store/transactions/actions';

import TimeAgo from 'react-timeago';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

interface ITransactionMempoolStatusIcon {
	isMined: boolean
}

export const TransactionMempoolStatusIcon: any = (props: ITransactionMempoolStatusIcon) => {
	return (
		<span title="In the mempool" className="status-icon">{props.isMined ? "" : <FontAwesomeIcon icon={faClock} />}</span>
	)
}

export function TransactionListItem(props: TransactionListItemProps) {
	const tx = props.tx;
	return (
		<tr>
			<td><TransactionMempoolStatusIcon isMined={tx.isMined()} /></td>
			<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
			<td><Amount amount={tx.getAmount()} /></td>
			<td>{tx.getTypeAsString()}</td>
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
		<Table hover>
			<tbody>
				{list}
			</tbody>
		</Table>
	)
}

class RecentTransactionsComponent extends React.Component<Props, InternalState> {

	render() {
		const
			txList = this.props.txList;
		return (
			<div>
				<h3>Recent transactions ({txList.length})</h3>
				<TransactionList items={txList} />
			</div>
		)
	}
	componentDidMount() {
		this.props.dispatch(loadTransactionsAttempt())

	}
}

const mapStateToProps = (state: IApplicationState, ownProps: RecentTransactionsOwnProps): Props => {
	return {
		...state.transactions,
		txList: getFilteredTransactions(state),
	}
}

export default withRouter(connect(mapStateToProps)(RecentTransactionsComponent));

export interface RecentTransactionsOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = TransactionsState & DispatchProps & RecentTransactionsOwnProps

interface InternalState {
	// internalComponentStateField: string
}


interface TransactionListProps {
	items: Transaction[]
}

interface TransactionListItemProps {
	tx: Transaction
}
