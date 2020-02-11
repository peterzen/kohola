import * as React from "react";
import { connect } from "react-redux";

import { Card } from "react-bootstrap";
import TimeAgo from 'react-timeago';
import { Agenda } from "../../models";
import { IAgendasState } from "../../store/staking/types";
import { IApplicationState } from "../../store/types";
import { loadAgendasAttempt } from "../../store/staking/actions";


interface AgendasOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = IAgendasState & DispatchProps & AgendasOwnProps

interface InternalState {
	// internalComponentStateField: string
}


function renderAgenda(agenda: Agenda) {
	return (
		<div>
			<p><strong>{agenda.getId()}</strong> {agenda.getDescription()}</p>
			<small><TimeAgo date={agenda.getExpireTime() * 1000} /></small>
		</div>
	)
}

class AgendasComponent extends React.Component<Props, InternalState> {
	render() {
		const agendaList = this.props.agendas.getAgendasList().map(renderAgenda);
		return (
			<Card>
				<Card.Body>
					<Card.Title>Agendas <small className="text-muted">v{this.props.agendas.getVersion()}</small></Card.Title>
					{agendaList}
				</Card.Body>
			</Card>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadAgendasAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: AgendasOwnProps): IAgendasState => {
	return {
		agendas: state.staking.agendas,
		errorAgendas: state.staking.errorAgendas,
		getAgendasRequest: state.staking.getAgendasRequest
	};
}
export default connect(mapStateToProps)(AgendasComponent)
