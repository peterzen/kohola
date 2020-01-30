import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Ticket } from '../../models';
import { ITicketsState } from '../../store/staking/types';
import { IApplicationState } from '../../store/types';
import { getTickets } from '../../store/staking/selectors';
import { loadTicketsAttempt } from '../../store/staking/actions';

import TicketsTable from './TicketsTable';
import TicketDetailsModal from './TicketDetailsComponent';

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
			<div>
				<h3>Tickets Overview</h3>
				<TicketsTable items={this.props.tickets} onItemClick={_.bind(this.itemClickHandler, this)} />
				<TicketDetailsModal
					ticket={this.state.selectedItem}
					modalTitle="Ticket details"
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)} />
			</div>
		)
	}
	hideModal() {
		this.setState({ showModal: false })
	}
	itemClickHandler(ticket: Ticket) {
		console.log("ttt",ticket)
		this.setState({
			showModal: true,
			selectedItem: ticket
		})
	}
	componentDidMount() {
		this.props.dispatch(loadTicketsAttempt());

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
