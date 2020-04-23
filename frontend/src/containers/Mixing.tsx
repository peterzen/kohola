import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Card, Tabs, Tab } from "react-bootstrap"
// @ts-ignore
import Fade from "react-reveal/Fade"
import MixerSettings from "../features/privacy/MixerSettings"
import MixingStats from "../features/privacy/MixingStatsContainer"

class MixerContainer extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div>
                <Tabs
                    defaultActiveKey="mixing-stats"
                    id="mixing-tabs"
                    mountOnEnter={true}
                    unmountOnExit={true}
                >
                    <Tab eventKey="mixing-stats" title="Overview">
                        <div>
                            <MixingStats />
                        </div>
                    </Tab>

                    <Tab eventKey="mixer-control" title="Mixer control">
                        <MixerSettings />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

export default withRouter(connect(mapStateToProps)(MixerContainer))
