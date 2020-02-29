
// @flow
export function reverseHash(s: string) {
	s = s.replace(/^(.(..)*)$/, "0$1"); // add a leading zero if needed
	var a = s.match(/../g);             // split number in groups of two
	a.reverse();                        // reverse the groups
	var s2 = a.join("");
	return s2;
}

// reverseRawHash reverses a hash encoded as Uint8Array (instead of as string)
export function reverseRawHash(arr: Uint8Array) {
	return reverseHash(Buffer.from(arr).toString("hex"));
}

// strHashToRaw converts a (reversed) string hash into an Uint8Array.
export function strHashToRaw(hash: string) {
	return new Uint8Array(Buffer.from(hash, "hex").reverse());
}

// Convert hash encoded as raw bytes into an hex (reversed) string hash.
export function rawHashToHex(raw: Uint8Array) {
	return reverseHash(Buffer.from(raw).toString("hex"));
}

// Convert raw bytes (from grpc endpoint) to hex
export function rawToHex(bin: ArrayBuffer | Uint8Array): string {
	return Buffer.from(bin).toString("hex");
}

export function hexToRaw(hex: string) {
	return new Uint8Array(Buffer.from(hex, "hex"));
}

// hexReversedHashToArray converts a (reversed, hex-encoded) hash string into
// an Uint8Array, suitable for sending into grpc calls.
export function hexReversedHashToArray(hexStr: string) {
	const res = new Uint8Array(Buffer.from(hexStr, "hex"));
	res.reverse();
	return res;
}



// str2utf8hex converts a (js, utf-16) string into (utf-8 encoded) hex.
export function str2utf8hex(str: string) {
	return Buffer.from(str).toString("hex");
}

export function hex2b64(hex) {
	return new Buffer(hex, "hex").toString("base64");
}
