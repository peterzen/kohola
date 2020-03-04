import * as React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"
import _ from "lodash"

// @ts-ignore
import Fade from 'react-reveal/Fade';
import { Card } from "react-bootstrap"

import { history } from '../../store/store'

import { IApplicationState } from "../../store/store"
import { IndexedWalletAccounts, WalletAccount, WalletTotals } from "../../models"
import { IWalletBalanceState, getWalletBalances, getWalletTotals } from "./walletBalanceSlice"
import { loadNextAddressAttempt, getAccounts } from "./accountSlice"

import { MenuItems } from "./AccountToolsDropdown"
import AccountBalanceTable from "./AccountBalanceTable"
import GetNewAddressDialog from "./GetNewAddressDialog"
import WalletTotalsComponent from "./WalletTotalsComponent"

class WalletBalanceContainer extends React.PureComponent<Props, InternalState>{
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
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
				<GetNewAddressDialog
					modalTitle="New receive address"
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)} />
			</div>
		)
	}
	showModal() {
		this.setState({ showModal: true })
	}
	hideModal() {
		this.setState({ showModal: false })
	}
	menuHandler(evtKey: keyof MenuItems, selectedAccount: WalletAccount) {
		this.setState({ selectedAccount: selectedAccount });
		switch (evtKey) {
			case MenuItems[MenuItems.NEWADDRESS]:
				this.props.loadNextAddressAttempt(selectedAccount)
				this.showModal();
				break;
			case MenuItems[MenuItems.DETAILSVIEW]:
				history.push("/account/" + selectedAccount.getAccountNumber())
				break;
		}
	}
}



const mapStateToProps = (state: IApplicationState): IWalletBalanceState & OwnProps => {
	return {
		...state.walletbalance,
		accounts: getAccounts(state),
		balances: getWalletBalances(state),
		walletTotals: getWalletTotals(state),
	};
}

interface OwnProps {
	accounts: IndexedWalletAccounts
	walletTotals: WalletTotals
}


interface DispatchProps {
	loadNextAddressAttempt: (account: WalletAccount) => void
}

type Props = IWalletBalanceState & DispatchProps & OwnProps

interface InternalState {
	showModal: boolean
	selectedAccount: WalletAccount | null
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	loadNextAddressAttempt: loadNextAddressAttempt,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(WalletBalanceContainer);
