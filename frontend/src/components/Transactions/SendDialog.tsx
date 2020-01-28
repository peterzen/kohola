import * as React from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import _ from "lodash"
import { IApplicationState } from "../../store/types"
import { IWalletBalanceState } from "../../store/walletbalance/types"
import { getAccounts } from "../../store/accounts/selectors"
import { IndexedWalletAccounts, WalletAccount } from "../../models"
import { ConstructTransactionRequest } from "../../proto/api_pb"



class SendDialog extends React.Component<Props, InternalState>{
	constructor(props: Props ) {
		super(props)
		this.state = {
			selectedAccount: null
		}
	}

	render() {
		return (
			<div>
				send dialog
			</div>
		)
	}

	handleConstructTransaction(args) {
		const request=new ConstructTransactionRequest()
		request.setSourceAccount(args.sourceAccount.getAccountNumber());
		request.setRequiredConfirmations(args.requiredConfirmations);
		request.setFeePerKb(args.feePerKb);
		request.setOutputSelectionAlgorithm(args.outputSelectionAlgorithm);
		request.setNonChangeOutputsList(args.nonChangeOutputs);
		request.setChangeDestination(args.changeDestination);

	}

	componentDidMount() {
		// this.props.loadData();
	}
	// showModal() {
	// 	this.setState({ showModal: true })
	// }
	// hideModal() {
	// 	this.setState({ showModal: false })
	// }
	// menuHandler(evtKey: string, selectedAccount: WalletAccount) {
	// 	this.setState({ selectedAccount: selectedAccount });
	// 	switch (evtKey) {
	// 		case MenuItems[MenuItems.NEWADDRESS]:
	// 			this.props.getNextAddress(selectedAccount)
	// 			this.showModal();
	// 			break;
	// 	}
	// }
}



const mapStateToProps = (state: IApplicationState):  OwnProps  => {
	return {
		...state.walletbalance,
		accounts: getAccounts(state),
		// balances: getWalletBalances(state),
		// walletTotals: getWalletTotals(state),
	};
}

interface OwnProps {
	accounts: IndexedWalletAccounts
	// propFromParent: number
}


interface DispatchProps {
}

type Props =  DispatchProps & OwnProps

interface InternalState {
	selectedAccount: WalletAccount | null
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	
})


export default connect(mapStateToProps, mapDispatchToProps)(SendDialog);
