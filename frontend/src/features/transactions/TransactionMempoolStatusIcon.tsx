import * as React from "react"
import _ from "lodash"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"


const TransactionMempoolStatusIcon: any = (props: {
    isMined: boolean
}) => {
    return (
        <span title="In the mempool" className="status-icon">
            {props.isMined ? "" : <FontAwesomeIcon icon={faClock} className="mr-3"/>}
        </span>
    )
}

export default TransactionMempoolStatusIcon
