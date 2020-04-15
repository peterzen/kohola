import * as React from "react"

import TimeAgo from "react-timeago"
import { Table, Accordion, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

import { Ticket } from "../../middleware/models"
import { TicketStatusIcon } from "./TicketStatusIcon"
import { Amount } from "../../components/Shared/Amount"
import TransactionHash from "../transactions/TransactionHash"
import Address from "../transactions/Address"
import Block from "../transactions/Block"

export default class TicketDetailsComponent extends React.Component<OwnProps>{
    render() {
        if (this.props.ticket == null) {
            return null
        }
        const ticket = this.props.ticket
        const tx = ticket.getTx()
        return (
            <div>
                <Table borderless>
                    <tbody>
                        <tr>
                            <th>Status</th>
                            <td>
                                <TicketStatusIcon status={ticket.getStatus()} />{" "}
                                {ticket.getStatusLabel()}
                            </td>
                        </tr>
                        <tr>
                            <th>Mined in block</th>
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
                                <TimeAgo date={tx.getTimestamp().toDate()} />
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
                        variant="link"
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
    ticket: Ticket | null
}
