import { type IConfig } from 'unleash-proxy-client';

import packageJson from '../package.json';

export const featureFlagClientConfig: IConfig = {
	appName: packageJson.name,
	url: process.env.UNLEASH_PROXY_URL!,
	clientKey: process.env.UNLEASH_FRONTEND_TOKEN!,
	environment: process.env.NODE_ENV,
};
