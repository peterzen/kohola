import { AccountsResponse, TransactionDetails, GetTicketsResponse, BestBlockResponse } from './proto/api_pb';
import { TransactionDirection, TicketStatus, TicketStatusLabels } from './constants';
import { reverseHash } from './helpers';
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

export class ChainInfo {

	bestBlock: BestBlockResponse;

	constructor(bestBlock: BestBlockResponse | undefined) {
		if (bestBlock == undefined) {
			this.bestBlock = new BestBlockResponse();
			return;
		}
		this.bestBlock = bestBlock;
	}

	getBestBlockHeight(): number {
		return this.bestBlock.getHeight();
	}

	getBestBlockHash(): string {
		return reverseHash(Buffer.from(this.bestBlock.getHash_asU8()).toString("hex"));
	}
}

export class TransactionsListResult {

	private minedTx: Transaction[] = []
	private unminedTx: Transaction[] = []

	getUnminedTxList(): Transaction[] {
		return this.unminedTx;
	}

	getMinedTxList(): Transaction[] {
		return this.minedTx;
	}

	addMinedTx(txList: Transaction[]) {
		this.minedTx.push(...txList);
	}

	addUnminedTx(txList: Transaction[]) {
		this.unminedTx.push(...txList);
	}

	getUnminedTxCount() {
		return this.unminedTx.length;
	}

	getMinedTxCount() {
		return this.minedTx.length;
	}

	getTxCount() {
		return this.minedTx.length + this.unminedTx.length;
	}
}