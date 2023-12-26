'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type MenuContextType = {
	isOpen: boolean;
	toggleOpen: () => void;
	defaultOpened?: boolean;
};

const MenuContext = createContext<MenuContextType>({
	isOpen: false,
	toggleOpen: () => console.error('Not Implemented'),
});

interface MenuProviderProps extends React.PropsWithChildren {
	defaultOpened?: boolean;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children, defaultOpened }) => {
	const [isOpen, setIsOpen] = useState(Boolean(defaultOpened));
	const toggleOpen = useCallback(() => setIsOpen(o => !o), [setIsOpen]);

	const value: MenuContextType = useMemo(() => ({ isOpen, toggleOpen }), [isOpen, toggleOpen]);

	return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
	const context = useContext(MenuContext);

	if (context === undefined) {
		throw new Error('useMenu must be called from MenuContext');
	}

	return context;
};
