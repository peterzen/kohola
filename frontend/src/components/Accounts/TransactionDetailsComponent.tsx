import * as React from "react";

import { Table } from 'react-bootstrap'

import { Transaction } from "../../models";
import { Timestamp, TransactionHash, Amount } from "../Shared/shared";
import { TransactionMempoolStatusIcon } from "./TransactionTable";
import GenericModalDialog from '../Shared/GenericModalDialog';


export const TransactionDetailsComponent = (props: { tx: Transaction }) => {
	const tx = props.tx
	return (
		<Table borderless>
			<tbody>
				<tr>
					<th>Type</th>
					<td>{tx.getTypeAsString()}</td>
				</tr>
				<tr>
					<th>Mined in block</th>
					<td><TransactionMempoolStatusIcon isMined={tx.isMined()} />
						{tx.getBlockHash()}</td>
				</tr>
				<tr>
					<th>Hash</th>
					<td><TransactionHash tx={tx} /></td>
				</tr>
				<tr>
					<th>Timestamp</th>
					<td><Timestamp ts={tx.getTimestamp()} /></td>
				</tr>
				<tr>
					<th>Amount</th>
					<td><Amount amount={tx.getAmount()} /></td>
				</tr>
			</tbody>
		</Table>
	)
}

export default class TransactionDetailsModal extends GenericModalDialog<OwnProps, {}> {
	DialogContent() {
		return (
			<TransactionDetailsComponent tx={this.props.tx} />
		)
	}
}

interface OwnProps {
	tx: Transaction
}



