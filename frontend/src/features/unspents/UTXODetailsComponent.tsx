import * as React from "react";
import moment from 'moment'
import { Table } from 'react-bootstrap'
import TimeAgo from 'react-timeago';

import GenericModalDialog from "../../components/Shared/GenericModalDialog";
import { UnspentOutputResponse } from "../../proto/api_pb";
import { rawHashToHex } from "../../helpers/byteActions";
import { TxHash } from "../../components/Shared/shared";
import { Amount } from "../../components/Shared/Amount";

export const UTXODetailsComponent = (props: IUTXODetailsComponentProps) => {
	const utxo = props.utxo
	if (utxo == null) {
		return null
	}
	return (
		<div>
			<Table borderless>
				<tbody>
					<tr>
						<th>OutPoint</th>
						<td>{rawHashToHex(utxo.getTransactionHash_asU8())}:{utxo.getOutputIndex()}</td>
					</tr>
					<tr>
						<th>Tx ID</th>
						<td><TxHash hash={Buffer.from(utxo.getTransactionHash_asU8())} /></td>
					</tr>
					<tr>
						<th>Amount</th>
						<td><Amount amount={utxo.getAmount()} /></td>
					</tr>
					<tr>
						<th>Timestamp</th>
						<td><TimeAgo date={moment.unix(utxo.getReceiveTime()).toDate()} /></td>
					</tr>
				</tbody>
			</Table>
			{/* <Accordion >
				<Accordion.Toggle as={Button} variant="link" size="sm" eventKey="0">
					Raw JSON <FontAwesomeIcon icon={faCaretDown} />
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="0">
					<pre>{JSON.stringify(tx.toObject(), undefined, "  ")}</pre>
				</Accordion.Collapse>
			</Accordion> */}
		</div>
	)
}

export default class UTXODetailsModal extends GenericModalDialog<IUTXODetailsComponentProps, {}> {
	DialogContent() {
		return (
			<UTXODetailsComponent utxo={this.props.utxo} />
		)
	}
}

interface IUTXODetailsComponentProps {
	utxo: UnspentOutputResponse | null
}


