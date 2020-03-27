import * as React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';



import { loadStakingHistory } from './stakingSlice';
import { StakingHistory } from '../../proto/dcrwalletgui_pb';
import { AppError, IApplicationState } from '../../store/types';
import { Table, Card } from 'react-bootstrap';
import ReactTimeago from 'react-timeago';
import { Amount } from '../../components/Shared/Amount';
import { TransactionType } from '../../constants';
import { rawHashToHex } from '../../helpers/byteActions';


class StakingHistoryTable extends React.Component<Props> {

	render() {
		return (
			<Card>
				<Card.Header>
					<Card.Title>Staking returns</Card.Title>
				</Card.Header>
				<Table>
					<thead>
						<tr>
							<th>TxType</th>
							<th>Timestamp</th>
							<th>RewardCredit</th>
							<th>TicketCostCredit</th>
							<th>TicketCostDebit</th>
							<th>FeeDebit</th>
						</tr>
					</thead>
					<tbody>
						{this.props.stakingHistory?.getLineItemsList().map(item => (
							<tr key={rawHashToHex(item.getTxHash_asU8())}>
								<td>{TransactionType[item.getTxType()]}</td>
								<td><ReactTimeago date={moment.unix(item.getTimestamp()).toDate()} /></td>
								<td><Amount amount={item.getRewardCredit()} showCurrency={false} /></td>
								<td><Amount amount={item.getTicketCostCredit()} showCurrency={false} /></td>
								<td><Amount amount={item.getTicketCostDebit()} showCurrency={false} /></td>
								<td><Amount amount={item.getFeeDebit()} showCurrency={false} /></td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card>
		)
	}
}


interface OwnProps {
	stakingHistory: StakingHistory | null
	getStakingHistoryError: AppError | null
	getStakingHistoryAttempting: boolean
}


interface DispatchProps {
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		stakingHistory: state.staking.stakingHistory,
		getStakingHistoryError: state.staking.getStakingHistoryError,
		getStakingHistoryAttempting: state.staking.getStakingHistoryAttempting,
	}
}

const mapDispatchToProps = {
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StakingHistoryTable))
