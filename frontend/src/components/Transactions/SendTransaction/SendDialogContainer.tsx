import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"
import { Dispatch, bindActionCreators } from "redux"

import { getAccounts } from "../../../store/accounts/selectors"
import { IApplicationState, AppError } from "../../../store/types"
import { IndexedWalletAccounts } from "../../../models"

import { Row, Col, Button } from 'react-bootstrap';

import { ATOMS_DIVISOR, } from "../../../constants"
import { constructTransactionAttempt, signTransactionAttempt, cancelSignTransaction, publishTransactionAttempt } from "../../../store/transactions/actions"
import { ConstructTxOutput } from "../../../datasources/models"
import SendDialogForm, { ISendDialogFormData } from "./ConstructTxDialog"
import { ConstructTransactionResponse, ConstructTransactionRequest, SignTransactionResponse, PublishTransactionResponse } from "../../../proto/api_pb"
import { SendTransactionSteps, HumanreadableTxInfo } from "../../../store/transactions/types"
import SignDialog, { ISignDialogFormData } from "./SignDialog"
import PublishDialog from "./PublishDialog"
import PublishConfirmDialog from "./PublishConfirmDialog"

class SendDialogContainer extends React.Component<Props, InternalState>{
	render() {
		const currentStep = this.props.currentStep
		return (
			<Row>
				<Col>
					{currentStep == SendTransactionSteps.CONSTRUCT_DIALOG && (
						<SendDialogForm
							error={this.props.errorConstructTransaction}
							accounts={this.props.accounts}
							onFormComplete={_.bind(this.onConstructAttempt, this)}
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
				</Col>
				<Col>
				</Col>
			</Row>
		)
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
	txInfo: HumanreadableTxInfo,
	constructTransactionRequest: ConstructTransactionRequest | null,
	constructTransactionResponse: ConstructTransactionResponse | null
	signTransactionResponse: SignTransactionResponse | null,
	publishTransactionResponse: PublishTransactionResponse | null,
	errorConstructTransaction: AppError | null
	errorSignTransaction: AppError | null,
	errorPublishTransaction: AppError | null,
	currentStep: SendTransactionSteps
	accounts: IndexedWalletAccounts
}


interface DispatchProps {
	cancelSign(): any,
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
