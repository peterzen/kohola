import * as React from "react";
import { Row, Col, ProgressBar } from 'react-bootstrap';

import { Amount, FiatAmount } from "../../components/Shared/shared";
import { WalletAccount, WalletBalance } from "../../models";
import { sprintf } from "sprintf-js";
import { IApplicationState } from "store/store";
import { connect } from "react-redux";
import { getWalletBalances } from "../walletbalance/selectors";


interface IValueCol {
	amount: number,
	total: number,
	label: string,
	variant: string
}

const ValueCol = (props: IValueCol) => {
	const clazz = "spendable spendable-" + props.variant
	const pct = sprintf("%.1f%%", 100 * props.amount / props.total)
	return (
		<Col>
			<h1>{pct}</h1>
			<div>
				<ProgressBar className={clazz} now={100 * props.amount / props.total} />
			</div>
			<p className=" text-muted">{props.label}</p>
			<h4 className="text-right text-muted"><Amount amount={props.amount} rounding={2} showCurrency /></h4>
			<h4 className="text-right text-muted"><FiatAmount amount={props.amount} showCurrency currency="USD" /></h4>
		</Col>
	)
}
class AccountTotals extends React.PureComponent<Props, {}> {
	render() {
		const balance = this.props.balances[this.props.account.getAccountNumber()]
		return (
			<Row>
				<Col>
					<h1><Amount amount={balance.getTotal()} /></h1>
					<div>
						<ProgressBar className="spendable spendable-total" now={100} />
					</div>
					<p className="text-muted">Total DCR</p>
					<h4 className="text-right text-muted"><Amount amount={balance.getTotal()} rounding={2} showCurrency /></h4>
					<h4 className="text-right text-muted"><FiatAmount amount={balance.getTotal()} showCurrency currency="USD" /></h4>
				</Col>

				<ValueCol
					label="Spendable"
					amount={balance.getSpendable()}
					total={balance.getTotal()}
					variant="spendable"></ValueCol>

				<ValueCol
					label="Immature"
					amount={balance.getImmatureReward() + balance.getImmatureStakeGeneration()}
					total={balance.getTotal()}
					variant="immature"></ValueCol>

				<ValueCol
					label="Voting auth"
					amount={balance.getVotingAuthority()}
					total={balance.getTotal()}
					variant="voting"></ValueCol>
				
				<ValueCol
					label="Locked"
					amount={balance.getLockedByTickets()}
					total={balance.getTotal()}
					variant="locked"></ValueCol>
			</Row>
		)
	}
}

interface OwnProps {
	account: WalletAccount
	balances: WalletBalance
}

type Props = OwnProps



const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.accounts,
		balances: getWalletBalances(state)
	};
}

export default connect(mapStateToProps)(AccountTotals)


