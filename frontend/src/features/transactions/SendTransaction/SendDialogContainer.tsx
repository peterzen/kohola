import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { IndexedWalletAccounts } from "../../../api/models"
import { AppError, IApplicationState } from "../../../store/types"
import { ATOMS_DIVISOR, } from "../../../constants"
import { ConstructTxOutput } from "../../../api/models"
import ConstructTxDialog, { ISendDialogFormData } from "./ConstructTxDialog"
import SignDialog, { ISignDialogFormData } from "./SignDialog"
import PublishDialog from "./PublishDialog"
import PublishConfirmDialog from "./PublishConfirmDialog"
import { getAccounts } from "../../balances/accountSlice"
import { cancelSignTransaction, constructTransaction, signTransaction, publishTransaction } from "../actions"
import { SendTransactionSteps, HumanreadableTxInfo } from "../transactionsSlice"
import { ConstructTransactionResponse, ConstructTransactionRequest, SignTransactionResponse, PublishTransactionResponse } from "../../../proto/api_pb"


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
						onCancel={() => this.props.cancel()}
					/>
				)}
				{currentStep == SendTransactionSteps.SIGN_DIALOG &&
					this.props.constructTransactionResponse != null && (
						<SignDialog
							error={this.props.errorSignTransaction}
							txInfo={this.props.txInfo}
							constructTransactionResponse={this.props.constructTransactionResponse}
							onCancel={() => this.props.cancelSign()}
							onFormComplete={_.bind(this.onSignAttempt, this)}
						/>
					)}
				{currentStep == SendTransactionSteps.PUBLISH_DIALOG &&
					this.props.signTransactionResponse != null && (
						<PublishDialog
							error={this.props.errorPublishTransaction}
							signTransactionResponse={this.props.signTransactionResponse}
							onCancel={() => this.props.cancelSign()}
							onFormComplete={() => this.props.publishTransaction()}
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
	onConstructAttempt(formData: ISendDialogFormData) {
		const outputs: ConstructTxOutput[] = [{
			destination: formData.destinationAddress[0],
			amount: formData.amount * ATOMS_DIVISOR
		}]
		this.props.constructTransaction(
			formData.sourceAccount.getAccountNumber(),
			formData.requiredConfirmations,
			outputs,
			formData.sendAllToggle
		)
	}
	onSignAttempt(formData: ISignDialogFormData) {
		this.props.signTransaction(
			formData.passphrase
		)
	}
}


interface OwnProps {
	txInfo: HumanreadableTxInfo | null
	accounts: IndexedWalletAccounts
	currentStep: SendTransactionSteps
	constructTransactionRequest: ConstructTransactionRequest | null

	constructTransactionResponse: ConstructTransactionResponse | null
	signTransactionResponse: SignTransactionResponse | null
	publishTransactionResponse: PublishTransactionResponse | null

	errorConstructTransaction: AppError | null
	errorSignTransaction: AppError | null
	errorPublishTransaction: AppError | null
}

type Props = DispatchProps & OwnProps

interface InternalState {
}

const mapStateToProps = (state: IApplicationState): OwnProps => {
	return {
		txInfo: state.transactions.txInfo,
		accounts: getAccounts(state),
		errorSignTransaction: state.transactions.errorSignTransaction,
		errorPublishTransaction: state.transactions.errorPublishTransaction,
		errorConstructTransaction: state.transactions.errorConstructTransaction,
		signTransactionResponse: state.transactions.signTransactionResponse,
		publishTransactionResponse: state.transactions.publishTransactionResponse,
		constructTransactionRequest: state.transactions.constructTransactionRequest,
		constructTransactionResponse: state.transactions.constructTransactionResponse,
		currentStep: state.transactions.sendTransactionCurrentStep,
	};
}


interface DispatchProps {
	cancel: () => void
	cancelSign(): typeof cancelSignTransaction
	constructTransaction: typeof constructTransaction
	signTransaction: typeof signTransaction
	publishTransaction: typeof publishTransaction
}

const mapDispatchToProps = {
	constructTransaction: constructTransaction,
	signTransaction: signTransaction,
	publishTransaction: publishTransaction,
	cancelSign: cancelSignTransaction,
}


export default connect(mapStateToProps, mapDispatchToProps)(SendDialogContainer);
