import * as React from "react"
import { connect } from "react-redux"
import { Row, Col, Card } from "react-bootstrap"

import { TicketStatusIcon } from "./TicketStatusIcon"
import { TicketStatus } from "../../constants"
import { loadStakeInfoAttempt } from "./stakingSlice"
import { StakeInfo } from "../../middleware/models"
import { IApplicationState } from "../../store/types"

class StakeInfoComponent extends React.Component<Props> {
    render() {
        const s = this.props.stakeinfo
        const allTixCount =
            s.getVoted() +
            s.getLive() +
            s.getImmature() +
            s.getOwnMempoolTix() +
            s.getMissed()
        return (
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <h2>{allTixCount}</h2>
                            <h6 className="text-muted">Σ Total</h6>
                        </Col>
                        <Col>
                            <h2>{s.getOwnMempoolTix()}</h2>
                            <h6 className="text-muted">
                                <TicketStatusIcon
                                    status={TicketStatus.UNMINED}
                                />{" "}
                                In mempool
                            </h6>
                        </Col>
                        <Col>
                            <h2>{s.getImmature()}</h2>
                            <h6 className="text-muted">
                                <TicketStatusIcon
                                    status={TicketStatus.IMMATURE}
                                />{" "}
                                Immature
                            </h6>
                        </Col>
                        <Col>
                            <h2>{s.getLive()}</h2>
                            <h6 className="text-muted">
                                <TicketStatusIcon status={TicketStatus.LIVE} />{" "}
                                Live
                            </h6>
                        </Col>
                        <Col>
                            <h2>{s.getVoted()}</h2>
                            <h6 className="text-muted">
                                <TicketStatusIcon status={TicketStatus.VOTED} />{" "}
                                Voted recently
                            </h6>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
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
    loadStakeInfoAttempt,
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeInfoComponent)
