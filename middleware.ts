import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
	// A list of all locales that are supported
	locales: ['en', 'es'],
	defaultLocale: 'en',
	localeDetection: false,
});

export const config = {
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
