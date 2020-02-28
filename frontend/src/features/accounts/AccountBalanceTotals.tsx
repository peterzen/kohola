import * as React from "react";
import { connect } from "react-redux";
import { sprintf } from "sprintf-js";

import { Row, Col, ProgressBar } from 'react-bootstrap';

import { Amount, FiatAmount } from "../../components/Shared/shared";
import { WalletAccount, WalletBalance } from "../../models";
import { getWalletBalances } from "../walletbalance/selectors";
import { IApplicationState } from "../../store/store";
import AccountBalancePieChart from "./AccountBalancePieChart";


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
			<h3>{pct}</h3>
			<div>
				<ProgressBar className={clazz} now={100 * props.amount / props.total} />
			</div>
			<p className=" text-muted">{props.label}</p>
			<h4 className="text-right text-muted"><Amount amount={props.amount} rounding={2} showCurrency /></h4>
			{/* <h4 className="text-right text-muted"><FiatAmount amount={props.amount} showCurrency currency="USD" /></h4> */}
		</Col>
	)
}
class AccountTotals extends React.PureComponent<Props, {}> {
	render() {
		const balance = this.props.balances[this.props.account.getAccountNumber()]
		if (balance == null) {
			return null
		}
		return (
			<Row>
				<Col>
					{/* <AccountBalancePieChart /> */}
					<h1><Amount amount={balance.getTotal()} /></h1>
					<p className="text-muted text-right">Total DCR</p>
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


