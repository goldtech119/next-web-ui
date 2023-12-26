import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: process.env.SENTRY_DSN,
	tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
});
