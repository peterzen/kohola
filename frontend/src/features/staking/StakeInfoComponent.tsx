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
                    <ComponentPlaceHolder
                        firstLaunchOnly={true}
                        type="media"
                        rows={4}
                        ready={!this.props.loading}
                        showLoadingAnimation>
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
                                        <TicketStatusIcon
                                            status={TicketStatus.LIVE}
                                        />{" "}
                                        Live
                                    </h6>
                                </Col>
                                <Col>
                                    <h2>{s.getVoted()}</h2>
                                    <h6 className="text-muted">
                                        <TicketStatusIcon
                                            status={TicketStatus.VOTED}
                                        />{" "}
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

interface StateProps {
    stakeinfo: StakeInfo
}

interface OwnProps {
    loading: boolean
}

interface DispatchProps {}

type Props = DispatchProps & OwnProps & StateProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    return {
        stakeinfo: state.staking.stakeinfo,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StakeInfoComponent)
