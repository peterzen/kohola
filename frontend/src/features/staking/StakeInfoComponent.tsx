import * as React from "react"
import { connect } from "react-redux"
import { Row, Col, Card } from "react-bootstrap"

import { TicketStatusIcon } from "./TicketStatusIcon"
import { TicketStatus } from "../../constants"
import { StakeInfo } from "../../middleware/models"
import { IApplicationState } from "../../store/types"
import ComponentPlaceHolder from "../../components/Shared/ComponentPlaceholder"

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
                    <ComponentPlaceHolder type='media' rows={7} firstLaunchOnly={true} ready={!this.props.getStakeInfoAttempting}>
                        <div>
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
                        </div>
                    </ComponentPlaceHolder>
                </Card.Body>
            </Card>
        )
    }
}

interface OwnProps {
    stakeinfo: StakeInfo
    getStakeInfoAttempting: boolean
}

interface DispatchProps {
}

type Props = DispatchProps & OwnProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        stakeinfo: state.staking.stakeinfo,
        getStakeInfoAttempting: state.staking.getStakeInfoAttempting,
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(StakeInfoComponent)
