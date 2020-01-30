import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/types";
import { PingState } from "../store/ping/types";


class ConnectionStatusComponent extends React.Component<PingState, any> {

    render() {
        const connected = this.props.getPingResponse !== null ? "[*]" : "";
        return (
            <span>
                {connected}
            </span>
        )
    }
}


const mapStateToProps = function (state: IApplicationState, ownProps: any) {
    return {
        getPingResponse: state.ping.getPingResponse,
        getPingError: state.ping.getPingError
    };
}

export default connect(mapStateToProps)(ConnectionStatusComponent)
