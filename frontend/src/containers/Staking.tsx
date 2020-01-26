import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../store/types';
import TicketsOverview from "../components/TicketsOverviewComponent";
import TicketPriceComponent from '../components/TicketPriceComponent';
import StakeInfoComponent from '../components/StakeInfoComponent';
import AgendasComponent from '../components/AgendasComponent';
import TicketBuyerConfigComponent from '../components/TicketBuyerConfigComponent';

class StakingContainer extends React.Component {

	render() {
		const title = "staking";

		return (
			<div>
				<h2>{title}</h2>
				<StakeInfoComponent/>
				<TicketPriceComponent />
				<AgendasComponent />
				{/* <TicketBuyerConfigComponent/> */}
				<TicketsOverview />
			</div>
		)
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: any) => {
	return {
	};
}

export default withRouter(connect(mapStateToProps, {
})(StakingContainer));