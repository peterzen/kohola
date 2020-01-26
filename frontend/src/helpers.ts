import * as moment from 'moment';


export function formatTimestamp(ts: moment.Moment): string {
	return ts.fromNow();
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

export function formatHash(hash: string) {
	return Buffer.from(hash).toString("hex")
}
