import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import type { Preview, ReactRenderer } from '@storybook/react';
import themes from '../styles/theme';

const themeDecorator = withThemeFromJSXProvider<ReactRenderer>({
	themes,
	defaultTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
	Provider: ThemeProvider,
	GlobalStyles: CssBaseline,
});

export default {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			expanded: true,
			hideNoControlsWarning: true,
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [themeDecorator],
} satisfies Preview;
