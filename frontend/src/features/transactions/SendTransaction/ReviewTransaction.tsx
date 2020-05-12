import _ from "lodash"
import * as React from "react"

import { Form, Table, Accordion, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

import { rawToHex } from "../../../helpers/byteActions"
import { AuthoredTransactionMetadata } from "../models"
import { Amount } from "../../../components/Shared/Amount"
import { TxHash } from "../TransactionHash"
import Address from "../Address"

interface OwnProps {
    txInfo: AuthoredTransactionMetadata
}

export default class ReviewTransaction extends React.Component<OwnProps> {
    render() {
        const txInfo = this.props.txInfo
        return (
            <div>
                <Table borderless className="m-0">
                    <tbody>
                        {txInfo.sourceAccount && (
                            <tr>
                                <th>Source account</th>
                                <td>{txInfo.sourceAccount.getAccountName()}</td>
                            </tr>
                        )}
                        <tr>
                            <th scope="row">Total amount</th>
                            <td>
                                <Amount
                                    amount={txInfo.nonChangeAmount}
                                    showCurrency
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Fee</th>
                            <td>
                                <Amount amount={txInfo.fee} showCurrency />{" "}
                                <span className="text-muted">
                                    ({txInfo.estimatedSignedSize} bytes)
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Inputs (
                                {txInfo.decodedTx.getInputsList().length})
                            </th>
                            <td>
                                <Table borderless className="m-0" size="sm">
                                    <tbody>
                                        {txInfo.decodedTx
                                            .getInputsList()
                                            .map((i) => (
                                                <tr
                                                    key={i.getPreviousTransactionHash_asB64()}>
                                                    <td>
                                                        <TxHash
                                                            hash={i.getPreviousTransactionHash_asU8()}
                                                            truncate={false}
                                                        />
                                                        :
                                                        {i.getPreviousTransactionIndex()}
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "10rem",
                                                        }}>
                                                        <Amount
                                                            amount={i.getAmountIn()}
                                                            showCurrency
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </Table>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                Outputs ({txInfo.nonChangeOutputs.length})
                            </th>
                            <td>
                                <Table className="m-0" size="sm">
                                    <tbody>
                                        {txInfo.nonChangeOutputs.map((o) => {
                                            return (
                                                <tr key={o.address}>
                                                    <td>
                                                        <Address
                                                            address={o.address}
                                                        />
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "10rem",
                                                        }}>
                                                        <Amount
                                                            amount={o.amount}
                                                            showCurrency
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        {txInfo.changeOutput && (
                                            <tr>
                                                <td>
                                                    <Address
                                                        address={
                                                            txInfo.changeOutput
                                                                .address
                                                        }
                                                    />{" "}
                                                    <small className="text-muted">
                                                        (change)
                                                    </small>
                                                </td>
                                                <td>
                                                    <Amount
                                                        amount={
                                                            txInfo.changeOutput
                                                                .amount
                                                        }
                                                        showCurrency
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Accordion>
                    <Accordion.Toggle
                        as={Button}
                        variant="secondary"
                        size="sm"
                        eventKey="0">
                        Unsigned tx <FontAwesomeIcon icon={faCaretDown} />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Form>
                            <Form.Group controlId="unsignedTxHex">
                                <Form.Control
                                    readOnly
                                    as="textarea"
                                    cols="20"
                                    rows="4"
                                    value={rawToHex(txInfo.unsignedTx)}
                                />
                            </Form.Group>
                        </Form>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        )
    }
}
