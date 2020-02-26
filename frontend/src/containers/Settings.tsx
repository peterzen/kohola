import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import SettingsContainer from '../features/appconfiguration/SettingsContainer';
import { IApplicationState } from '../store/store';
import { IAppConfigurationState } from '../features/appconfiguration/settingsSlice';

class StakingContainer extends React.Component<{}, {}> {

	render() {
		return (
			<div>
				<SettingsContainer/>
			</div>
		)
	}
}

const mapStateToProps = (state: IApplicationState): IAppConfigurationState => {
	return {
		...state.appconfiguration
	};
}

export default withRouter(connect(mapStateToProps)(StakingContainer));
