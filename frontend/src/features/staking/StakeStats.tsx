import * as React from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Container } from 'react-bootstrap';

import { IApplicationState } from "../../store/store";
import { TicketStatusIcon } from "./TicketStatusIcon";
import { TicketStatus } from "../../constants";
import { Amount } from "../../components/Shared/shared";
import { loadStakeInfoAttempt, IStakeInfoState } from "./stakingSlice";
import { bindActionCreators, Dispatch } from "redux";


class StakeStats extends React.Component<Props, InternalState> {
	render() {
		const s = this.props.stakeinfo;
		return (
			<Card>
				<Card.Body>
					<Card.Title>Staking stats</Card.Title>
					<Container>
						<Row>
							<Col xs={6}>
								<h3>{s.getVoted()}</h3>
								<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.VOTED} /> Voted</h6>

							</Col>
							<Col xs={6}>
								<h3><Amount amount={s.getTotalSubsidy()} showCurrency={true} /></h3>
								<h6 className="text-muted">Total subsidy</h6>
							</Col>
							<Col xs={6}>
								<h3>{s.getMissed()}</h3>
								<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.MISSED} /> Missed</h6>

							</Col>
							<Col xs={6}>
								<h3>{s.getRevoked()}</h3>
								<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.REVOKED} /> Revoked</h6>


							</Col>
						</Row>
					</Container>
					{/* <ListGroup variant="horizontal" className="list-group-flush">
						<ListGroupItem>
							<h3>{s.getVoted()}</h3>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.VOTED} /> Voted</h6>
						</ListGroupItem>

						<ListGroupItem>
							<h3><Amount amount={s.getTotalSubsidy()} showCurrency={true} /></h3>
							<h6 className="text-muted">Total subsidy</h6>

						</ListGroupItem>
					</ListGroup>
					<ListGroup variant="horizontal" className="list-group-flush">
						<ListGroupItem>
							<h3>{s.getMissed()}</h3>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.MISSED} /> Missed</h6>

						</ListGroupItem>
						<ListGroupItem>
							<h3>{s.getRevoked()}</h3>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.REVOKED} /> Revoked</h6>

						</ListGroupItem>
					</ListGroup> */}
					{/* <Card.Body>
						<Card.Link href="#">Card Link</Card.Link>
						<Card.Link href="#">Another Link</Card.Link>
					</Card.Body> */}
				</Card.Body>
			</Card >
		)
	}

	componentDidMount() {
		this.props.loadStakeInfoAttempt()
	}
}


interface OwnProps {
}

interface DispatchProps {
	loadStakeInfoAttempt: () => void
}

type Props = DispatchProps & OwnProps

interface InternalState {
}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps) => {
	return {
		...state.staking,
		stakeinfo: state.staking.stakeinfo,
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	loadStakeInfoAttempt: loadStakeInfoAttempt
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StakeStats)
