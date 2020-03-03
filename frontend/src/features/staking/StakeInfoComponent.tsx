import * as React from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from 'react-bootstrap';

import { IApplicationState } from "../../store/store";
import { TicketStatusIcon } from "./TicketStatusIcon";
import { TicketStatus } from "../../constants";
import { loadStakeInfoAttempt, IStakeInfoState } from "./stakingSlice";
import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";


class StakeInfoComponent extends React.Component<Props, InternalState> {
	render() {
		const s = this.props.stakeinfo;
		return (
			<Card>
				<Card.Body>
					<Row>
						<Col>
							<h2>{s.getVoted()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.VOTED} /> Voted recently</h6>
						</Col>
						<Col>
							<h2>{s.getLive()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.LIVE} /> Live</h6>
						</Col>
						<Col>
							<h2>{s.getImmature()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.IMMATURE} /> Immature</h6>
						</Col>
						<Col>
							<h2>{s.getOwnMempoolTix()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.UNMINED} /> Mempool</h6>
						</Col>
					</Row>
					{/* <Row>
					<Col>
							<h1>{s.getVoted()}</h1>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.VOTED} /> Voted</h6>
						</Col>
						<Col>
							<h1>{s.getExpired()}</h1>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.EXPIRED} /> Expired</h6>
						</Col>
						<Col>
							<h1>{s.getMissed()}</h1>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.MISSED} /> Missed</h6>
						</Col>
						<Col>
							<h1>{s.getRevoked()}</h1>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.REVOKED} /> Revoked</h6>
						</Col>
					</Row> */}
				</Card.Body>
			</Card>
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

type Props = IStakeInfoState & DispatchProps & OwnProps

interface InternalState {
}

const mapStateToProps = (state: IApplicationState, ownProps: OwnProps): IStakeInfoState => {
	return {
		...state.staking,
		stakeinfo: state.staking.stakeinfo,
	};
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	loadStakeInfoAttempt: loadStakeInfoAttempt
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(StakeInfoComponent)
