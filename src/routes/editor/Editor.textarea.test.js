import { describe, expect, it } from 'vitest';
import { render } from 'svelte/server';
import Editor from './Editor.svelte';

// Finding 2: the HTML parser drops a single newline immediately after
// <textarea> (https://html.spec.whatwg.org/multipage/syntax.html#element-restrictions),
// so a body that starts with "\n" silently loses it on every edit round-trip.

/** Extract the textarea content and decode it the way a browser parser would. */
function parsed_textarea_value(html) {
	const match = /<textarea[^>]*name="body"[^>]*>([\s\S]*?)<\/textarea>/.exec(html);
	expect(match).not.toBeNull();

	return match[1]
		.replace(/^\n/, '') // the parser eats one leading newline
		.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');
}

function render_body(body) {
	const { body: html } = render(Editor, {
		props: { article: { title: 't', description: 'd', body, tagList: [] } }
	});
	return parsed_textarea_value(html);
}

describe('editor textarea SSR round-trip', () => {
	it('round-trips an ordinary body (control)', () => {
		expect(render_body('## markdown & <stuff>')).toBe('## markdown & <stuff>');
	});

	it('round-trips a body that starts with a newline', () => {
		expect(render_body('\nstarts with a blank line')).toBe('\nstarts with a blank line');
	});
});
