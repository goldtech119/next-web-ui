const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	swcMinify: true,
	sentry: {
		hideSourceMaps: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
			},
		],
	},
	redirects: async () => [
		{
			source: '/manage',
			destination: '/account',
			permanent: true,
		},
	],
	env: {
		DYNO_DISCORD_INVITE_URL: process.env.DYNO_DISCORD_INVITE_URL,
		GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
		SENTRY_DSN: process.env.SENTRY_DSN,
		UNLEASH_FRONTEND_TOKEN: process.env.UNLEASH_FRONTEND_TOKEN,
		UNLEASH_PROXY_URL: process.env.UNLEASH_PROXY_URL,
		API_KEY: process.env.API_KEY,
		API_URL: process.env.API_URL,
		DYNO_SOCIAL_TWITTER_URL: process.env.DYNO_SOCIAL_TWITTER_URL,
		DYNO_CONTACT_EMAIL: process.env.DYNO_CONTACT_EMAIL,
		DEBUG_I18N: process.env.DEBUG_I18N,
	},
};

/** @type {import('@sentry/nextjs').SentryWebpackPluginOptions} */
const sentryWebpackPluginOptions = {
	silent: true,
};

let config = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
if (process.env.ANALYZE_BUNDLE === 'true') {
	console.log('Bundle Analyzer is enabled!\n');
	const withBundleAnalyzer = require('@next/bundle-analyzer')({
		enabled: true,
		openAnalyzer: true,
	});

	config = withBundleAnalyzer(config);
}

module.exports = config;
