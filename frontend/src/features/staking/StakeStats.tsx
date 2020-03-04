import * as React from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Container } from 'react-bootstrap';

import { StakeInfo } from "../../models";
import { TicketStatus } from "../../constants";
import { IApplicationState } from "../../store/store";
import { loadStakeInfoAttempt } from "./stakingSlice";

import { Amount } from "../../components/Shared/shared";
import { TicketStatusIcon } from "./TicketStatusIcon";


class StakeStats extends React.Component<Props> {
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
	stakeinfo: StakeInfo
}

interface DispatchProps {
	loadStakeInfoAttempt: typeof loadStakeInfoAttempt
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		stakeinfo: state.staking.stakeinfo,
	}
}

const mapDispatchToProps = {
	loadStakeInfoAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeStats)
