export enum TransactionType {
    REGULAR = 0,
    COINBASE = 4,
    TICKET_PURCHASE = 1,
    VOTE = 2,
    REVOCATION = 3,
}

export enum TransactionDirection {
    TRANSACTION_DIR_RECEIVED = 0,
    TRANSACTION_DIR_TRANSFERRED = 1,
    TRANSACTION_DIR_SENT = 2,
}

export enum TicketStatus {
    UNKNOWN = 0,
    UNMINED = 1,
    IMMATURE = 2,
    LIVE = 3,
    VOTED = 4,
    MISSED = 5,
    EXPIRED = 6,
    REVOKED = 7,
}

export const TicketStatusLabels = {
    0: "UNKNOWN",
    1: "UNMINED",
    2: "IMMATURE",
    3: "LIVE",
    4: "VOTED",
    5: "MISSED",
    6: "EXPIRED",
    7: "REVOKED",
}

export const ATOMS_DIVISOR = 100000000
export const DEFAULT_FEE = 0.00004
export const DEFAULT_REQUIRED_CONFIRMATIONS = 3

export const CONSTRUCTTX_OUTPUT_SELECT_ALGO_UNSPECIFIED = 0
export const CONSTRUCTTX_OUTPUT_SELECT_ALGO_ALL = 1

export enum Networks {
    MAINNET,
    TESTNET,
    SIMNET,
}

export interface CurrencyNetType {
    [activeNetwork: number]: number
}

// https://github.com/decred/dcrd/blob/master/wire/protocol.go
export const CurrencyNet: CurrencyNetType = {
    3652452601: Networks.MAINNET,
    2979310197: Networks.TESTNET,
    303307798: Networks.SIMNET,
}

type Configuration = {
    CurrentNetwork: Networks
}

export const Configuration: Configuration = {
    CurrentNetwork: Networks.TESTNET,
}

export const transitionGroupProps = {
    appear: true,
    enter: true,
    exit: true,
}

export enum DisplayUnit {
    DCR = 0,
    ATOMS = 1,
}

export enum FiatCurrency {
    USD = 0,
    EUR = 1,
}

export enum Theme {
    LIGHT = 0,
    DARK = 1,
}