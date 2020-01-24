
import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../store/types';

class NavbarComponent extends React.Component {

	render() {
		return (
			<nav>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/staking">Staking</a></li>
				</ul>
			</nav>
		)
	}
}



const mapStateToProps = (state: IApplicationState, ownProps: any) => {
	return {
	};
}

export default withRouter(connect(mapStateToProps, {
})(NavbarComponent));
