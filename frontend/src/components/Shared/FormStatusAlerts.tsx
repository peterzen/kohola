import * as React from "react"

import { Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faCheck } from '@fortawesome/free-solid-svg-icons'

import { AppError } from "../../store/types";

interface IErrorAlertProps {
	error: AppError | null
}

export const ErrorAlert = (props: IErrorAlertProps) => {

	if (props.error == null) return null;

	const { message } = props.error

	return (
		<Alert variant="danger" className="mt-3 mb-3 p-2">
			<FontAwesomeIcon icon={faExclamationCircle} /> <span>{message}</span>
		</Alert>
	)
}

interface ISuccessAlertProps {
	message: string
}

export const SuccessAlert = (props: ISuccessAlertProps) => {

	if (props.message == null) return null;
	return (
		<Alert variant="success" className="mt-3 mb-3 p-2">
			<FontAwesomeIcon icon={faCheck} /> <span >{props.message}</span>
		</Alert>
	)
}

