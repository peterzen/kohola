import * as React from "react"

import { Table, Accordion, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

import { Transaction } from "../../middleware/models"
import { Timestamp } from "../../components/Shared/shared"
import { Amount } from "../../components/Shared/Amount"
import TransactionHash from "./TransactionHash"
import Address from "./Address"
import Block from "./Block"

export default class TransactionDetailsComponent extends React.Component<OwnProps>{
    render() {
        const tx = this.props.tx
        if (tx == null) {
            return null
        }
        return (
            <div>
                <Table borderless>
                    <tbody>
                        <tr>
                            <th>Type</th>
                            <td>{tx.getTypeAsString()}</td>
                        </tr>
                        <tr>
                            <th>Block</th>
                            <td>
                                <Block block={tx.getBlock()}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Hash</th>
                            <td>
                                <TransactionHash tx={tx} truncate={false} />
                            </td>
                        </tr>
                        <tr>
                            <th>Timestamp</th>
                            <td>
                                <Timestamp ts={tx.getTimestamp()} />
                            </td>
                        </tr>
                        <tr>
                            <th>Amount</th>
                            <td>
                                <Amount
                                    amount={tx.getAmount()}
                                    rounding={8}
                                    showCurrency={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Fee</th>
                            <td>
                                <Amount
                                    amount={tx.getFee()}
                                    rounding={8}
                                    showCurrency={true}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Debit accounts</th>
                            <td>
                                {tx.getDebitsList().map((a) => {
                                    return (
                                        <div
                                            key={
                                                "account-" +
                                                a.getIndex() +
                                                a.getPreviousAccount()
                                            }
                                        >
                                            {a.getPreviousAccount()}:{" "}
                                            {a.getPreviousAccount()} /{" "}
                                            <Amount
                                                showCurrency={true}
                                                amount={a.getPreviousAmount()}
                                            />
                                            <br />
                                        </div>
                                    )
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th>Credit addresses</th>
                            <td>
                                {tx.getCreditsList().map((a) => {
                                    return (
                                        <div key={a.getAddress() + a.getIndex()}>
                                            <Address address={a.getAddress()} />
                                        </div>
                                    )
                                })}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Accordion>
                    <Accordion.Toggle
                        as={Button}
                        variant="secondary"
                        size="sm"
                        eventKey="0"
                    >
                        Raw JSON <FontAwesomeIcon icon={faCaretDown} />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <pre>{JSON.stringify(tx.toObject(), undefined, "  ")}</pre>
                    </Accordion.Collapse>
                </Accordion>
            </div>
        )
    }
}



interface OwnProps {
    tx: Transaction | null
}
