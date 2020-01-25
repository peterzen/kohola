import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { AgendasState } from "../store/agendas/types";
import { IApplicationState } from "../store/types";
import { loadAgendasAttempt } from "../store/agendas/actions";


export interface AgendasOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = AgendasState & DispatchProps & AgendasOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class AgendasComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				<h4>Agendas</h4>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadAgendasAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: AgendasOwnProps): AgendasState => {
	return {
		...state.agendas
	};
}
export default withRouter(connect(mapStateToProps)(AgendasComponent));
