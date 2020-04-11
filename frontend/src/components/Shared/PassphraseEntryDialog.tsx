import * as React from "react"
import _ from "lodash"

import { Button, Modal, Form, Row, Col } from "react-bootstrap"

let setState: any | null = null
let promise: Promise<string> | null = null

let dialogComponent: PassphraseEntryDialog | null = null
let dialogResolve: (passphrase: string) => void, dialogReject

export const askPassphrase = () => {
    if (setState == null) {
        console.warn("setState==null")
        return Promise.reject("setState==null")
    }
    if (dialogComponent == null) {
        console.warn("dialogComponent null")
        return Promise.reject("dialogComponent null")
    }
    dialogComponent.showModal()
    promise = new Promise<string>((resolve, reject) => {
        dialogResolve = resolve
        dialogReject = reject
    })
    return promise
}

export default class PassphraseEntryDialog extends React.Component<
    Props,
    InternalState
> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showModal: false,
            inputRef: React.createRef(),
        }
        dialogComponent = this
    }

    render() {
        return (
            <Modal
                centered
                onEntered={() => this.state.inputRef.current?.focus()}
                onExit={_.bind(this.onExit, this)}
                show={this.state.showModal}
            >
                <Form>
                    <Modal.Header closeButton>Unlock wallet</Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                autoComplete="off"
                                name="passphrase"
                                type="password"
                                ref={this.state.inputRef}
                                placeholder="Wallet passphrase"
                                defaultValue=""
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="text-right pr-4">
                            <Button
                                variant="secondary"
                                onClick={() =>
                                    this.setState({ showModal: false })
                                }
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                onClick={_.bind(this.handleFormSubmit, this)}
                                variant="primary"
                            >
                                Unlock
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
    showModal() {
        this.setState({ showModal: true })
    }
    hideModal() {
        this.setState({ showModal: false })
    }
    componentDidMount() {
        setState = this.setState
    }
    onExit() {
        // console.log("onExit")
    }
    onChange() {
        this.setState({})
    }
    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.stopPropagation()
        e.preventDefault()
        const passphrase = e.currentTarget.form.elements.passphrase.value
        if (promise != null && passphrase !== undefined && passphrase != "") {
            dialogResolve(passphrase)
        }
        this.hideModal()
    }
}

interface OwnProps {
    show: boolean
}

interface DispatchProps {
    // onSomeEvent: () => void
}

type Props = DispatchProps & OwnProps

interface InternalState {
    showModal: boolean
    inputRef: React.RefObject<any>
}
