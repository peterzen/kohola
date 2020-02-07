import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../store/types';
import { Row, Col } from 'react-bootstrap';
import SettingsContainer from '../components/Settings/SettingsContainer';
import { IAppConfigurationState } from '../store/appconfiguration/types';

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