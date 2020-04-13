import * as React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { Alert } from "react-bootstrap"

import { AppError } from "../../../store/types"

interface IDialogAlertProps {
    error: AppError | null
}

const DialogAlert = (props: IDialogAlertProps) => {
    if (props.error == null) return null

    let msg = ""
    // console.error("Unhandled ERROR in DialogAlert", props.error)

    switch (props.error.code) {
        case 8:
            msg = "Insufficient balance."
            break
        case 2:
            msg =
                "Generating next address violates the unused address gap limit policy."
            break

        default:
            msg = props.error.message
            break
    }
    return (
        <Alert variant="danger" className="mt-3 mb-3 p-2">
            <FontAwesomeIcon icon={faExclamationCircle} /> <span>{msg}</span>
        </Alert>
    )
}

export default DialogAlert
