/**
 * Encode/decode the session cookie payload (base64 JSON).
 *
 * Buffer instead of btoa/atob: btoa throws on characters outside Latin-1, so a
 * bio or username containing an emoji or accented text would 500 on login.
 * The output is byte-identical for Latin-1 input, so existing cookies keep
 * decoding.
 */
export function encode_session(user) {
	return Buffer.from(JSON.stringify(user), 'utf8').toString('base64');
}

export function decode_session(value) {
	return JSON.parse(Buffer.from(value, 'base64').toString('utf8'));
}
