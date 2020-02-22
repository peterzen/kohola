import _ from 'lodash'

import { IApplicationState } from "../types"
import { Ticket, TicketPrice } from "../../models"

export const getTickets = (state: IApplicationState): Ticket[] => {
	return _.orderBy(state.staking.tickets, (e) => e.getTx().getTimestamp(), "desc")
}

export const getTicketPrice = (state: IApplicationState): TicketPrice => {
	return state.staking.ticketPrice
}
