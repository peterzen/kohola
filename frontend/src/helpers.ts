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


export function reverseHash(s: string) {
	s = s.replace(/^(.(..)*)$/, "0$1"); // add a leading zero if needed
	let a = s.match(/../g);             // split number in groups of two
	if (a !== null) {
		a.reverse();                        // reverse the groups
		var s2 = a.join("");
		return s2;
	}
	return "";
}

