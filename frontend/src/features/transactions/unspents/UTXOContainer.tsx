import * as React from "react"
import { connect } from "react-redux"
import _ from "lodash"

import { Card } from "react-bootstrap"

import UTXODetailsComponent from "./UTXODetailsComponent"
import ListUTXOs from "./ListUTXOs"
import { WalletAccount } from "../../../middleware/models"
import { fetchUnspentsAttempt, getUTXOs } from "./unspentsSlice"
import { IApplicationState } from "../../../store/types"
import { UnspentOutput } from "../../../proto/walletgui_pb"
import GenericModal from "../../../components/Shared/GenericModal"

class UTXOContainer extends React.Component<Props, InternalState> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showModal: false,
            selectedItem: null,
        }
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <Card.Title>
                        Unspent transaction outputs{" "}
                        <small className="text-muted">
                            ({this.props.utxoList.length})
                        </small>
                    </Card.Title>
                </Card.Header>

                <ListUTXOs
                    utxos={this.props.utxoList}
                    menuHandler={_.bind(this.menuHandler, this)}
                />

                <GenericModal
                    size="lg"
                    footer={true}
                    title="UTXO details"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}>
                    <UTXODetailsComponent utxo={this.state.selectedItem} />
                </GenericModal>
            </Card>
        )
    }

    menuHandler(evtKey: string, utxo: UnspentOutput) {
        this.setState({
            showModal: true,
            selectedItem: utxo,
        })
    }

    componentDidMount() {
        this.props.fetchUnspentsAttempt(this.props.account.getAccountNumber())
    }
}

interface OwnProps {
    account: WalletAccount
}

interface StateProps {
    utxoList: UnspentOutput[]
}

type Props = OwnProps & StateProps & DispatchProps

interface InternalState {
    showModal: boolean
    selectedItem: UnspentOutput | null
}

const mapStateToProps = (
    state: IApplicationState,
    ownProps: OwnProps
): StateProps => {
    return {
        utxoList: getUTXOs(state, ownProps.account.getAccountNumber()),
    }
}

interface DispatchProps {
    fetchUnspentsAttempt: typeof fetchUnspentsAttempt
}

const mapDispatchToProps = {
    fetchUnspentsAttempt,
}

export default connect(mapStateToProps, mapDispatchToProps)(UTXOContainer)
