import _ from 'lodash'
import * as React from 'react';
import { Toast } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCheck, faInfo, faExclamation } from '@fortawesome/free-solid-svg-icons';

import { Transaction } from '../../../models';
import { TransactionType } from '../../../constants';
import { Amount } from '../../../components/Shared/shared';


export const showTransactionToast = (tx: Transaction) => {
	
	const toastProps: IToastNotificationProps = {
		title: "",
		message: "",
		variant: "default",
		icon: faCheck,
	}

	switch (tx.getType()) {
		case TransactionType.COINBASE:
			toastProps.title = "DCR mined"
			toastProps.message = <Amount amount={tx.getAmount()} showCurrency={true} />
			break;

		case TransactionType.REGULAR:
			toastProps.title = "New transaction"
			toastProps.message = <Amount amount={tx.getAmount()} showCurrency={true} />
			break;

		case TransactionType.TICKET_PURCHASE:
			toastProps.title = "Ticket purchased"
			toastProps.message = <Amount amount={tx.getAmount()} showCurrency={true} />
			break;

		case TransactionType.VOTE:
			toastProps.title = "Vote"
			toastProps.message = `Voted on ticket`
			break;

		case TransactionType.REVOCATION:
			toastProps.title = "Ticket revoked"
			toastProps.message = ``
			break;
	}
	toast(<ToastNotification {...toastProps} />)
}

export const showInfoToast = (title: string, message: string) => {
	const toastProps: IToastNotificationProps = {
		title: title,
		message: message,
		variant: "default",
		icon: faInfo,
	}
	toast(<ToastNotification {...toastProps} />)
}

export const showDangerToast = (title: string, message: string) => {
	const toastProps: IToastNotificationProps = {
		title: title,
		message: message,
		variant: "danger",
		icon: faExclamation,
	}
	toast(<ToastNotification {...toastProps} />)
}



interface IToastNotificationProps {
	title: string
	message: string | JSX.Element
	variant: string
	icon: IconDefinition
}

export const ToastNotification = (props: IToastNotificationProps) => {
	return (
		<Toast
			animation={false}
			autohide={false}
		>
			<Toast.Header closeButton={false}>
				<FontAwesomeIcon icon={props.icon} />{" "}
				<strong className="mr-auto">{props.title}</strong>{" "}
				<small>just now</small>
			</Toast.Header>
			<Toast.Body>
				{props.message}
			</Toast.Body>
		</Toast>
	)
}

export const AppToastContainer = () => {
	return (
		<ToastContainer
			pauseOnFocusLoss={true}
			autoClose={5000}
		/>
	)
}

