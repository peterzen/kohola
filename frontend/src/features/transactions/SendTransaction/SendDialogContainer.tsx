import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { IndexedWalletAccounts } from "../../../middleware/models"
import { AppError, IApplicationState } from "../../../store/types"
import { ATOMS_DIVISOR, } from "../../../constants"
import { ConstructTxOutput } from "../../../middleware/models"
import ConstructTxDialog, { ISendDialogFormData } from "./ConstructTxDialog"
import SignDialog, { ISignDialogFormData } from "./SignDialog"
import PublishDialog from "./PublishDialog"
import PublishConfirmDialog from "./PublishConfirmDialog"
import { getAccounts } from "../../balances/accountSlice"
import { cancelSignTransaction, constructTransaction, signTransaction, publishTransaction, createRawTransaction } from "../actions"
import { SendTransactionSteps, AuthoredTransactionMetadata } from "../transactionsSlice"
import { ConstructTransactionRequest, SignTransactionResponse, PublishTransactionResponse, CreateRawTransactionRequest } from "../../../proto/api_pb"


class SendDialogContainer extends React.Component<Props, InternalState>{
	render() {
		const currentStep = this.props.currentStep
		return (
			<div>
				{currentStep == SendTransactionSteps.CONSTRUCT_DIALOG && (
					<ConstructTxDialog
						error={this.props.errorConstructTransaction}
						onFormComplete={_.bind(this.onConstructAttempt, this)}
						onCancel={() => this.props.cancel()}
					/>
				)}
				{currentStep == SendTransactionSteps.SIGN_DIALOG &&
					this.props.txInfo != null && (
						<SignDialog
							error={this.props.errorSignTransaction}
							txInfo={this.props.txInfo}
							onCancel={() => this.props.cancelSignTransaction()}
							onFormComplete={_.bind(this.onSignAttempt, this)}
						/>
					)}
				{currentStep == SendTransactionSteps.PUBLISH_DIALOG &&
					this.props.signTransactionResponse != null && (
						<PublishDialog
							error={this.props.errorPublishTransaction}
							signTransactionResponse={this.props.signTransactionResponse}
							onCancel={() => this.props.cancelSignTransaction()}
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

		if (formData.manualInputSelection == true) {
			const request = new CreateRawTransactionRequest()
			const amountsMap = request.getAmountsMap()
			// TODO implement multiple output addresses
			amountsMap.set(formData.destinationAddress[0], formData.amount * ATOMS_DIVISOR)
			const inputs = _.map(formData.selectedUTXOs, (utxo) => {
				const input = new CreateRawTransactionRequest.TransactionInput()
				input.setAmount(utxo.getAmount())
				input.setTransactionHash(utxo.getTransactionHash_asU8())
				input.setOutputIndex(utxo.getOutputIndex())
				input.setTree(utxo.getTree())
				return input
			})
			request.setInputsList(inputs)
			console.log("REQUEST",request.toObject())
			this.props.createRawTransaction(request)
		} else {
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
	}
	onSignAttempt(formData: ISignDialogFormData) {
		this.props.signTransaction(
			this.props.unsignedTransaction,
			formData.passphrase
		)
	}
}


interface OwnProps {
	txInfo: AuthoredTransactionMetadata | null
	accounts: IndexedWalletAccounts
	currentStep: SendTransactionSteps
	constructTransactionRequest: ConstructTransactionRequest | null
	unsignedTransaction:Uint8Array|null

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
		unsignedTransaction:state.transactions.unsignedTransaction,
		errorSignTransaction: state.transactions.errorSignTransaction,
		errorPublishTransaction: state.transactions.errorPublishTransaction,
		errorConstructTransaction: state.transactions.errorConstructTransaction,
		signTransactionResponse: state.transactions.signTransactionResponse,
		publishTransactionResponse: state.transactions.publishTransactionResponse,
		constructTransactionRequest: state.transactions.constructTransactionRequest,
		currentStep: state.transactions.sendTransactionCurrentStep,
	}
}


interface DispatchProps {
	cancel: () => void
	signTransaction: typeof signTransaction
	publishTransaction: typeof publishTransaction
	createRawTransaction: typeof createRawTransaction
	constructTransaction: typeof constructTransaction
	cancelSignTransaction: typeof cancelSignTransaction
}

const mapDispatchToProps = {
	signTransaction,
	publishTransaction,
	createRawTransaction,
	constructTransaction,
	cancelSignTransaction,
}


export default connect(mapStateToProps, mapDispatchToProps)(SendDialogContainer);
