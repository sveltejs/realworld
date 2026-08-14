/** Escape a string for safe interpolation into HTML text content. */
export function escape_html(value) {
	return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
