'use client';

import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export type ColorModeContextType = {
	toggleColorMode: () => void;
	colorMode: 'light' | 'dark';
};

const ColorModeContext = createContext<ColorModeContextType>({
	colorMode: 'dark',
	toggleColorMode() {
		console.error('Not Implemented');
	},
});

type ColorModeProviderProps = React.PropsWithChildren;

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
	const [isDarkMode, setDarkMode] = useLocalStorage('darkMode', true);

	const toggleColorMode = useCallback((mode?: 'dark'|'light') => {
		setDarkMode(x => mode ? mode === 'dark' : !x);
	}, [setDarkMode]);

	const value: ColorModeContextType = useMemo(
		() => ({
			colorMode: isDarkMode ? 'dark' : 'light',
			toggleColorMode,
		}),
		[isDarkMode, toggleColorMode],
	);

	return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>;
};

export const useColorMode = () => {
	const context = useContext(ColorModeContext);

	if (context === undefined) {
		throw new Error('useColorMode must be called from ColorModeContext');
	}

	return context;
};
