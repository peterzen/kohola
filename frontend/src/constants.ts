export enum TransactionType {
	REGULAR = 0,
	COINBASE = 4,
	TICKET_PURCHASE = 1,
	VOTE = 2,
	REVOCATION = 3
}
export enum TransactionDirection {
	TRANSACTION_DIR_RECEIVED = 0,
	TRANSACTION_DIR_TRANSFERRED = 1,
	TRANSACTION_DIR_SENT = 2
}

export enum TicketStatus {
	UNKNOWN = 0,
	UNMINED = 1,
	IMMATURE = 2,
	LIVE = 3,
	VOTED = 4,
	MISSED = 5,
	EXPIRED = 6,
	REVOKED = 7
}

export const TicketStatusLabels = {
	0: 'UNKNOWN',
	1: 'UNMINED',
	2: 'IMMATURE',
	3: 'LIVE',
	4: 'VOTED',
	5: 'MISSED',
	6: 'EXPIRED',
	7: 'REVOKED'
}

