import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"


import { getAccounts } from "../../store/accounts/selectors"
import { loadWalletBalance } from "../../store/walletbalance/actions"
import { IApplicationState } from "../../store/types"
import { getWalletBalances } from "../../store/walletbalance/selectors"
import { IWalletBalanceState } from "../../store/walletbalance/types"
import { IndexedWalletAccounts, WalletAccount } from "../../models"

import AccountBalanceTable from "./AccountBalanceTable"
import GetNewAddressDialog from "./GetNewAddressDialog"
import { loadNextAddressAttempt } from "../../store/accounts/actions"
import { MenuItems } from "./AccountToolsDropdown"


class WalletBalanceContainer extends React.Component<Props, InternalState>{
	constructor(props: Props) {
		super(props)
		this.state = {
			showModal: false,
			selectedAccount: null
		}
		this.menuHandler = this.menuHandler.bind(this)
		this.hideModal = this.hideModal.bind(this)
	}

	render() {
		return (
			<div>
				<AccountBalanceTable
					menuHandler={this.menuHandler}
					accounts={this.props.accounts}
					balances={this.props.balances} />
				<GetNewAddressDialog
					modalTitle=""
					show={this.state.showModal}
					onHide={this.hideModal} />
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



const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.walletbalance,
		accounts: getAccounts(state),
		balances: getWalletBalances(state),
	};
}

interface OwnProps {
	accounts: IndexedWalletAccounts
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
