import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
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


class WalletBalanceContainer extends React.Component<Props, InternalState>{
	constructor(props: Props ) {
		super(props)
		this.state = {
			showModal: false,
			selectedAccount: null
		}
	}

	render() {
		return (
			<div className="mt-3">
				<WalletTotalsComponent totals={this.props.walletTotals} />
				<div className="mt-3" />
				<AccountBalanceTable
					menuHandler={_.bind(this.menuHandler, this)}
					accounts={this.props.accounts}
					balances={this.props.balances}
					walletTotals={this.props.walletTotals}
				/>
				<GetNewAddressDialog
					modalTitle=""
					show={this.state.showModal}
					onHide={_.bind(this.hideModal, this)} />
			</div>
		)
	}

	componentDidMount() {
		this.props.loadData();
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
				this.props.getNextAddress(selectedAccount)
				this.showModal();
				break;
		}
	}
}



const mapStateToProps = (state: IApplicationState): IWalletBalanceState & OwnProps  => {
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
	getNextAddress: (account: WalletAccount) => void
	loadData: () => void
}

type Props = IWalletBalanceState & DispatchProps & OwnProps

interface InternalState {
	showModal: boolean
	selectedAccount: WalletAccount | null
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getNextAddress: (account: WalletAccount) => {
		dispatch(loadNextAddressAttempt(account))
	},
	loadData: () => {
		dispatch(loadWalletBalance())
	}
})


export default connect(mapStateToProps, mapDispatchToProps)(WalletBalanceContainer);
