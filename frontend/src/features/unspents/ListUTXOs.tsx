import * as React from 'react';
import _ from 'lodash';
import { UnspentOutputResponse } from '../../proto/api_pb';
import { Table, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { TxHash, Amount } from '../../components/Shared/shared';
import moment from 'moment';
import TimeAgo from 'react-timeago';

interface ICoinToolsDropdown {
	utxo: UnspentOutputResponse
	menuHandler: (eventKey: string, utxo: UnspentOutputResponse) => void
}

const CoinToolsDropdown = (props: ICoinToolsDropdown) => {
	return (
		<Dropdown
			alignRight
			onSelect={(evtKey: string) => props.menuHandler(evtKey, props.utxo)}
		>
			<Dropdown.Toggle variant="secondary" id="dropdown-utxo">
				<FontAwesomeIcon icon={faEllipsisH} />
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item eventKey={UTXOMenuItems[UTXOMenuItems.UTXO_DETAILS]} >Details</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={UTXOMenuItems[UTXOMenuItems.SPEND_COIN]}>Spend coin</Dropdown.Item>
				<Dropdown.Item eventKey={UTXOMenuItems[UTXOMenuItems.LOCK_UTXO]} disabled>Lock</Dropdown.Item>
				<Dropdown.Item eventKey={UTXOMenuItems[UTXOMenuItems.COPY_ADDRESS]} disabled>Copy address</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export enum UTXOMenuItems {
	SPEND_COIN,
	UTXO_DETAILS,
	LOCK_UTXO,
	COPY_ADDRESS
}


export default class ListUTXOs extends React.Component<Props> {

	render() {
		const utxos = this.props.utxos
		return (
			<div>
				<Table>
					<thead>
						<tr>
							<th>Hash</th>
							<th>Amount</th>
							<th>Tree</th>
							<th>Timestamp</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{utxos.map((utxo) =>
							<tr key={utxo.getTransactionHash_asB64() + utxo.getOutputIndex()}>
								<td><TxHash hash={Buffer.from(utxo.getTransactionHash_asU8())} /></td>
								<td><Amount amount={utxo.getAmount()} /></td>
								<td>{utxo.getTree() == 1 ? 'stake' : 'regular'}</td>
								<td><TimeAgo date={moment.unix(utxo.getReceiveTime()).toDate()} /></td>
								<td>
									<CoinToolsDropdown
										utxo={utxo}
										menuHandler={this.props.menuHandler}
									/>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
		)
	}
}

interface Props {
	utxos: UnspentOutputResponse[]
	menuHandler: (eventKey: string, utxo: UnspentOutputResponse) => void
}

