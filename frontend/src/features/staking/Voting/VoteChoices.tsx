import * as React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import TimeAgo from 'react-timeago';

import { Card, ListGroup, Row, Col, Form, Button } from "react-bootstrap";

import { Agendas, Agenda } from "../../../models";
import { loadAgendasAttempt } from "../stakingSlice";
import { IApplicationState } from "../../../store/types";

class VoteChoices extends React.Component<Props, InternalState> {
	render() {
		const agenda = this.props.agenda
		return (
			<Form>
				<ListGroup className="tight">
					{_.map(agenda.getChoicesList(), (choice) => (
						<ListGroup.Item
							action
							as={"div"}
							key={choice.getId()}
							className={`votechoice-${choice.getId()}`}>
							<Form.Check
								custom
								name={`choice-${agenda.getId()}`}
								type="radio"
								id={`choice-${choice.getId()}`}
								label={choice.getId()}
							/>
						</ListGroup.Item>
					))}
				</ListGroup>
				<div>
					<Button variant="primary">Save</Button>
				</div>
			</Form>
		)
	}
	componentDidMount() {
		// this.props.loadAgendasAttempt()
	}
}


interface OwnProps {
	agenda: Agenda
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps

interface InternalState {
}

const mapStateToProps = (state: IApplicationState) => {
	return {
		agendas: state.staking.agendas,
	}
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(VoteChoices)
