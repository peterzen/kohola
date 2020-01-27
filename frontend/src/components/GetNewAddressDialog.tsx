import * as React from 'react';
import { Dispatch } from 'redux';


import GenericModalDialog from './Shared/GenericModalDialog';
import { WalletAccount } from '../models';
import { IWalletBalanceState } from '../store/walletbalance/types';
import { showNewAddressDialog } from '../store/actions';
import { withRouter } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { IApplicationState } from '../store/types';


class GetNewAddressDialog extends GenericModalDialog {
	DialogContent() {
		return (
			<span>Get new address</span>
		)
	}
}



export interface OwnProps {
	account:WalletAccount
}

interface DispatchProps {
	newAddress: (account: WalletAccount) => void,
}

type Props = IWalletBalanceState & DispatchProps & OwnProps

interface InternalState {
}


const mapStateToProps = (state: IApplicationState) => {
	return {
		...state.accounts,
	};
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
	newAddress: (account: WalletAccount) => {
		dispatch(showNewAddressDialog(account))
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(GetNewAddressDialog)
