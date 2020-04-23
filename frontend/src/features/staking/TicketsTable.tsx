import * as React from "react"
import _ from "lodash"

import TimeAgo from "react-timeago"
import { Table } from "react-bootstrap"
// @ts-ignore
import Fade from "react-reveal/Fade"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import { Ticket } from "../../middleware/models"
import { TicketStatusIcon } from "./TicketStatusIcon"
import { transitionGroupProps } from "../../constants"
import TransactionHash from "../transactions/TransactionHash"
import { RectShape, TextBlock } from "react-placeholder/lib/placeholders"

export default class TicketsTable extends React.PureComponent<TicketsTableProps> {
    render() {
        return (
            <Table hover>
                {this.props.items.length > 0 && (
                    <TransitionGroup
                        {...transitionGroupProps}
                        component="tbody"
                    >
                        {this.props.items.map((ticket) => {
                            const tx = ticket.getTx()
                            return (
                                <CSSTransition
                                    key={tx.getHash()}
                                    timeout={500}
                                    classNames="shrink"
                                >
                                    <tr
                                        className="clickable"
                                        onClick={() =>
                                            this.props.onItemClick(ticket)
                                        }
                                    >
                                        <td>
                                            <TicketStatusIcon
                                                status={ticket.getStatus()}
                                            />
                                        </td>
                                        <td>
                                            <TimeAgo
                                                date={tx
                                                    .getTimestamp()
                                                    .toDate()}
                                            />
                                        </td>
                                        <td>
                                            <TransactionHash tx={tx} />
                                        </td>
                                    </tr>
                                </CSSTransition>
                            )
                        })}
                    </TransitionGroup>
                )}
            </Table>
        )
    }
}

interface TicketsTableProps {
    items: Ticket[]
    onItemClick: (ticket: Ticket) => void
}

export const TicketsTablePlaceHolder = (
    <div>
        <RectShape style={{ width: 30, height: 80 }} />
        <TextBlock color="#ddd"  rows={7} />
    </div>
)
