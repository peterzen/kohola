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

	render() {
		return (
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
		)
	}
}


interface TransactionListProps {
	items: Transaction[],
	onItemClick: (tx: Transaction) => void
}

