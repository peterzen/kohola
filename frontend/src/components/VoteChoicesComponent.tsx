import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { VoteChoicesState } from "../store/votechoices/types";
import { IApplicationState } from "../store/types";
import { loadVoteChoicesAttempt } from "../store/votechoices/actions";


export interface VoteChoicesOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = VoteChoicesState & DispatchProps & VoteChoicesOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class VoteChoicesComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				<h4>VoteChoices</h4>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadVoteChoicesAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: VoteChoicesOwnProps): VoteChoicesState => {
	return {
		...state.votechoices
	};
}
export default withRouter(connect(mapStateToProps)(VoteChoicesComponent));
