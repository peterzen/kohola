import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { __CAMELCASE__State } from "../store/__LCASE__/types";
import { IApplicationState } from "../store/types";
import { load__CAMELCASE__Attempt } from "../store/__LCASE__/actions";


export interface __CAMELCASE__OwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = __CAMELCASE__State & DispatchProps & __CAMELCASE__OwnProps

interface InternalState {
	// internalComponentStateField: string
}


class __CAMELCASE__Component extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				<h4>__CAMELCASE__</h4>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(load__CAMELCASE__Attempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: __CAMELCASE__OwnProps): __CAMELCASE__State => {
	return {
		...state.__LCASE__
	};
}
export default withRouter(connect(mapStateToProps)(__CAMELCASE__Component));
