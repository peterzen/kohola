import React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { IApplicationState } from "../../store/types"
import { openURL, getCurrentNetwork } from "../app/appSlice"
import { getExplorerURL } from "../appconfiguration/settingsSlice"

class Address extends React.Component<Props> {
    render() {
        const address = this.props.address
        return (
            <a
                className="address"
                title="Show address in chain explorer"
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.openURL(`${this.props.explorerUrl}/address/${address}`)
                    return false
                }}
                href="#">
                {address}
            </a>
        )
    }
    openURL(url: string) {
        this.props.openURL(url)
    }
}

interface StateProps {
    explorerUrl: string
}

interface OwnProps {
    address: string
}

type Props = StateProps & OwnProps & DispatchProps

interface DispatchProps {
    openURL: typeof openURL
}

const mapStateToProps = function (state: IApplicationState): StateProps {
    const network = getCurrentNetwork(state)
    return {
        explorerUrl: getExplorerURL(state, network),
    }
}

const mapDispatchToProps = {
    openURL,
}

export default connect(mapStateToProps, mapDispatchToProps)(Address)
