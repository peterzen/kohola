import * as React from "react"
import _ from "lodash"
import { connect } from "react-redux"
import TimeAgo from "react-timeago"

import { Card, Row, Col } from "react-bootstrap"

import { Agendas } from "../../../middleware/models"
import { loadAgendasAttempt } from "../stakingSlice"
import { IApplicationState } from "../../../store/types"
import VoteChoices from "./VoteChoices"
import ComponentPlaceHolder from "../../../components/Shared/ComponentPlaceholder"

class AgendasComponent extends React.Component<Props, InternalState> {
    render() {
        return (
            <Card>
                <Card.Header>
                    {this.props.agendas && (
                        <span className="float-right text-muted">
                            Version: v{this.props.agendas.getVersion()}
                        </span>
                    )}
                    <Card.Title>Consensus changes</Card.Title>
                </Card.Header>
                <Card.Body>
                    <ComponentPlaceHolder
                        type="text"
                        rows={7}
                        ready={!this.props.isLoading}
                        showLoadingAnimation>
                        <div>
                            {this.props.agendas
                                .getAgendasList()
                                .map((agenda) => (
                                    <div key={agenda.getId()}>
                                        <h4>{agenda.getId()}</h4>
                                        <Row>
                                            <Col sm={6}>
                                                <p>{agenda.getDescription()}</p>
                                                <p>
                                                    <span className="text-muted">
                                                        Voting closes:{" "}
                                                        <TimeAgo
                                                            date={
                                                                agenda.getExpireTime() *
                                                                1000
                                                            }
                                                        />
                                                    </span>
                                                </p>
                                            </Col>
                                            <Col sm={6}>
                                                <p>My voting preference</p>
                                                <VoteChoices agenda={agenda} />
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                        </div>
                    </ComponentPlaceHolder>
                </Card.Body>
            </Card>
        )
    }

    componentDidMount() {
        this.props.loadAgendasAttempt()
    }
}

interface OwnProps {
    agendas: Agendas
    isLoading: boolean
}

interface DispatchProps {
    loadAgendasAttempt: typeof loadAgendasAttempt
}

type Props = DispatchProps & OwnProps

interface InternalState {}

const mapStateToProps = (state: IApplicationState) => {
    return {
        agendas: state.staking.agendas,
        isLoading: state.staking.getAgendasAttempting,
    }
}

const mapDispatchToProps = {
    loadAgendasAttempt,
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendasComponent)
