import * as React from "react"

import { Alert } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'

import { AppError } from "../../store/types";

interface IErrorAlertProps {
	error: AppError | null
}

const ErrorAlert = (props: IErrorAlertProps) => {

	if (props.error == null) return null;

	const { code, message } = props.error

	return (
		<Alert variant="danger" className="mt-3 mb-3 p-2">
			<FontAwesomeIcon icon={faExclamationCircle} /> <span title={code.toString()}>{message}</span>
		</Alert>
	)
}

export default ErrorAlert
