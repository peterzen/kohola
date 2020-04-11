import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { Row, Col, Card } from "react-bootstrap"
// @ts-ignore
import Fade from "react-reveal/Fade"
import MixerSettings from "../features/privacy/MixerSettings"

class MixerContainer extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div>
                <Fade fade>
                    <MixerSettings />
                </Fade>
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

export default withRouter(connect(mapStateToProps)(MixerContainer))
