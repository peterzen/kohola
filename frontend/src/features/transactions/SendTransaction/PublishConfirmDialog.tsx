import _ from "lodash"
import * as React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { PublishTransactionResponse } from "../../../proto/api_pb";
import { TxHash } from "../../../components/Shared/shared";

export default class PublishConfirmDialog extends React.Component<OwnProps>{
	render() {
		return (
			<div className="text-center">
				<h1 className="text-success"><FontAwesomeIcon icon={faCheck} className="lg" /></h1>
				<p>The transaction has been broadcast</p>
				<p><TxHash hash={Buffer.from(this.props.publishTransactionResponse.getTransactionHash_asU8())} truncate={false}/></p>
			</div>
		)
	}
}

interface OwnProps {
	publishTransactionResponse: PublishTransactionResponse
}

