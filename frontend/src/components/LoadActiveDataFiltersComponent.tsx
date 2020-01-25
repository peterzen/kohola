import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { LoadActiveDataFiltersState } from "../store/loadactivedatafilters/types";
import { IApplicationState } from "../store/types";
import { loadLoadActiveDataFiltersAttempt } from "../store/loadactivedatafilters/actions";


export interface LoadActiveDataFiltersOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = LoadActiveDataFiltersState & DispatchProps & LoadActiveDataFiltersOwnProps

interface InternalState {
	// internalComponentStateField: string
}


class LoadActiveDataFiltersComponent extends React.Component<Props, InternalState> {
	render() {
		return (
			<div>
				<h4>LoadActiveDataFilters</h4>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadLoadActiveDataFiltersAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: LoadActiveDataFiltersOwnProps): LoadActiveDataFiltersState => {
	return {
		...state.loadactivedatafilters
	};
}
export default withRouter(connect(mapStateToProps)(LoadActiveDataFiltersComponent));
