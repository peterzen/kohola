import * as React from 'react';
import _ from 'lodash';

import { Transaction } from "../../models";
import { TransactionHash, Amount } from '../Shared/shared';

import TimeAgo from 'react-timeago';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade';

export const TransactionMempoolStatusIcon: any = (props: { isMined: boolean }) => {
	return (
		<span title="In the mempool" className="status-icon">{props.isMined ? "" : <FontAwesomeIcon icon={faClock} />}</span>
	)
}

export default class TransactionTable extends React.Component<TransactionListProps> {

	renderItem(tx: Transaction) {
		return (
			<tr className="clickable" key={tx.getHash()} onClick={this.clickHandler(tx)}>
				<td><TransactionMempoolStatusIcon isMined={tx.isMined()} /></td>
				<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
				<td><Amount amount={tx.getAmount()} /></td>
				<td>{tx.getTypeAsString()}</td>
				<td><TransactionHash tx={tx} /></td>
			</tr>
		);
	}

	render() {
		const list = this.props.items.map((tx: Transaction) => this.renderItem(tx))
		return (
			<Table hover>
				<tbody>
					{/* <Fade fade cascade> */}
						{list}
					{/* </Fade> */}
				</tbody>
			</Table>
		)
	}

	clickHandler(tx: Transaction) {
		return _.bind((evt: React.MouseEvent) => {
			this.props.onItemClick(tx)
		}, this)
	}
}


interface TransactionListProps {
	items: Transaction[],
	onItemClick: (tx: Transaction) => void
}

