import _ from "lodash"
import * as React from "react"
import { Toast } from "react-bootstrap"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { NotificationProps } from "./notifications"


export const ToastNotification = (props: NotificationProps) => {
    return (
        <Toast animation={false} autohide={false}>
            <Toast.Header closeButton={false}>
                <FontAwesomeIcon icon={props.icon} />{" "}
                <strong className="mr-auto">{props.title}</strong>{" "}
                <small>just now</small>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )
}

export const AppToastContainer = () => {
    return <ToastContainer pauseOnFocusLoss={true} autoClose={5000} />
}

export const sendToastNotification = (props: NotificationProps) => {
    toast(<ToastNotification {...props} />)
}
