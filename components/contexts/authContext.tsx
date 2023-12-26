'use client';

import { User } from '#types/dyno/User';
import React, { createContext, useContext, useMemo } from 'react';

type AuthContextType = {
	user: User | undefined;
	isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
	user: undefined,
	isLoading: false,
});

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const value: AuthContextType = useMemo(
		() => ({
			user: {
				id: '176738270376361985',
				username: 'avi',
				avatar: 'c906d1596c1aa62e084abfda65b9ab2a',
				discriminator: '1234',
				accentColor: 1,
				bot: false,
				createdAt: 0,
				publicFlags: 1,
				system: false,
			},
			isLoading: false,
		}),
		[],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error('useAuth must be called from AuthContext');
	}

	return context;
};
