import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { Ticket } from '../../models';
import { getTickets } from './stakingSlice';
import { TicketStatus } from '../../constants';
import TicketsTable from './TicketsTable';
import TicketDetailsModal from './TicketDetailsComponent';
import { IApplicationState } from "../../store/types";


interface ITicketsListFilterDropdownProps {
	menuHandler: (eventKey: string) => void
}

interface TicketsListFilterDropdownState {
	selected: number
}

interface IMenuItems {
	[status: number]: string
}

const menuItems: IMenuItems = {}
menuItems[-1] = "All"
menuItems[TicketStatus.LIVE] = "Live"
menuItems[TicketStatus.IMMATURE] = "Immature"
menuItems[TicketStatus.MISSED] = "Missed"
menuItems[TicketStatus.REVOKED] = "Revoked"
menuItems[TicketStatus.VOTED] = "Voted"
menuItems[TicketStatus.UNMINED] = "Unmined"
menuItems[TicketStatus.EXPIRED] = "Expired"

class TicketsListFilterDropdown extends React.Component<ITicketsListFilterDropdownProps, TicketsListFilterDropdownState>{
	constructor(props: ITicketsListFilterDropdownProps) {
		super(props)
		this.state = {
			selected: -1
		}
	}
	render() {
		const selected = this.state.selected
		const selectedLabel = menuItems[selected]
		return (
			<Dropdown
				alignRight
				onSelect={(evtKey: string) => this.onSelect(evtKey)}
			>
				<Dropdown.Toggle variant="secondary" id="ticket-filter-dropdown">
					<FontAwesomeIcon icon={faFilter} /> {selectedLabel}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Header>Filter tickets</Dropdown.Header>
					<Dropdown.Divider />
					{_.map(menuItems, (label, status) => (
						<Dropdown.Item eventKey={status} key={status}>
							<span style={{ width: "1.5em" }}>
								{status == selected.toString() && <FontAwesomeIcon icon={faCheck} />}
							</span>
							{label}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		)
	}
	onSelect(value: string) {
		this.setState({
			selected: parseInt(value)
		})
		this.props.menuHandler(value)
	}
}



class TicketsOverviewContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			selectedItem: null,
			currentFilter: -1
		}
	}

	render() {
		return (
			<Card>
				<Card.Body>
					<Card.Title>
						<span className="float-right">
							<TicketsListFilterDropdown menuHandler={_.bind(this.onFilterChange, this)} />
						</span>
						My tickets
					</Card.Title>
				</Card.Body>

				<TicketsTable
					items={this.getFilteredTickets()}
					onItemClick={_.bind(this.itemClickHandler, this)} />

				<TicketDetailsModal
					ticket={this.state.selectedItem}
					modalTitle="Ticket details"
					show={this.state.showModal}
					onHide={() => this.setState({ showModal: false })} />
			</Card>
		)
	}

	getFilteredTickets() {
		if (this.state.currentFilter == -1) {
			return this.props.tickets
		}
		return _.filter(this.props.tickets, (t) => t.getStatus() == this.state.currentFilter)
	}

	onFilterChange(filter: string) {
		this.setState({
			currentFilter: parseInt(filter)
		})
	}

	itemClickHandler(ticket: Ticket) {
		this.setState({
			showModal: true,
			selectedItem: ticket
		})
	}


}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		tickets: getTickets(state),
	}
}

interface OwnProps {
	tickets: Ticket[]
}

interface DispatchProps {
}

interface InternalState {
	showModal: boolean
	currentFilter: TicketStatus
	selectedItem: Ticket | null
}

type Props = OwnProps & DispatchProps



export default connect(mapStateToProps)(TicketsOverviewContainer)
