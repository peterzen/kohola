import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"

import { IndexedWalletAccounts } from "../../../models"

import { ATOMS_DIVISOR, } from "../../../constants"
import { constructTransactionAttempt, signTransactionAttempt, cancelSignTransaction, publishTransactionAttempt } from "../../../store/transactions/actions"
import { ConstructTxOutput } from "../../../datasources/models"
import ConstructTxDialog, { ISendDialogFormData } from "./ConstructTxDialog"
import { ConstructTransactionResponse, ConstructTransactionRequest, SignTransactionResponse, PublishTransactionResponse } from "../../../proto/api_pb"
import { SendTransactionSteps, HumanreadableTxInfo } from "../../../store/transactions/types"
import SignDialog, { ISignDialogFormData } from "./SignDialog"
import PublishDialog from "./PublishDialog"
import PublishConfirmDialog from "./PublishConfirmDialog"
import { IApplicationState } from "../../../store/store"
import { getAccounts } from "../../../features/accounts/accountSlice"
import { AppError } from "../../../store/types"



class SendDialogContainer extends React.Component<Props, InternalState>{
	render() {
		const currentStep = this.props.currentStep
		return (
			<div>
				{currentStep == SendTransactionSteps.CONSTRUCT_DIALOG && (
					<ConstructTxDialog
						error={this.props.errorConstructTransaction}
						accounts={this.props.accounts}
						onFormComplete={_.bind(this.onConstructAttempt, this)}
						onCancel={_.bind(this.onConstructCancel, this)}
					/>
				)}
				{currentStep == SendTransactionSteps.SIGN_DIALOG &&
					this.props.constructTransactionResponse != null &&
					this.props.constructTransactionRequest != null && (
						<SignDialog
							error={this.props.errorSignTransaction}
							txInfo={this.props.txInfo}
							constructTransactionResponse={this.props.constructTransactionResponse}
							onCancel={_.bind(this.onSignCancel, this)}
							onFormComplete={_.bind(this.onSignAttempt, this)}
						/>
					)}
				{currentStep == SendTransactionSteps.PUBLISH_DIALOG &&
					this.props.signTransactionResponse != null && (
						<PublishDialog
							error={this.props.errorPublishTransaction}
							signTransactionResponse={this.props.signTransactionResponse}
							onCancel={_.bind(this.onPublishCancel, this)}
							onFormComplete={_.bind(this.onPublishAttempt, this)}
						/>
					)}
				{currentStep == SendTransactionSteps.PUBLISH_CONFIRM_DIALOG &&
					this.props.publishTransactionResponse != null && (
						<PublishConfirmDialog
							publishTransactionResponse={this.props.publishTransactionResponse}
						/>
					)}
			</div>
		)
	}

	onConstructCancel() {
		this.props.cancel()
	}

	onConstructAttempt(formData: ISendDialogFormData) {
		const outputs: ConstructTxOutput[] = [{
			destination: formData.destinationAddress[0],
			amount: formData.amount * ATOMS_DIVISOR
		}]
		this.props.constructTransactionAttempt(
			formData.sourceAccount.getAccountNumber(),
			formData.requiredConfirmations,
			outputs,
			formData.sendAllToggle
		)
	}

	onSignCancel() {
		this.props.cancelSign()
	}

	onSignAttempt(formData: ISignDialogFormData) {
		this.props.signTransactionAttempt(
			formData.passphrase
		)
	}

	onPublishCancel() {
		this.props.cancelSign()
	}

	onPublishAttempt() {
		this.props.publishTransactionAttempt()
	}
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		...state.walletbalance,
		txInfo: state.transactions.txInfo,
		errorSignTransaction: state.transactions.errorSignTransaction,
		errorPublishTransaction: state.transactions.errorPublishTransaction,
		errorConstructTransaction: state.transactions.errorConstructTransaction,
		signTransactionResponse: state.transactions.signTransactionResponse,
		publishTransactionResponse: state.transactions.publishTransactionResponse,
		constructTransactionRequest: state.transactions.constructTransactionRequest,
		constructTransactionResponse: state.transactions.constructTransactionResponse,
		currentStep: state.transactions.sendTransactionCurrentStep,
		accounts: getAccounts(state),
	};
}

interface OwnProps {
	txInfo: HumanreadableTxInfo | null,
	constructTransactionRequest: ConstructTransactionRequest | null
	constructTransactionResponse: ConstructTransactionResponse | null
	signTransactionResponse: SignTransactionResponse | null
	publishTransactionResponse: PublishTransactionResponse | null
	errorConstructTransaction: AppError | null
	errorSignTransaction: AppError | null
	errorPublishTransaction: AppError | null
	currentStep: SendTransactionSteps
	accounts: IndexedWalletAccounts
}


interface DispatchProps {
	cancel: () => void
	cancelSign(): () => void
	constructTransactionAttempt(...arguments: any): Promise<any>
	signTransactionAttempt(...arguments: any): Promise<any>
	publishTransactionAttempt(...arguments: any): Promise<any>
}

type Props = DispatchProps & OwnProps



interface InternalState {
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
	constructTransactionAttempt: constructTransactionAttempt,
	signTransactionAttempt: signTransactionAttempt,
	publishTransactionAttempt: publishTransactionAttempt,
	cancelSign: cancelSignTransaction,
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(SendDialogContainer);
