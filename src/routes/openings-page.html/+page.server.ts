// Backwards compatibility redirect for old site
// Some existing posters still have this link or QR code to this page
// We can delete this route after these posters are retired

import { redirect } from '@sveltejs/kit';

export function load() {
	redirect(301, '/openings');
}