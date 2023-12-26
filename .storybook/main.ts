import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	staticDirs: ['../public'],
	stories: ['./stories/**/*.mdx', './stories/**/*.stories.(ts|tsx)', '../components/**/*.stories.(ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-themes'],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: true,
	},
	env: async (config) => ({ ...config, ...process.env }) as Record<string, string>,
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			shouldRemoveUndefinedFromOptional: true,
			shouldExtractValuesFromUnion: true,
			propFilter: (prop) => (prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true),
		},
	},
};

export default config;
