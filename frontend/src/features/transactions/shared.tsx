import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faPaperPlane,
    faCashRegister,
    faCoins,
    faBook,
} from "@fortawesome/free-solid-svg-icons"

export const RecentTxTitle = () => (
    <span>
        <FontAwesomeIcon icon={faBook} /> Recent transactions
    </span>
)
export const SendTitle = () => (
    <span>
        <FontAwesomeIcon icon={faPaperPlane} /> Send
    </span>
)
export const ReceiveTitle = () => (
    <span>
        <FontAwesomeIcon icon={faCashRegister} /> Receive
    </span>
)
export const CoinsTitle = () => (
    <span>
        <FontAwesomeIcon icon={faCoins} /> UTXOs
    </span>
)
