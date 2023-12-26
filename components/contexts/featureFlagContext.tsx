'use client';

import { featureFlagClientConfig } from '#helpers/featureFlagHelper';
import { FlagProvider } from '@unleash/proxy-client-react';
import React, { createContext, useMemo } from 'react';
type FeatureFlagContextType = null;

const FeatureFlagContext = createContext<FeatureFlagContextType>(null);

export const FeatureFlagProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const value: FeatureFlagContextType = useMemo(() => null, []);

	if (!IS_ENABLED) {
		return <>{children}</>;
	}

	return (
		<FeatureFlagContext.Provider value={value}>
			<FlagProvider config={featureFlagClientConfig}>{children}</FlagProvider>
		</FeatureFlagContext.Provider>
	);
};

const IS_ENABLED = false;
