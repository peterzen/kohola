import { AccountsResponse, TransactionDetails, GetTicketsResponse } from './proto/api_pb';
import { TransactionDirection } from './constants';
import { reverseHash } from './store';
import moment = require('moment');
export class WalletAccount extends AccountsResponse.Account {
	constructor(id: number) {
		super();
		this.setAccountNumber(id);
	}
}
export class Transaction {
	timestamp: moment.Moment;
	height: number;
	blockHash: string;
	index: number;
	hash: Uint8Array | string;
	txHash: string;
	type: TransactionDetails.TransactionTypeMap[keyof TransactionDetails.TransactionTypeMap];
	debitsAmount: number;
	creditsAmount: number;
	direction: TransactionDirection;
	amount: number;
	fee: number;
	debitAccounts: WalletAccount[] = [];
	creditAddresses: string[] = [];
	constructor(tx: TransactionDetails | undefined) {
		if (tx === undefined) {
			return;
		}
		this.timestamp = moment.unix(tx.getTimestamp());
		this.txHash = reverseHash(Buffer.from(tx.getHash_asU8()).toString("hex"));
		const inputAmounts = tx.getDebitsList().reduce((s, input) => s + input.getPreviousAmount(), 0);
		const outputAmounts = tx.getCreditsList().reduce((s, input) => s + input.getAmount(), 0);
		this.amount = outputAmounts - inputAmounts;
		this.fee = tx.getFee();
		this.type = tx.getTransactionType();
		tx.getDebitsList().forEach((debit) => {
			const a = new WalletAccount(debit.getPreviousAccount());
			this.debitAccounts.push(a);
		});
		tx.getCreditsList().forEach((credit) => {
			this.creditAddresses.push(credit.getAddress());
		});
		if (this.type === TransactionDetails.TransactionType.REGULAR) {
			if (this.amount > 0) {
				this.direction = TransactionDirection.TRANSACTION_DIR_RECEIVED;
			}
			else if (this.amount < 0 && (this.fee == Math.abs(this.amount))) {
				this.direction = TransactionDirection.TRANSACTION_DIR_TRANSFERRED;
			}
			else {
				this.direction = TransactionDirection.TRANSACTION_DIR_SENT;
			}
		}
	}
	getTimestamp() {
		return this.timestamp;
	}
	getHash() {
		return this.txHash;
	}
	getHeight() {
		return this.height;
	}
	getBlockHash() {
		return this.blockHash;
	}
	getIndex() {
		return this.index;
	}
	getType() {
		return this.type;
	}
	getDebitsAmount() {
		return this.debitsAmount;
	}
	getCreditsAmount() {
		return this.creditsAmount;
	}
	getDirection() {
		return this.direction;
	}
	getAmount() {
		return this.amount;
	}
	getFee() {
		return this.fee;
	}
	getDebitAccounts() {
		return this.debitAccounts;
	}
	getCreditAddresses() {
		return this.creditAddresses;
	}
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



export class Ticket {
	private spender: Transaction | undefined;
	private tx: Transaction;
	private status: TicketStatus;
	private statusLabel: string;

	constructor(td: GetTicketsResponse.TicketDetails) {
		this.tx = new Transaction(td.getTicket());
		if (td.getSpender() != undefined) {
			this.spender = new Transaction(td.getSpender());
		}
		this.status = td.getTicketStatus();
		this.statusLabel = TicketStatusLabels[this.status];
	}

	public getStatusLabel(): string {
		return this.statusLabel;
	}
	public getStatus(): TicketStatus {
		return this.status;
	}
	public getTx(): Transaction {
		return this.tx;
	}
	public getSpender(): Transaction | undefined {
		return this.spender;
	}
}