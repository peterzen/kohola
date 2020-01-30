import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../../store/types";
import { PingState } from "../../store/ping/types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCircle
} from '@fortawesome/free-solid-svg-icons'

class ConnectionStatusComponent extends React.Component<PingState, any> {

    render() {
		const connected = !!this.props.getPingResponse
        return (
			<span className="ml-2">
				{connected ? (
					<FontAwesomeIcon icon={faCircle} className="text-success" />
				) : (
					<FontAwesomeIcon icon={faCircle} className="text-danger" />
				)}
            </span>
        )
    }
}


const mapStateToProps = function (state: IApplicationState, ownProps: any) {
    return {
        getPingResponse: state.ping.getPingResponse,
    };
}

export default connect(mapStateToProps)(ConnectionStatusComponent)
