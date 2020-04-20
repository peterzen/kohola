import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { Card } from "react-bootstrap"
import StepWizard from "react-step-wizard"

import {
    IndexedWalletAccounts,
    WalletAccount,
} from "../../../middleware/models"
import { AppError, IApplicationState } from "../../../store/types"
import ConstructTxDialog from "./CreateTxDialog"
import SignDialog from "./SignDialog"
import PublishDialog from "./PublishDialog"
import PublishConfirmDialog from "./PublishConfirmDialog"
import { getAccounts } from "../../balances/accountSlice"
import { AuthoredTransactionMetadata } from "../models"
import {
    ConstructTransactionRequest,
    SignTransactionResponse,
    PublishTransactionResponse,
} from "../../../proto/api_pb"

type IStepChangeCallback = () => void

class SendDialogContainer extends React.Component<Props, InternalState> {

    wizardInstance: StepWizard
    onStepChangeSubscriptions: IStepChangeCallback[] = []

    render() {
        const onStepChangeSubscribe = _.bind(this.onStepChangeSubscribe, this)
        return (
            <Card>
                <Card.Header>
                    <Card.Title>
                        Send funds
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <StepWizard
                        isLazyMount={false}
                        onStepChange={() => this.onStepChange()}
                        instance={(wizard: StepWizard) => {
                            this.wizardInstance = wizard
                        }}
                    >
                        <ConstructTxDialog
                            defaultFromAccount={this.props.defaultFromAccount}
                            error={this.props.errorConstructTransaction}
                            txInfo={this.props.txInfo}
                            onCancel={() => { }}
                            onCompleted={() => { this.nextStep() }}
                            onStepChangeSubscribe={onStepChangeSubscribe}
                        />
                        <SignDialog
                            error={this.props.errorSignTransaction}
                            txInfo={this.props.txInfo}
                            onCancel={() => { this.previousStep() }}
                            onCompleted={() => { this.nextStep() }}
                            onStepChangeSubscribe={onStepChangeSubscribe}
                        />
                        <PublishDialog
                            error={this.props.errorPublishTransaction}
                            signTransactionResponse={this.props.signTransactionResponse}
                            onCancel={() => { this.previousStep() }}
                            onCompleted={() => { this.nextStep() }}
                            onStepChangeSubscribe={onStepChangeSubscribe}
                        />
                        <PublishConfirmDialog
                            onCompleted={() => { this.firstStep() }}
                            publishTransactionResponse={this.props.publishTransactionResponse}
                            onStepChangeSubscribe={onStepChangeSubscribe}
                        />
                    </StepWizard>
                </Card.Body>
            </Card>
        )
    }

    onStepChangeSubscribe(callback: IStepChangeCallback) {
        this.onStepChangeSubscriptions.push(callback)
    }

    onStepChange() {
        _.each(this.onStepChangeSubscriptions, fn => fn())
    }

    firstStep() {
        this.wizardInstance.firstStep()
    }

    nextStep() {
        this.wizardInstance.nextStep()
    }

    previousStep() {
        this.wizardInstance.previousStep()
    }
}

interface OwnProps {
    defaultFromAccount: WalletAccount
}

interface StateProps {
    txInfo: AuthoredTransactionMetadata | null
    accounts: IndexedWalletAccounts
    constructTransactionRequest: ConstructTransactionRequest | null
    unsignedTransaction: Uint8Array | null

    signTransactionResponse: SignTransactionResponse | null
    publishTransactionResponse: PublishTransactionResponse | null

    errorConstructTransaction: AppError | null
    errorSignTransaction: AppError | null
    errorPublishTransaction: AppError | null
}


interface InternalState {
}

type Props = StateProps & OwnProps

const mapStateToProps = (state: IApplicationState): StateProps => {
    return {
        txInfo: state.transactions.txInfo,
        accounts: getAccounts(state),
        unsignedTransaction: state.transactions.unsignedTransaction,
        errorSignTransaction: state.transactions.errorSignTransaction,
        errorPublishTransaction: state.transactions.errorPublishTransaction,
        errorConstructTransaction: state.transactions.errorCreateTransaction,
        signTransactionResponse: state.transactions.signTransactionResponse,
        publishTransactionResponse:
            state.transactions.publishTransactionResponse,
        constructTransactionRequest:
            state.transactions.createTransactionRequest,
    }
}


export default connect(mapStateToProps)(SendDialogContainer)
