import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { TicketBuyerConfigState } from "../store/ticketbuyerconfig/types";
import { IApplicationState } from "../store/types";
import { loadTicketBuyerConfigAttempt } from "../store/ticketbuyerconfig/actions";


export interface TicketBuyerConfigOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = TicketBuyerConfigState & DispatchProps & TicketBuyerConfigOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class TicketBuyerConfigComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				<h4>TicketBuyerConfig</h4>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadTicketBuyerConfigAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: TicketBuyerConfigOwnProps): TicketBuyerConfigState => {
	return {
		...state.ticketbuyerconfig
	};
}
export default withRouter(connect(mapStateToProps)(TicketBuyerConfigComponent));
