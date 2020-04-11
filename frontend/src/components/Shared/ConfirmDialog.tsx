import * as React from "react"
import _ from "lodash"

import { Button, Modal, Form } from "react-bootstrap"

export const confirmDialog = (
    title: string = "Are you sure?",
    okButtonLabel: string = "OK",
    cancelButtonLabel: string = "Cancel",
    callback: (result: boolean) => void
) => {
    return ConfirmDialog({
        dialogTitle: title,
        okButtonLabel: okButtonLabel,
        cancelButtonLabel: cancelButtonLabel,
        onSelect: callback,
    })
}

const ConfirmDialog = (props: Props) => {
    return (
        <Modal centered show={true}>
            <Form>
                <Modal.Header>
                    <Modal.Title>Please confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.dialogTitle}</Modal.Body>
                <Modal.Footer>
                    <div className="text-right">
                        <Button
                            variant="secondary"
                            onClick={() => props.onSelect(false)}
                        >
                            {props.cancelButtonLabel}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => props.onSelect(true)}
                        >
                            {props.okButtonLabel}
                        </Button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

interface Props {
    dialogTitle: string
    cancelButtonLabel: string
    okButtonLabel: string
    onSelect: (result: boolean) => void
}
