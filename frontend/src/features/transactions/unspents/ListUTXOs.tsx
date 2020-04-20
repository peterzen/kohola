import * as React from "react"
import _ from "lodash"
import moment from "moment"
import TimeAgo from "react-timeago"
import { Table, Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"

import { Amount } from "../../../components/Shared/Amount"
import { UnspentOutput } from "../../../proto/walletgui_pb"
import { TxHash } from "../TransactionHash"

interface ICoinToolsDropdown {
    utxo: UnspentOutput
    menuHandler: (eventKey: string, utxo: UnspentOutput) => void
}

const CoinToolsDropdown = (props: ICoinToolsDropdown) => {
    return (
        <Dropdown
            alignRight
            onSelect={(evtKey: string) => props.menuHandler(evtKey, props.utxo)}
        >
            <Dropdown.Toggle variant="secondary" id="dropdown-utxo" className="m-0" size="sm">
                <FontAwesomeIcon icon={faEllipsisH} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                    eventKey={UTXOMenuItems[UTXOMenuItems.UTXO_DETAILS]}
                >
                    Details
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                    eventKey={UTXOMenuItems[UTXOMenuItems.SPEND_COIN]}
                >
                    Spend coin
                </Dropdown.Item>
                <Dropdown.Item
                    eventKey={UTXOMenuItems[UTXOMenuItems.LOCK_UTXO]}
                    disabled
                >
                    Lock
                </Dropdown.Item>
                <Dropdown.Item
                    eventKey={UTXOMenuItems[UTXOMenuItems.COPY_ADDRESS]}
                    disabled
                >
                    Copy address
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export enum UTXOMenuItems {
    SPEND_COIN,
    UTXO_DETAILS,
    LOCK_UTXO,
    COPY_ADDRESS,
}

export default class ListUTXOs extends React.Component<Props> {
    render() {
        const utxos = this.props.utxos
        const totalAmount = _.reduce(utxos, (total, utxo) => total + utxo.getAmount(), 0)
        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Outpoint</th>
                            <th>Amount (DCR)</th>
                            <th>Tree</th>
                            <th>Timestamp</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {utxos.map((utxo) => (
                            <tr
                                key={
                                    utxo.getTransactionHash_asB64() +
                                    utxo.getOutputIndex()
                                }
                                className="clickable"
                                onClick={() =>
                                    this.props.menuHandler("default", utxo)
                                }
                            >
                                <td>
                                    <TxHash hash={utxo.getTransactionHash_asU8()} />:{utxo.getOutputIndex()}
                                </td>
                                <td>
                                    <Amount
                                        amount={utxo.getAmount()}
                                        rounding={6}
                                    />
                                </td>
                                <td>
                                    {utxo.getTree() == 1 ? "stake" : "regular"}
                                </td>
                                <td>
                                    <TimeAgo
                                        date={moment
                                            .unix(utxo.getReceiveTime())
                                            .toDate()}
                                    />
                                </td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <CoinToolsDropdown
                                        utxo={utxo}
                                        menuHandler={this.props.menuHandler}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td><strong><Amount amount={totalAmount} /></strong></td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        )
    }
}

interface Props {
    utxos: UnspentOutput[]
    menuHandler: (eventKey: string, utxo: UnspentOutput) => void
}
