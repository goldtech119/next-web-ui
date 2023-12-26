/* eslint-disable new-cap */

import { IBM_Plex_Mono, Lexend } from 'next/font/google';

export const LexendFont = Lexend({
	subsets: ['latin'],
	fallback: ['system-ui', 'sans-serif'],
});

export const IbmPlexMonoFont = IBM_Plex_Mono({
	weight: ['200', '400', '600'],
	subsets: ['latin'],
	fallback: ['Courier New', 'monospace'],
});
