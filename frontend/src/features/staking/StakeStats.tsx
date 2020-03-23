import * as React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

import { Row, Col, Card } from 'react-bootstrap'

import { StakeInfo, TicketPrice } from '../../middleware/models'
import { TicketStatus, TransactionType } from '../../constants'
import {
	loadStakeInfoAttempt,
	loadTicketPriceAttempt,
	getTicketPrice,
	getStakingHistorySparklineData,
} from './stakingSlice'

import { TicketStatusIcon } from './TicketStatusIcon'
import { IApplicationState } from '../../store/types'
import { Amount } from '../../components/Shared/Amount'
import PlaceholderSparklineChart from '../../components/charts/PlaceholderSparklineChart'
import {
	normalizeDatapoints,
	makeTimeline,
	IChartdataTimelineItem,
} from '../../helpers/helpers'


import { StakingHistory } from '../../proto/dcrwalletgui_pb'
import { SparklineChart } from '../../components/charts/TinyCharts'


class StakeStats extends React.Component<Props> {
	render() {
		const s = this.props.stakeinfo
		const sumPurchasedCount = _.reduce(
			this.props.purchasedCounts,
			(sum, item) => sum + item.value,
			0
		)
		return (
			<Card>
				<Card.Body>
					<Row>
						<Col sm={6}>
							<h2>
								<Amount
									amount={this.props.ticketPrice.getTicketPrice()}
									showCurrency
								/>
							</h2>
							<h6 className="text-muted">
								Ticket price in next block
                            </h6>
						</Col>
						<Col sm={6} className="pt-3">
							<PlaceholderSparklineChart />
						</Col>
					</Row>
				</Card.Body>
				<hr className="m-0" />
				<Card.Body>
					<Row>
						<Col xs={6}>
							<h3>{sumPurchasedCount}</h3>
							<h6 className="text-muted">
								<TicketStatusIcon status={TicketStatus.VOTED} />{' '}
                                Purchased
                            </h6>
							<SparklineChart
								data={this.props.purchasedCounts}
								dataKey="value"
							/>
						</Col>
						<Col xs={6}>
							<h3>{s.getVoted()}</h3>
							<h6 className="text-muted">
								<TicketStatusIcon status={TicketStatus.VOTED} />{' '}
                                Voted
                            </h6>
							<SparklineChart
								data={this.props.voteCounts}
								dataKey="value"
							/>
						</Col>
						{/* <Col xs={6}>
							<h3><Amount amount={s.getTotalSubsidy()} showCurrency={true} /></h3>
							<h6 className="text-muted">Total subsidy</h6>
							<PlaceholderSparklineChart />
						</Col> */}
						<Col xs={6}>
							<h3>{s.getMissed()}</h3>
							<h6 className="text-muted">
								<TicketStatusIcon
									status={TicketStatus.MISSED}
								/>{' '}
                                Missed
                            </h6>
						</Col>
						<Col xs={6}>
							<h3>{s.getRevoked()}</h3>
							<h6 className="text-muted">
								<TicketStatusIcon
									status={TicketStatus.REVOKED}
								/>{' '}
                                Revoked
                            </h6>
						</Col>
					</Row>
				</Card.Body>
			</Card>
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
	voteCounts: IChartdataTimelineItem[]
	revocationCounts: IChartdataTimelineItem[]
	purchasedCounts: IChartdataTimelineItem[]
}

interface DispatchProps {
	loadStakeInfoAttempt: typeof loadStakeInfoAttempt
	loadTicketPriceAttempt: typeof loadTicketPriceAttempt
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
	const days = 5
	const stakingHistory = getStakingHistorySparklineData(state, days)
	return {
		ticketPrice: getTicketPrice(state),
		stakeinfo: state.staking.stakeinfo,
		voteCounts: countFilteredEvents(
			stakingHistory,
			days,
			TransactionType.VOTE
		),
		purchasedCounts: countFilteredEvents(
			stakingHistory,
			days,
			TransactionType.TICKET_PURCHASE
		),
		revocationCounts: countFilteredEvents(
			stakingHistory,
			days,
			TransactionType.REVOCATION
		),
	}
}

const mapDispatchToProps = {
	loadTicketPriceAttempt,
	loadStakeInfoAttempt,
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeStats)

export const countFilteredEvents = (
	history: StakingHistory.StakingHistoryLineItem[],
	days: number,
	txType: TransactionType
): IChartdataTimelineItem[] => {
	const timeline = makeTimeline(days)
	const datapoints = _.chain(history)
		.filter((item) => item.getTxType() == txType)
		.map((item) => item.toObject())
		.countBy((item) => moment.default(item.timestamp * 1000).format('L'))
		.defaults(timeline)
		.map((value: number, date: string) => {
			return { timestamp: date, value: value }
		})
		.orderBy('timestamp', 'asc')
		.value()

	return normalizeDatapoints(datapoints, 'value')
}
