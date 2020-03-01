import * as React from 'react';
import _ from 'lodash';

import { Transaction } from "../../models";
import { TransactionHash, Amount } from '../Shared/shared';

import TimeAgo from 'react-timeago';
import { Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
// @ts-ignore
import Fade from 'react-reveal/Fade';

export const TransactionMempoolStatusIcon: any = (props: { isMined: boolean }) => {
	return (
		<span title="In the mempool" className="status-icon">{props.isMined ? "" : <FontAwesomeIcon icon={faClock} />}</span>
	)
}

export default class TransactionTable extends React.Component<TransactionListProps> {

	render() {
		return (
			<div>
				{this.props.items.length > 0 && (
					<Table hover>
						<tbody>
							<Fade fade cascade>
								{this.props.items.map((tx: Transaction) =>
									<tr className="clickable" key={tx.getHash()} onClick={() => this.props.onItemClick(tx)}>
										<td><TransactionMempoolStatusIcon isMined={tx.isMined()} /></td>
										<td><TimeAgo date={tx.getTimestamp().toDate()} /></td>
										<td><Amount amount={tx.getAmount()} /></td>
										<td>{tx.getTypeAsString()}</td>
										<td><TransactionHash tx={tx} /></td>
									</tr>
								)}
							</Fade>
						</tbody>
					</Table>

				)}
				{this.props.items.length < 1 && (
					<Alert variant="info">No transaction yet.</Alert>
				)}
			</div>
		)
	}
}


interface TransactionListProps {
	items: Transaction[],
	onItemClick: (tx: Transaction) => void
}

