import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

// @ts-ignore
import Fade from 'react-reveal/Fade';
import { Card } from "react-bootstrap"

import { history } from '../../store/store'

import { IndexedWalletAccounts, WalletAccount, WalletTotals, WalletBalance } from "../../models"
import { getWalletBalances, getWalletTotals } from "./walletBalanceSlice"
import { getVisibleAccounts } from "./accountSlice"

import { MenuItems } from "./AccountToolsDropdown"
import AccountBalanceTable from "./AccountBalanceTable"
import WalletTotalsComponent from "./WalletTotalsComponent"
import { IApplicationState } from "../../store/types";

class WalletBalanceContainer extends React.PureComponent<OwnProps, InternalState>{
	constructor(props: OwnProps) {
		super(props)
		this.state = {
			selectedAccount: null
		}
	}

	render() {
		return (
			<div>
				<Fade cascade>
					<Card>
						<Card.Body>
							<WalletTotalsComponent totals={this.props.walletTotals} />
						</Card.Body>
					</Card>
					<Card className="mt-3">
						<AccountBalanceTable
							menuHandler={_.bind(this.menuHandler, this)}
							accounts={this.props.accounts}
							balances={this.props.balances}
							walletTotals={this.props.walletTotals}
						/>
					</Card>
				</Fade>
			</div>
		)
	}
	menuHandler(evtKey: keyof MenuItems, selectedAccount: WalletAccount) {
		this.setState({ selectedAccount: selectedAccount });
		switch (evtKey) {
			case MenuItems[MenuItems.DETAILSVIEW]:
				history.push("/account/" + selectedAccount.getAccountNumber())
				break;
		}
	}
}

interface OwnProps {
	accounts: IndexedWalletAccounts
	balances: WalletBalance
	walletTotals: WalletTotals
}


interface InternalState {
	selectedAccount: WalletAccount | null
}

const mapStateToProps = (state: IApplicationState) => {
	return {
		accounts: getVisibleAccounts(state),
		balances: getWalletBalances(state),
		walletTotals: getWalletTotals(state),
	}
}

export default connect(mapStateToProps)(WalletBalanceContainer);
