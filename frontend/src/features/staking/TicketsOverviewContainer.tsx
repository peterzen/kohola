import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import { Ticket } from '../../models';
import { getTickets } from './stakingSlice';
import { TicketStatus } from '../../constants';
import { IApplicationState } from '../../store/store';

import TicketsTable from './TicketsTable';
import TicketDetailsModal from './TicketDetailsComponent';


interface ITicketsListFilterDropdownProps {
	menuHandler: (eventKey: string) => void
}

const TicketsListFilterDropdown = (props: ITicketsListFilterDropdownProps) => {
	return (
		<Dropdown
			alignRight
			onSelect={(evtKey: string) => props.menuHandler(evtKey)}
		>
			<Dropdown.Toggle variant="secondary" id="ticket-filter-dropdown">
				<FontAwesomeIcon icon={faFilter} />
			</Dropdown.Toggle>

			<Dropdown.Menu>
				<Dropdown.Header>Filter tickets</Dropdown.Header>
				<Dropdown.Divider />
				<Dropdown.Item eventKey="-1">All</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item eventKey={TicketStatus.LIVE.toString()}>Live</Dropdown.Item>
				<Dropdown.Item eventKey={TicketStatus.IMMATURE.toString()}>Immature</Dropdown.Item>
				<Dropdown.Item eventKey={TicketStatus.MISSED.toString()}>Missed</Dropdown.Item>
				<Dropdown.Item eventKey={TicketStatus.REVOKED.toString()}>Revoked</Dropdown.Item>
				<Dropdown.Item eventKey={TicketStatus.VOTED.toString()}>Voted</Dropdown.Item>
				<Dropdown.Item eventKey={TicketStatus.UNMINED.toString()}>Unmined</Dropdown.Item>
				<Dropdown.Item eventKey={TicketStatus.EXPIRED.toString()}>Expired</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}



class TicketsOverviewContainer extends React.Component<OwnProps, InternalState> {
	constructor(props: OwnProps) {
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

interface InternalState {
	showModal: boolean
	currentFilter: TicketStatus
	selectedItem: Ticket | null
}

export default connect(mapStateToProps)(TicketsOverviewContainer)
