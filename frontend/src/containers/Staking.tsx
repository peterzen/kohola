import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import _ from "lodash"

import { Row, Col, Tabs, Tab } from "react-bootstrap"
// @ts-ignore
import Fade from "react-reveal/Fade"

import StakeStats from "../features/staking/StakeStats"
import AgendasComponent from "../features/staking/Voting/AgendasComponent"
import StakeInfoComponent from "../features/staking/StakeInfoComponent"
import PurchaseTicketForm from "../features/staking/PurchaseTicket/SimplePurchaseTicketForm"
import TicketBuyerComponent from "../features/staking/Ticketbuyer/TicketBuyerComponent"
import StakingHistoryContainer from "../features/staking/StakingHistory/StakingHistoryContainer"
import TicketsOverviewContainer from "../features/staking/TicketsOverviewContainer"
import {
    loadTicketsAttempt,
    loadStakingHistory,
    loadStakeInfoAttempt,
} from "../features/staking/stakingSlice"
import StakingToolsMenu from "../features/staking/StakingToolsMenu"
import PassphraseEntryDialog from "../components/Shared/PassphraseEntryDialog"

import { IApplicationState } from "../store/types"
import { StakeInfo } from "../middleware/models"

class StakingContainer extends React.PureComponent<Props> {
    render() {
        return (
            <div>
                <div className="float-right">
                    <StakingToolsMenu />
                </div>
                <Tabs
                    defaultActiveKey="overview"
                    id="purchaseticketsettings-tabs"
                    mountOnEnter={true}
                    unmountOnExit={true}>
                    <Tab eventKey="overview" title="Overview">
                        <div>
                            <StakeInfoComponent loading={this.props.loading} />
                            <Row className="mt-3">
                                <Col>
                                    <TicketsOverviewContainer
                                        loading={this.props.loading}
                                    />
                                </Col>
                                <Col>
                                    <StakeStats loading={this.props.loading} />
                                    <div className="mt-3" />
                                    <PurchaseTicketForm
                                        loading={this.props.loading}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey="roi" title="Returns">
                        <StakingHistoryContainer loading={this.props.loading} />
                    </Tab>
                    <Tab eventKey="ticketbuyer" title="Ticketbuyer">
                        <TicketBuyerComponent loading={this.props.loading} />
                    </Tab>
                    <Tab eventKey="voting" title="Voting">
                        <AgendasComponent loading={this.props.loading} />
                    </Tab>
                </Tabs>
                <PassphraseEntryDialog show={false} />
            </div>
        )
    }
    componentDidMount() {
        // this.props.loadStakeInfoAttempt()
        // this.props.loadStakingHistory(moment.default().unix(), moment.default().subtract("days", 17).unix())
        // this.props.loadStakingHistory()
        // this.props.loadTicketsAttempt()
    }
}

interface OwnProps {
    stakeinfo: StakeInfo
    loading: boolean
}

interface DispatchProps {
    // loadStakeInfoAttempt: typeof loadStakeInfoAttempt
    // loadStakingHistory: typeof loadStakingHistory
    // loadTicketsAttempt: typeof loadTicketsAttempt
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        stakeinfo: state.staking.stakeinfo,
        loading: 
            state.staking.getStakeInfoAttempting ||
            state.staking.getTicketsAttempting ||
            state.staking.getAgendasAttempting,
    }
}

const mapDispatchToProps = {
    // loadStakingHistory,
    // loadTicketsAttempt,
    // loadStakeInfoAttempt,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StakingContainer)
)
