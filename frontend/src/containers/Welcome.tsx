import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

class Welcome extends React.Component<Props> {
    render() {
        return <div></div>
    }
}

interface OwnProps {}

type Props = OwnProps & DispatchProps

const mapStateToProps = () => {
    return {}
}

interface DispatchProps {}

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome))
