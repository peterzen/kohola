import * as React from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from 'react-bootstrap';

import { StakeInfo, TicketPrice } from "../../models";
import { TicketStatus } from "../../constants";
import { loadStakeInfoAttempt, loadTicketPriceAttempt, getTicketPrice } from "./stakingSlice";

import { TicketStatusIcon } from "./TicketStatusIcon";
import { IApplicationState } from "../../store/types";
import { Amount } from "../../components/Shared/Amount";
import TinyChart from "../../components/charts/TinyChart";


class StakeStats extends React.Component<Props> {
	render() {
		const s = this.props.stakeinfo;
		return (
			<Card>
				<Card.Body>
					<Row>
						<Col sm={6}>
							<h2><Amount amount={this.props.ticketPrice.getTicketPrice()} showCurrency /></h2>
							<h6 className="text-muted">Ticket price in next block</h6>
						</Col>
						<Col sm={6} className="pt-3">
							<TinyChart />
						</Col>
					</Row>
				</Card.Body>
				<hr className="m-0" />
				<Card.Body>
					<Row>
						<Col xs={6}>
							<h3>{s.getVoted()}</h3>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.VOTED} /> Voted</h6>
							<TinyChart />
						</Col>
						<Col xs={6}>
							<h3><Amount amount={s.getTotalSubsidy()} showCurrency={true} /></h3>
							<h6 className="text-muted">Total subsidy</h6>
							<TinyChart />
						</Col>
						<Col xs={6}>
							<h3>{s.getMissed()}</h3>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.MISSED} /> Missed</h6>
							<TinyChart />
						</Col>
						<Col xs={6}>
							<h3>{s.getRevoked()}</h3>
							<h6 className="text-muted"><TicketStatusIcon status={TicketStatus.REVOKED} /> Revoked</h6>
							<TinyChart />
						</Col>
					</Row>
				</Card.Body>
			</Card >
		)
	}

	componentDidMount() {
		this.props.loadStakeInfoAttempt()
		this.props.loadTicketPriceAttempt()
	}
}


interface OwnProps {
	stakeinfo: StakeInfo
	ticketPrice: TicketPrice
}

interface DispatchProps {
	loadStakeInfoAttempt: typeof loadStakeInfoAttempt
	loadTicketPriceAttempt: typeof loadTicketPriceAttempt
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		ticketPrice: getTicketPrice(state),
		stakeinfo: state.staking.stakeinfo,
	}
}

const mapDispatchToProps = {
	loadTicketPriceAttempt,
	loadStakeInfoAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeStats)
