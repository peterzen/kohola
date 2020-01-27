import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import { IApplicationState } from '../store/types';
import TicketPriceComponent from '../components/Staking/TicketPriceComponent';
import StakeInfoComponent from '../components/Staking/StakeInfoComponent';
import AgendasComponent from '../components/Staking/AgendasComponent';
import { IStakingState } from '../store/staking/types';
import TicketsOverviewContainer from '../components/Staking/TicketsOverviewContainer';

class StakingContainer extends React.Component<Props, InternalState> {

	render() {
		const title = "Staking";

		return (
			<div>
				<h1>{title}</h1>
				<StakeInfoComponent />
				<hr />
				<TicketPriceComponent />
				{/* <TicketBuyerConfigComponent/> */}
				<AgendasComponent />
				<TicketsOverviewContainer />
			</div>
		)
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: StakingOwnProps): IStakingState => {
	return {
		...state.staking
	};
}


export interface StakingOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = IStakingState & DispatchProps & StakingOwnProps

interface InternalState {
	// internalComponentStateField: string
}

export default withRouter(connect(mapStateToProps)(StakingContainer));
