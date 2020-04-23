import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import _ from "lodash"

import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)

import { Row, Col, Tabs, Tab } from "react-bootstrap"
// @ts-ignore
import Fade from "react-reveal/Fade"

import StakeStats from "../features/staking/StakeStats"
import AgendasComponent from "../features/staking/Voting/AgendasComponent"
import StakeInfoComponent from "../features/staking/StakeInfoComponent"
import PurchaseTicketForm from "../features/staking/PurchaseTicket/SimplePurchaseTicketForm"
import TicketBuyerComponent from "../features/staking/Ticketbuyer/TicketBuyerComponent"
import TicketsOverviewContainer from "../features/staking/TicketsOverviewContainer"
import {
    loadTicketsAttempt,
    loadStakingHistory,
    loadStakeInfoAttempt,
} from "../features/staking/stakingSlice"
import StakingToolsMenu from "../features/staking/StakingToolsMenu"
import PassphraseEntryDialog from "../components/Shared/PassphraseEntryDialog"
import StakingHistoryTable from "../features/staking/StakingHistoryTable"
import { IApplicationState } from "../store/types"
import { StakeInfo } from "../middleware/models"

class StakingContainer extends React.Component<Props> {
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
                    unmountOnExit={true}
                >
                    <Tab eventKey="overview" title="Overview">
                        <div>
                            <StakeInfoComponent />
                            <Row className="mt-3">
                                <Col>
                                    <TicketsOverviewContainer />
                                </Col>
                                <Col>
                                    <StakeStats />
                                    <div className="mt-3" />
                                    <PurchaseTicketForm />
                                </Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey="roi" title="Returns">
                        <StakingHistoryTable />
                    </Tab>
                    <Tab eventKey="ticketbuyer" title="Ticketbuyer">
                        <TicketBuyerComponent />
                    </Tab>
                    <Tab eventKey="voting" title="Voting">
                        <AgendasComponent />
                    </Tab>
                </Tabs>
                <PassphraseEntryDialog show={false} />
            </div>
        )
    }
    componentDidMount() {
        this.props.loadStakeInfoAttempt()
        this.props.loadStakingHistory(moment.default().unix(), moment.default().subtract("days", 17).unix())
        // this.props.loadStakingHistory()
        // this.props.loadTicketsAttempt()
    }
}

interface OwnProps {
    stakeinfo: StakeInfo
}

interface DispatchProps {
    loadStakeInfoAttempt: typeof loadStakeInfoAttempt
    loadStakingHistory: typeof loadStakingHistory
    loadTicketsAttempt: typeof loadTicketsAttempt
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
    return {
        stakeinfo: state.staking.stakeinfo,
    }
}

const mapDispatchToProps = {
    loadStakingHistory,
    loadTicketsAttempt,
    loadStakeInfoAttempt,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(StakingContainer)
)
