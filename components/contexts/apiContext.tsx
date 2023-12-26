'use client';

import { DynoApi } from '@dynogg/dyno-api';
import React, { createContext, useContext, useMemo } from 'react';

type ApiContextType = DynoApi

const ApiContext = createContext<ApiContextType>({} as DynoApi);

export const ApiProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const value = useMemo(() => (new DynoApi({
		BASE: process.env.API_URL,
		HEADERS: {
			Authorization: process.env.API_KEY!,
		},
	})), []);

	return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
	const context = useContext(ApiContext);

	if (context === undefined) {
		throw new Error('useApi must be called from ApiContext');
	}

	return context;
};
