import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { TxHash } from "./shared";


export const TxConfirmationPanel = (props: {
	hashes: Uint8Array[];
}) => {
	return (<div className="text-center">
		<h1 className="text-success"><FontAwesomeIcon icon={faCheck} className="lg" /></h1>
		<p>The transaction has been broadcast</p>
		{props.hashes.map((h) => <div><TxHash hash={Buffer.from(h)} truncate={true} /></div>)}
	</div>);
};
