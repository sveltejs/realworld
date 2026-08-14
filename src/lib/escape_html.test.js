import { describe, expect, it } from 'vitest';
import { escape_html } from './escape_html.js';

describe('escape_html', () => {
	it('leaves plain text unchanged', () => {
		expect(escape_html('hello world')).toBe('hello world');
	});

	it('escapes ampersands, less-than and greater-than', () => {
		expect(escape_html('a & b < c > d')).toBe('a &amp; b &lt; c &gt; d');
	});

	it('escapes ampersands first so entities are not double-decoded', () => {
		expect(escape_html('&lt;')).toBe('&amp;lt;');
	});

	it('neutralizes a </textarea> breakout attempt', () => {
		expect(escape_html('</textarea><script>alert(1)</script>')).toBe(
			'&lt;/textarea&gt;&lt;script&gt;alert(1)&lt;/script&gt;'
		);
	});

	it('coerces non-string values', () => {
		expect(escape_html(null)).toBe('null');
		expect(escape_html(42)).toBe('42');
	});
});
