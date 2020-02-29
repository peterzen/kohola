import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import ConnectionSettings from '../features/appconfiguration/ConnectionSettings';
import { IApplicationState } from '../store/store';
import { IAppConfigurationState } from '../features/appconfiguration/settingsSlice';

class SettingsContainer extends React.Component<{}, {}> {

	render() {
		return (
			<div>
				<ConnectionSettings />
			</div>
		)
	}
}

const mapStateToProps = (state: IApplicationState): IAppConfigurationState => {
	return {
		...state.appconfiguration
	};
}

export default withRouter(connect(mapStateToProps)(SettingsContainer));
