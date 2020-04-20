import _ from "lodash"
import * as React from "react"
import { connect } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { StepWizardChildProps } from "react-step-wizard"

import { PublishTransactionResponse } from "../../../proto/api_pb"
import { TxHash } from "../TransactionHash"
import { resetSendTransaction } from "../transactionsSlice"
import { IApplicationState } from "../../../store/types"

class PublishConfirmDialog extends React.Component<Props & Partial<StepWizardChildProps>> {
    render() {
        if (this.props.publishTransactionResponse == null) return null

        return (
            <div className="text-center">
                <h1 className="text-success">
                    <FontAwesomeIcon icon={faCheck} className="lg" />
                </h1>
                <p>The transaction has been broadcast</p>
                <p>
                    <TxHash
                        hash={Buffer.from(
                            this.props.publishTransactionResponse.getTransactionHash_asU8()
                        )}
                        truncate={false}
                    />
                </p>
            </div>
        )
    }
    componentDidMount() {
        this.props.onStepChangeSubscribe(() => {
            if (this.props.isActive) {
                setTimeout(() => {
                    this.props.resetSendTransaction()
                    this.props.onCompleted()
                }, 10 * 1000)
            }
        })
    }
}

interface OwnProps {
    onCompleted: () => void
    onStepChangeSubscribe: (fn: () => void) => void
    publishTransactionResponse: PublishTransactionResponse | null
}

interface DispatchProps {
    resetSendTransaction: typeof resetSendTransaction
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
    return {
    }
}

const mapDispatchToProps = {
    resetSendTransaction,
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishConfirmDialog)
