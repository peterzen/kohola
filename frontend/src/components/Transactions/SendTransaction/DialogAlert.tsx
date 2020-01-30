import * as React from "react"


import { Alert } from 'react-bootstrap';
import { AppError } from "../../../store/types";

import { LoadingButton, Amount, TxHash } from "../../Shared/shared"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'


const DialogAlert = (props: {
	error: AppError | null;
}) => {

	if (props.error == null)
		return null;
	let msg = "";

	switch (props.error.status) {
		case 8:
			msg = "Insufficient balance."
			break;
		case 2:
			msg = "Generating next address violates the unused address gap limit policy."
			break;

		default:
			msg = props.error.msg;
			break;
	}

	return (
		<Alert variant="danger" className="mt-3 mb-3 p-2">
			<FontAwesomeIcon icon={faExclamationCircle} />
			{msg}
		</Alert>
	);
};


export default DialogAlert
