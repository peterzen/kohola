import * as React from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import LorcaBackend from '../../datasources/lorca';
import { UnspentOutputResponse } from '../../proto/api_pb';
import { Table, Dropdown } from 'react-bootstrap';
import WalletTotalsComponent from './WalletTotalsComponent';
import { WalletAccount } from '../../models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const CoinToolsDropdown = (props: { }) => {
	return (
		<Dropdown
			alignRight
			// onSelect={(evtKey: string) => props.menuHandler(evtKey, props.account)}
		>
			<Dropdown.Toggle variant="light" id="dropdown-coins">
				<FontAwesomeIcon icon={faEllipsisH} />
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Item eventKey={""}>Spend coin</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={""} disabled>Details</Dropdown.Item>
				<Dropdown.Item eventKey={""} disabled>Lock</Dropdown.Item>
				<Dropdown.Item eventKey={""} disabled>Copy address</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}


export default class ListUTXOs extends React.Component<{ }, { unspents: UnspentOutputResponse[] }> {

	unspent: []

	constructor(props) {
		super(props)
		// this.unspent = [{
		// 	"transactionHash": "JZJ2aFpIKlUUXLV0H7j1xTOurgnpz2laNIEv2BO2tQI=",
		// 	"outputIndex": 0,
		// 	"amount": 3880416280,
		// 	"pkScript": "dqkUYjG27mKZXv/OX0mtu+mmaRRNj06IrA==",
		// 	"receiveTime": 1581411554,
		// 	"fromCoinbase": false,
		// 	"tree": 0,
		// 	"amountSum": 3880416280
		// }]
		// this.state = {
		// 	unspents: [u, u, u]
		// }
	}

	render() {
		return (
			<div>
				<Table>
					<thead>
						<tr>
							<th>Hash</th>
							<th>Amount</th>
							<th>OutIndex</th>
							<th>Timestamp</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{/* {this.state.unspents.map((r: UnspentOutputResponse) => ( */}

							<td>JZJ2aFpIKlUUXLV0H7j1xTOurgnpz2laNIEv2BO2tQI</td>
							<td>0.3880416280</td>
							<td>0</td>
							<td>4 days ago</td>
							<td>
								<CoinToolsDropdown />
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		)
	}

	componentDidMount() {
		// this.props.unspents = [
		// new UnspentOutputResponse
		// ]
		const props = this.props
		const setState = this.setState


		// LorcaBackend.unspentOutputs(new WalletAccount(0), 1000, 1, true)
		// 	.then((r) => {
		// 		debugger
		// 		setState({ u: r })
		// 	})
	}
}

