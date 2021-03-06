import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons"

import { rawHashToHex } from "../../helpers/byteActions"
import { Transaction } from "../../middleware/models"
import { TxHash } from "./TransactionHash"

export const TxConfirmationPanel = (props: { hashes: Uint8Array[] }) => {
    return (
        <div className="text-center">
            <h1 className="text-success">
                <FontAwesomeIcon icon={faCheck} className="lg" />
            </h1>
            <p>The transaction has been broadcast</p>
            {props.hashes.map((h) => (
                <div key={rawHashToHex(h)?.toString()}>
                    <TxHash hash={Buffer.from(h)} truncate={true} />
                </div>
            ))}
        </div>
    )
}

interface IIncomingTxPanelProps {
    tx: Transaction
}
export const IncomingTxPanel = (props: IIncomingTxPanelProps) => {
    return (
        <div className="text-center">
            <h1 className="text-success">
                <FontAwesomeIcon icon={faAngleDoubleDown} className="lg" />
            </h1>
            <p>Incoming transaction</p>
            {props.tx.getHash()}
        </div>
    )
}
