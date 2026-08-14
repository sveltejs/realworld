import { describe, expect, it } from 'vitest';
import { handle } from './hooks.server.js';

function run(cookie) {
	const event = {
		cookies: { get: () => cookie },
		locals: {}
	};
	handle({ event, resolve: () => 'resolved' });
	return event.locals.user;
}

describe('handle', () => {
	it('parses the user from the jwt cookie', () => {
		const user = { username: 'jane', token: 'secret' };

		expect(run(btoa(JSON.stringify(user)))).toEqual(user);
	});

	it('treats a missing cookie as logged out', () => {
		expect(run(undefined)).toBe(null);
	});

	it('treats a corrupt cookie as logged out instead of crashing', () => {
		expect(run('%%%not-base64%%%')).toBe(null);
	});

	it('parses users with unicode bios (btoa-era cookies could never contain these)', () => {
		const user = { username: 'jane', bio: 'café ☕ 🎉', token: 'secret' };
		const cookie = Buffer.from(JSON.stringify(user), 'utf8').toString('base64');

		expect(run(cookie)).toEqual(user);
	});
});
