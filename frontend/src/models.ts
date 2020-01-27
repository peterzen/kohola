import {
	PingResponse,
	NetworkResponse,
	AgendasResponse,
	BalanceResponse,
	AccountsResponse,
	BestBlockResponse,
	StakeInfoResponse,
	TransactionDetails,
	GetTicketsResponse,
	NextAddressResponse,
	TicketPriceResponse,
	VoteChoicesResponse,
	StopAutoBuyerResponse,
	TicketBuyerConfigResponse,
	LoadActiveDataFiltersResponse,
} from './proto/api_pb';
import { TransactionDirection, TicketStatus, TicketStatusLabels } from './constants';
import { reverseHash } from './helpers';
import moment = require('moment');

export class Agenda extends AgendasResponse.Agenda {}
export class Agendas extends AgendasResponse { }
export class Network extends NetworkResponse {}
export class BestBlock extends BestBlockResponse { }
export class StakeInfo extends StakeInfoResponse {}
export class WalletPing extends PingResponse { }
export class TicketPrice extends TicketPriceResponse { }
export class NextAddress extends NextAddressResponse { }
export class VoteChoices extends VoteChoicesResponse {}
export class StopAutoBuyer extends StopAutoBuyerResponse {}
export class WalletAccounts extends AccountsResponse { }
export class TicketBuyerConfig extends TicketBuyerConfigResponse {}
export class LoadActiveDataFilters extends LoadActiveDataFiltersResponse {}

type WalletAccountAsObject = {
	timestamp: Date
	height: number
	blockHash: string
	index: number
	hash: string
	type: string
	debitsAmount: number
	creditsAmount: number
	direction: TransactionDirection
	amount: number
	fee: number
	debitAccounts: WalletAccount[]
	creditAddresses: string[]
}

export class WalletAccount extends AccountsResponse.Account {
	constructor(id?: number) {
		super();
		if (id != undefined) {
			this.setAccountNumber(id);
		}
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
	_isMined: boolean = false;

	constructor(tx?: TransactionDetails, isMined?:boolean) {
		if (tx === undefined) {
			return;
		}
		if (isMined != undefined) {
			this._isMined = isMined;
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
	isMined() {
		return this._isMined;
	}
	setIsMined(flag: boolean) {
		this._isMined = flag;
	}
	getTypeAsString() {
		switch (this.type) {
			case 0: return 'regular'
			case 1: return 'sstx'
			case 2: return 'vote'
			case 3: return 'revocation'
			case 4: return 'coinbase'
			default: return "unknown"
		};
	}
	toObject(): WalletAccountAsObject {
		return {
			timestamp: this.timestamp.toDate(),
			height: this.height,
			blockHash: this.getBlockHash(),
			index: this.index,
			hash: this.txHash,
			type: this.getTypeAsString(),
			debitsAmount: this.debitsAmount,
			creditsAmount: this.creditsAmount,
			direction: this.direction,
			amount: this.amount,
			fee: this.fee,
			debitAccounts: this.debitAccounts,
			creditAddresses: this.creditAddresses
		}
	}
}

export class Ticket {
	private spender: Transaction | undefined;
	private tx: Transaction;
	private status: TicketStatus;
	private statusLabel: string;

	constructor(td: GetTicketsResponse.TicketDetails) {
		this.tx = new Transaction(td.getTicket());
		if (td.hasSpender()) {
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


export class AccountBalance extends BalanceResponse {

	private accountNumber: number;

	constructor(accountNumber?: number) {
		super();
		if (accountNumber != undefined) {
			this.accountNumber = accountNumber;
		}
	}

	setAccountNumber(accountNumber: number) {
		this.accountNumber = accountNumber;
	}

	getAccountNumber() {
		return this.accountNumber;
	}
}


export interface WalletBalance {
	[accountNumber: number]: AccountBalance;
}

export interface IndexedWalletAccounts {
	[accountNumber: number]: WalletAccount
}

