import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Spinner, Card } from "react-bootstrap"
import QrCodeRenderer from "../../components/Shared/QrCodeRenderer"

import { CopyToClipboardText } from "../../components/Shared/shared"
import { loadNextAddressAttempt } from "../balances/accountSlice"
import { IApplicationState, AppError } from "../../store/types"
import { ErrorAlert } from "../../components/Shared/FormStatusAlerts"
import {
    WalletAccount,
    NextAddress,
    Transaction,
} from "../../middleware/models"
import { getAddressTransactions } from "./transactionsSlice"
import { IncomingTxPanel } from "./TxConfirmationPanel"

class ReceiveDialog extends React.Component<Props, InternalState> {
    render() {
        const address = this.props.nextAddressResponse?.getAddress() || ""
        const incomingTx = _.first(this.props.getIncomingTransaction(address))
        return (
            <Card>
                <Card.Header>
                    <Card.Title>Receive funds</Card.Title>
                </Card.Header>
                <Card.Body>
                    {this.props.getNextAddressAttempting && (
                        <Spinner animation="grow" />
                    )}
                    {this.props.errorNextAddress != null && (
                        <ErrorAlert error={this.props.errorNextAddress} />
                    )}
                    {this.props.errorNextAddress == null &&
                        incomingTx == undefined && (
                            <div className="text-center">
                                <h5>
                                    Account:{" "}
                                    {this.props.account.getAccountName()}
                                </h5>
                                <div>
                                    <QrCodeRenderer
                                        value={`decred:${address}`}
                                    />
                                </div>
                                <div className="mt-4">
                                    <h5>
                                        <CopyToClipboardText value={address}>
                                            <code>{address}</code>
                                        </CopyToClipboardText>
                                    </h5>
                                </div>
                            </div>
                        )}
                    {incomingTx != undefined && (
                        <IncomingTxPanel tx={incomingTx} />
                    )}
                </Card.Body>
            </Card>
        )
    }
    componentDidMount() {
        this.props.loadNextAddressAttempt(this.props.account)
    }
}

interface OwnProps {
    account: WalletAccount
    errorNextAddress: AppError | null
    nextAddressResponse: NextAddress
    getNextAddressAttempting: boolean
    getIncomingTransaction: (address: string) => Transaction[]
}

interface InternalState {}

interface DispatchProps {
    loadNextAddressAttempt: typeof loadNextAddressAttempt
}

type Props = OwnProps & DispatchProps

const mapStateToProps = (state: IApplicationState) => {
    return {
        errorNextAddress: state.accounts.errorNextAddress,
        nextAddressResponse: state.accounts.nextAddressResponse,
        getNextAddressAttempting: state.accounts.getNextAddressAttempting,
        getIncomingTransaction: (address: string) => {
            if (address == "") {
                return []
            }
            return getAddressTransactions(state, address)
        },
    }
}

const mapDispatchToProps = {
    loadNextAddressAttempt,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveDialog)
