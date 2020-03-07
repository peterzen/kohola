import * as React from "react";
import { connect } from "react-redux";
import TimeAgo from 'react-timeago';

import { Agendas } from "../../../models";
import { loadAgendasAttempt } from "../stakingSlice";

import { Card, ListGroup } from "react-bootstrap";
import { IApplicationState } from "../../../store/types";


class AgendasComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<Card>
				<Card.Header>
					<Card.Title>Agendas <small className="text-muted">v{this.props.agendas.getVersion()}</small></Card.Title>
				</Card.Header>
				<Card.Body>
					<ListGroup>
						{this.props.agendas.getAgendasList().map((agenda) =>
							<ListGroup.Item key={agenda.getId()}>
								<p><strong>{agenda.getId()}</strong> {agenda.getDescription()}</p>
								<small><TimeAgo date={agenda.getExpireTime() * 1000} /></small>
							</ListGroup.Item>
						)}
					</ListGroup>
				</Card.Body>
			</Card>
		)
	}
	componentDidMount() {
		this.props.loadAgendasAttempt()
	}
}


interface OwnProps {
	agendas: Agendas
}

interface DispatchProps {
	loadAgendasAttempt: () => void
}

type Props = DispatchProps & OwnProps

interface InternalState {
}

const mapStateToProps = (state: IApplicationState) => {
	return {
		agendas: state.staking.agendas,
		errorAgendas: state.staking.errorAgendas,
		getAgendasRequest: state.staking.getAgendasRequest
	};
}

const mapDispatchToProps = {
	loadAgendasAttempt: loadAgendasAttempt
}


export default connect(mapStateToProps, mapDispatchToProps)(AgendasComponent)
