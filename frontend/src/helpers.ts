import * as moment from 'moment';


export function formatTimestamp(ts: moment.Moment): string {
    return ts.fromNow();
}

export function formatAmount(atoms: number) {
    return atoms / 100000000;
}

export function formatTxType(txType: number): string {
    switch (txType) {
        case 0: return 'regular'
        case 1: return 'sstx'
        case 2: return 'vote'
        case 3: return 'revocation'
        case 4: return 'coinbase'
    };
    return 'unknown'
}
