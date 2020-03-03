import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faQuestion,
	faClock,
	faCircle,
	faPlayCircle,
	faCheckDouble,
	faMinusCircle,
	faHistory,
	faUndo
} from '@fortawesome/free-solid-svg-icons'
import { TicketStatusLabels, TicketStatus } from '../../constants';


const ticketStatusIcons = {
	0: faQuestion,
	1: faClock,
	2: faCircle,
	3: faPlayCircle,
	4: faCheckDouble,
	5: faMinusCircle,
	6: faHistory,
	7: faUndo,
}

interface ITicketStatusIcon {
	status: TicketStatus
}

export const TicketStatusIcon: any = (props: ITicketStatusIcon) => {
	const statusIcon = ticketStatusIcons[props.status];
	const statusLabel = TicketStatusLabels[props.status];
	return (
		<span title={statusLabel} className="status-icon"><FontAwesomeIcon icon={statusIcon} /></span>
	)
}
