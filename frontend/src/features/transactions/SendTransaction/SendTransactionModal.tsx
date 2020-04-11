import _ from "lodash"
import * as React from "react"

import { Modal } from "react-bootstrap"
import SendDialogContainer from "./SendDialogContainer"

export default class SendTransactionModal extends React.Component<Props> {
    render() {
        return (
            <Modal
                centered
                onEntered={() => this.onEntered()}
                onExit={() => this.onExit()}
                show={this.props.show}
                onHide={() => this.props.onHide()}
                animation={true}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Send DCR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SendDialogContainer cancel={() => this.onCancel()} />
                </Modal.Body>
            </Modal>
        )
    }
    onCancel() {
        this.props.onHide()
    }
    onEntered() {
        // console.log("GenericModalDialog onEntered")
    }
    onExit() {
        // console.log("onExit")
    }
}

interface Props {
    show: boolean
    onHide: () => void
}
