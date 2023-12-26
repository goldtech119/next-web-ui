'use client';

import { themes } from '#styles/theme/theme';

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import React, { createContext, useContext, useMemo, useState } from 'react';

import { useColorMode } from './colorModeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from '#components/EmotionCache';

export type SupportedLocales = keyof typeof locales;

type LocaleContextType = {
	locale: SupportedLocales;
	setLocale: React.Dispatch<SupportedLocales>;
	locales: typeof locales;
};

const LocaleContext = createContext<LocaleContextType>({
	setLocale: () => console.error('Not Implemented'),
	locale: 'enUS',
	locales,
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { colorMode } = useColorMode();
	// TODO: get from localstorage then browser settings then default enUS
	const [locale, setLocale] = useState<SupportedLocales>('enUS');
	const theme = useMemo(() => themes[colorMode], [colorMode]);
	const themeWithLocale = useMemo(() => createTheme(theme, locales[locale]), [locale, theme]);
	const value = useMemo(() => ({ locale, setLocale, locales }), [locale]);

	return (
		<NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
			<LocaleContext.Provider value={value}>
				<MuiThemeProvider theme={themeWithLocale}>
					<CssBaseline />
					{children}
				</MuiThemeProvider>
			</LocaleContext.Provider>
		</NextAppDirEmotionCacheProvider>
	);
};

export const useLocale = () => {
	const context = useContext(LocaleContext);

	if (context === undefined) {
		throw new Error('useLocale must be called from LocaleContext');
	}

	return context;
};
