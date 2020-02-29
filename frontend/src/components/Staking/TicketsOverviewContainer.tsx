import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Ticket } from '../../models';
import { ITicketsState } from '../../store/staking/types';
import { getTickets } from '../../store/staking/selectors';

import TicketsTable from './TicketsTable';
import TicketDetailsModal from './TicketDetailsComponent';
import { Card, Dropdown } from 'react-bootstrap';
import { WidgetOptionsButton } from '../Shared/shared';
// import { Range, getTrackBackground } from 'react-range'
import { IApplicationState } from '../../store/store';

class TicketsOverviewContainer extends React.Component<Props, InternalState> {
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			selectedItem: null
		}
	}
	render() {
		return (
			<Card>
				<Card.Body>
					<Card.Title>
						<span className="float-right"><WidgetOptionsButton variant="secondary" /></span>
						Recent activity
					</Card.Title>
				</Card.Body>
				<TicketsTable items={this.props.tickets} onItemClick={_.bind(this.itemClickHandler, this)} />
				<TicketDetailsModal
					ticket={this.state.selectedItem}
					modalTitle="Ticket details"
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)} />
			</Card>
		)
	}
	hideModal() {
		this.setState({ showModal: false })
	}
	itemClickHandler(ticket: Ticket) {
		console.log("ttt", ticket)
		this.setState({
			showModal: true,
			selectedItem: ticket
		})
	}
	componentDidMount() {
		// this.props.dispatch(loadTicketsAttempt());

	}
}

const mapStateToProps = (state: IApplicationState, ownProps: TicketsOverviewOwnProps) => {
	return {
		...state.staking,
		tickets: getTickets(state),
	};
}

export default connect(mapStateToProps)(TicketsOverviewContainer)

export interface TicketsOverviewOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = ITicketsState & DispatchProps & TicketsOverviewOwnProps

interface InternalState {
	showModal: boolean
	selectedItem: Ticket | null
}

