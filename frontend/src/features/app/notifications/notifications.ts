import _ from "lodash"
import * as React from "react"

import { toast } from "react-toastify"
import { ActionCreator } from "@reduxjs/toolkit"

import {
    IconDefinition,
    faCheck,
    faInfo,
    faExclamation,
} from "@fortawesome/free-solid-svg-icons"

import { Transaction } from "../../../middleware/models"
import { TransactionType, TransactionDirection } from "../../../constants"
import { sendToastNotification } from "./Toasts"
import AppBackend from "../../../middleware/appbackend"
import { AmountString } from "../../../helpers/helpers"

export const displayTXNotification: ActionCreator<any> = (tx: Transaction) => {
    return async () => {
        console.log("TX TOAST", tx.toObject())
        const ntfnProps: NotificationProps = {
            title: "",
            message: "",
            variant: "default",
            icon: faCheck,
        }

        switch (tx.getType()) {
            case TransactionType.COINBASE:
                ntfnProps.title = "DCR mined"
                ntfnProps.message = AmountString(tx.getAmount(), true)
                break

            case TransactionType.REGULAR:
                switch (tx.getDirection()) {
                    case TransactionDirection.TRANSACTION_DIR_RECEIVED:
                        ntfnProps.title = "Funds received"
                        break
                    case TransactionDirection.TRANSACTION_DIR_SENT:
                        ntfnProps.title = "Transaction sent"
                        break
                    case TransactionDirection.TRANSACTION_DIR_TRANSFERRED:
                        ntfnProps.title = "Transfer completed"
                        break
                }
                ntfnProps.message = AmountString(tx.getAmount(), true)
                break

            case TransactionType.TICKET_PURCHASE:
                ntfnProps.title = "Ticket purchased"
                ntfnProps.message = AmountString(tx.getAmount(), true)
                break

            case TransactionType.VOTE:
                ntfnProps.title = "Vote"
                ntfnProps.message = `Voted on ticket`
                break

            case TransactionType.REVOCATION:
                ntfnProps.title = "Ticket revoked"
                ntfnProps.message = ``
                break
        }
        sendNotification(ntfnProps)
    }
}

export const showInfoToast = (title: string, message: string) => {
    const ntfnProps: NotificationProps = {
        title: title,
        message: message,
        variant: "default",
        icon: faInfo,
    }
    sendNotification(ntfnProps)
}

export const showDangerToast = (title: string, message: string) => {
    const ntfnProps: NotificationProps = {
        title: title,
        message: message,
        variant: "danger",
        icon: faExclamation,
    }
    sendNotification(ntfnProps)
}

export interface NotificationProps {
    title: string
    message: string
    variant: string
    icon: IconDefinition
}


export const sendNotification = async (ntfnProps: NotificationProps) => {
    try {
        await AppBackend.sendDesktopNotification(
            ntfnProps.title,
            ntfnProps.message
        )
    } catch (error) {
        sendToastNotification(ntfnProps)
    }
}
