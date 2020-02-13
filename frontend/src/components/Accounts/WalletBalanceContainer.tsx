import * as React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"
import _ from "lodash"

import { getAccounts } from "../../store/accounts/selectors"
import { loadWalletBalance } from "../../store/walletbalance/actions"
import { IApplicationState } from "../../store/types"
import { getWalletBalances, getWalletTotals } from "../../store/walletbalance/selectors"
import { IWalletBalanceState } from "../../store/walletbalance/types"
import { IndexedWalletAccounts, WalletAccount, WalletTotals } from "../../models"

import AccountBalanceTable from "./AccountBalanceTable"
import GetNewAddressDialog from "./GetNewAddressDialog"
import { loadNextAddressAttempt } from "../../store/accounts/actions"
import { MenuItems } from "./AccountToolsDropdown"
import WalletTotalsComponent from "./WalletTotalsComponent"
import { Card } from "react-bootstrap"


class WalletBalanceContainer extends React.Component<Props, InternalState>{
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

				<GetNewAddressDialog
					modalTitle="New receive address"
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)} />
			</div>
		)
	}

	componentDidMount() {
		// this.props.loadWalletBalance();
	}
	showModal() {
		this.setState({ showModal: true })
	}
	hideModal() {
		this.setState({ showModal: false })
	}
	menuHandler(evtKey: string, selectedAccount: WalletAccount) {
		this.setState({ selectedAccount: selectedAccount });
		switch (evtKey) {
			case MenuItems[MenuItems.NEWADDRESS]:
				this.props.loadNextAddressAttempt(selectedAccount)
				this.showModal();
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
	// propFromParent: number
}


interface DispatchProps {
	loadNextAddressAttempt: (account: WalletAccount) => void
	loadWalletBalance: () => void
}

type Props = IWalletBalanceState & DispatchProps & OwnProps

interface InternalState {
	showModal: boolean
	selectedAccount: WalletAccount | null
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	loadNextAddressAttempt: loadNextAddressAttempt,
	loadWalletBalance: loadWalletBalance
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(WalletBalanceContainer);
