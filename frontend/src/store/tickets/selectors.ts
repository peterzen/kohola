import _ from 'lodash'

import { IApplicationState } from "../types"
import { Ticket } from "../../models"

export const getTickets = (state: IApplicationState): Ticket[] => {
	return _.orderBy(state.tickets.tickets, (e) => e.getTx().getTimestamp(), "desc")
}

