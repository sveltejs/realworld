import { describe, expect, it } from 'vitest';
import { decode_session, encode_session } from './session.js';

describe('session cookie codec', () => {
	it('round-trips a plain user', () => {
		const user = { username: 'jane', token: 'secret' };

		expect(decode_session(encode_session(user))).toEqual(user);
	});

	it('round-trips unicode bios and usernames (btoa would throw)', () => {
		const user = { username: 'żaneta', bio: 'café ☕ & 中文 🎉', token: 'secret' };

		expect(decode_session(encode_session(user))).toEqual(user);
	});

	it('decodes legacy cookies that were encoded with btoa', () => {
		const user = { username: 'jane', token: 'secret' };

		expect(decode_session(btoa(JSON.stringify(user)))).toEqual(user);
	});
});
