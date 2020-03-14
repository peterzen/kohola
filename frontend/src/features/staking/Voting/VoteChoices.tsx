import * as React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import { ListGroup, Form } from "react-bootstrap";

import { Agenda } from "../../../api/models";
import { getVoteChoices, setVoteChoices } from "../stakingSlice";
import { IApplicationState, AppError } from "../../../store/types";
import { VoteChoicesResponse, SetVoteChoicesResponse } from "../../../proto/api_pb";
import { ErrorAlert, SuccessAlert } from "../../../components/Shared/FormStatusAlerts";

class VoteChoices extends React.Component<Props> {
	render() {
		const agenda = this.props.agenda
		const myChoice = _.first(this.props.choices?.getChoicesList())
		return (
			<div>
				<Form className={this.props.inProgress ? "in-progress" : ""}>
					<ListGroup className="tight">
						{_.map(agenda.getChoicesList(), (choice) => (
							<ListGroup.Item
								action
								as={"div"}
								key={choice.getId()}
								className={`votechoice-${choice.getId()}`}>
								<Form.Check
									custom
									checked={myChoice?.getChoiceId() == choice.getId()}
									name={`choice-${agenda.getId()}`}
									type="radio"
									id={`choice-${choice.getId()}`}
									onChange={() => this.handleChange(choice.getId())}
									label={choice.getId()}
								/>
							</ListGroup.Item>
						))}
					</ListGroup>
					<ErrorAlert error={this.props.error} />
					{this.props.setVoteChoicesResponse != null &&
						<SuccessAlert message={`Choice set.  Votebits: ${this.props.setVoteChoicesResponse?.getVotebits()}`} />}
				</Form>
			</div>
		)
	}
	handleChange(choiceId: string) {
		this.props.setVoteChoices(this.props.agenda.getId(), choiceId)
	}
	componentDidMount() {
		this.props.getVoteChoices()
	}
}


interface OwnProps {
	agenda: Agenda,
	choices: VoteChoicesResponse | null
	error: AppError | null
	inProgress: boolean
	setVoteChoicesResponse: SetVoteChoicesResponse | null
}

interface DispatchProps {
	getVoteChoices: typeof getVoteChoices
	setVoteChoices: typeof setVoteChoices
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState) => {
	return {
		choices: state.staking.voteChoicesResponse,
		inProgress: state.staking.voteChoicesAttempting || state.staking.setVoteChoicesAttempting,
		error: state.staking.voteChoicesError || state.staking.setVoteChoicesError,
		setVoteChoicesResponse: state.staking.setVoteChoicesResponse
	}
}

const mapDispatchToProps = {
	getVoteChoices,
	setVoteChoices,
}


export default connect(mapStateToProps, mapDispatchToProps)(VoteChoices)
