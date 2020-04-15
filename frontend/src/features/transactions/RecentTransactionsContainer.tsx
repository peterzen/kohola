import _ from "lodash"
import * as React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBook } from "@fortawesome/free-solid-svg-icons"
import { Card } from "react-bootstrap"

import { Transaction } from "../../middleware/models"
import TransactionTable from "./TransactionTable"
import TransactionDetailsComponent from "./TransactionDetailsComponent"
import GenericModal from "../../components/Shared/GenericModal"

export default class RecentTransactionsComponent extends React.Component<
    Props,
    InternalState
    > {
    constructor(props: Props) {
        super(props)
        this.state = {
            showModal: false,
            selectedItem: null,
        }
    }

    render() {
        const txList = this.props.txList
        return (
            <Card>
                <Card.Header>
                    <Card.Title>
                        Recent transactions{" "}
                        <small className="text-muted">({txList.length})</small>
                    </Card.Title>
                </Card.Header>
                <TransactionTable
                    items={txList}
                    onItemClick={_.bind(this.itemClickHandler, this)}
                    showAccount={this.props.showAccount}
                />

                <GenericModal
                    size="lg"
                    footer={true}
                    title="Transaction details"
                    show={this.state.showModal}
                    onHide={() => this.setState({ showModal: false })}
                >
                    <TransactionDetailsComponent tx={this.state.selectedItem} />
                </GenericModal>

            </Card>
        )
    }
    itemClickHandler(tx: Transaction) {
        this.setState({
            showModal: true,
            selectedItem: tx,
        })
    }
}

interface OwnProps {
    showAccount?: boolean
    txList: Transaction[]
}

interface InternalState {
    showModal: boolean
    selectedItem: Transaction | null
}

type Props = OwnProps
