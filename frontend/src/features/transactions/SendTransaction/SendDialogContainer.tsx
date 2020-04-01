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
import { SendTransactionSteps, HumanreadableTxInfo } from "../transactionsSlice"
import { ConstructTransactionResponse, ConstructTransactionRequest, SignTransactionResponse, PublishTransactionResponse, CreateRawTransactionRequest } from "../../../proto/api_pb"
import { rawHashToHex } from "../../../helpers/byteActions"


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

		if (formData.manualInputSelection == true) {
			const request = new CreateRawTransactionRequest()
			const amountsMap = request.getAmountsMap()
			// TODO implement multiple output addresses
			amountsMap.set(formData.destinationAddress[0], formData.amount * ATOMS_DIVISOR)
			const inputs = _.map(formData.selectedUTXOs, (utxo) => {
				const input = new CreateRawTransactionRequest.TransactionInput()
				input.setAmount(utxo.getAmount())
				const txId = rawHashToHex(utxo.getTransactionHash_asU8())
				if (txId == null) {
					throw new AppError(0, "Cannot create input, invalid TX ID: " + utxo.getTransactionHash_asB64())
				}
				input.setTxid(txId)
				input.setVout(utxo.getOutputIndex())
				input.setTree(utxo.getTree())
				return input
			})
			request.setInputsList(inputs)
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
	signTransaction: typeof signTransaction
	publishTransaction: typeof publishTransaction
	createRawTransaction: typeof createRawTransaction
	constructTransaction: typeof constructTransaction
}

const mapDispatchToProps = {
	signTransaction,
	publishTransaction,
	createRawTransaction,
	constructTransaction,
	cancelSignTransaction,
}


export default connect(mapStateToProps, mapDispatchToProps)(SendDialogContainer);
