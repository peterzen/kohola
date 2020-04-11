import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)

import { Row, Col, Card } from "react-bootstrap"

import { StakeInfo, TicketPrice } from "../../middleware/models"
import { StakingHistory } from "../../proto/walletgui_pb"
import { TicketStatus, TransactionType } from "../../constants"
import {
    loadStakeInfoAttempt,
    loadTicketPriceAttempt,
    getTicketPrice,
    getStakingHistorySparklineData,
    loadStakeDiffHistory,
    getStakediffHistory,
} from "./stakingSlice"

import { TicketStatusIcon } from "./TicketStatusIcon"
import { IApplicationState } from "../../store/types"
import {
    normalizeDatapoints,
    makeTimeline,
    IChartdataTimelineItem,
} from "../../helpers/helpers"

import { Amount } from "../../components/Shared/Amount"
import { SparklineChart } from "../../components/charts/TinyCharts"

// @TODO add dropdown to control this
const days = 7

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
                            <SparklineChart
                                data={this.props.stakediffHistory}
                                dataKey="value"
                            />
                        </Col>
                    </Row>
                </Card.Body>
                <hr className="m-0" />
                <Card.Body>
                    <Row>
                        <Col xs={6}>
                            <h3>{sumPurchasedCount}</h3>
                            <h6 className="text-muted">
                                <TicketStatusIcon status={TicketStatus.VOTED} />{" "}
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
                                <TicketStatusIcon status={TicketStatus.VOTED} />{" "}
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
                                />{" "}
                                Missed
                            </h6>
                        </Col>
                        <Col xs={6}>
                            <h3>{s.getRevoked()}</h3>
                            <h6 className="text-muted">
                                <TicketStatusIcon
                                    status={TicketStatus.REVOKED}
                                />{" "}
                                Revoked
                            </h6>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }

    componentDidMount() {
        this.props.loadTicketPriceAttempt()
        this.props.loadStakeDiffHistory(moment.default().subtract(days, "day"))
    }
}

interface OwnProps {
    stakeinfo: StakeInfo
    voteCounts: IChartdataTimelineItem[]
    ticketPrice: TicketPrice
    purchasedCounts: IChartdataTimelineItem[]
    stakediffHistory: any[]
    revocationCounts: IChartdataTimelineItem[]
}

interface DispatchProps {
    loadStakeDiffHistory: typeof loadStakeDiffHistory
    loadTicketPriceAttempt: typeof loadTicketPriceAttempt
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    const stakingHistory = getStakingHistorySparklineData(state, days)
    return {
        stakeinfo: state.staking.stakeinfo,
        ticketPrice: getTicketPrice(state),
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
        stakediffHistory: normalizeDatapoints(
            _.map(getStakediffHistory(state), (d) => {
                return { value: d }
            }),
            "value"
        ),
    }
}

const mapDispatchToProps = {
    loadStakeDiffHistory,
    loadTicketPriceAttempt,
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
        .countBy((item) => moment.default(item.timestamp * 1000).format("L"))
        .defaults(timeline)
        .map((value: number, date: string) => {
            return { timestamp: date, value: value }
        })
        .orderBy("timestamp", "asc")
        .value()

    return normalizeDatapoints(datapoints, "value")
}
