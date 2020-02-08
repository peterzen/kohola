import * as React from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from 'react-bootstrap';

import { IApplicationState } from "../../store/types";
import { IStakeInfoState } from "../../store/staking/types";
import { loadStakeInfoAttempt } from "../../store/staking/actions";
import { TicketStatusIcon } from "./TicketStatusIcon";
import { TicketStatus } from "../../constants";
import { Amount } from "../Shared/shared";


class StakeInfoComponent extends React.Component<Props, InternalState> {
	render() {
		const s = this.props.stakeinfo;
		return (
			<Card>
				<Card.Body>
					<Row>
						<Col>
							<h2>{s.getLive()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.LIVE} /> Live</h6>
						</Col>
						<Col>
							<h2>{s.getVoted()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.VOTED} /> Voted</h6>
						</Col>
						<Col>
							<h2>{s.getOwnMempoolTix()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.UNMINED} /> Mempool</h6>
						</Col>
						<Col>
							<h2><Amount amount={s.getTotalSubsidy()} showCurrency={true} /></h2>
							<h6 className="text-muted">Total subsidy</h6>
						</Col>
					</Row>
					<Row>
						<Col>
							<h2>{s.getExpired()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.EXPIRED} /> Expired</h6>
						</Col>
						<Col>
							<h2>{s.getMissed()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.MISSED} /> Missed</h6>
						</Col>
						<Col>
							<h2>{s.getRevoked()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.REVOKED} /> Revoked</h6>
						</Col>
						<Col>
							<h2>{s.getImmature()}</h2>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.IMMATURE} /> Immature</h6>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadStakeInfoAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: StakeInfoOwnProps): IStakeInfoState => {
	return {
		...state.staking,
		stakeinfo: state.staking.stakeinfo,
	};
}


export interface StakeInfoOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = IStakeInfoState & DispatchProps & StakeInfoOwnProps

interface InternalState {
	// internalComponentStateField: string
}

export default connect(mapStateToProps)(StakeInfoComponent)
