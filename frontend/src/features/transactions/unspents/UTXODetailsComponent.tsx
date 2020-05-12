import * as React from "react"
import moment from "moment"
import { Table } from "react-bootstrap"
import TimeAgo from "react-timeago"

import { Amount } from "../../../components/Shared/Amount"
import { UnspentOutput } from "../../../proto/walletgui_pb"
import { ScriptClass } from "../../../constants"
import { TxHash } from "../TransactionHash"
import Address from "../Address"

export default class UTXODetailsComponent extends React.Component<Props, {}> {
    render() {
        const utxo = this.props.utxo
        if (utxo == null) return null
        return (
            <div>
                <Table borderless>
                    <tbody>
                        <tr>
                            <th>OutPoint</th>
                            <td>
                                <TxHash
                                    hash={utxo.getTransactionHash_asU8()}
                                    truncate={false}
                                />
                                :{utxo.getOutputIndex()}
                            </td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>
                                <Address address={utxo.getAddress()} />
                            </td>
                        </tr>
                        <tr>
                            <th>Amount</th>
                            <td>
                                <Amount
                                    amount={utxo.getAmount()}
                                    showCurrency
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Timestamp</th>
                            <td>
                                <TimeAgo
                                    date={moment
                                        .unix(utxo.getReceiveTime())
                                        .toDate()}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Script class</th>
                            <td>{ScriptClass[utxo.getScriptClass()]}</td>
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
}

interface Props {
    utxo: UnspentOutput | null
}
