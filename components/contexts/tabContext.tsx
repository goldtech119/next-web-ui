'use client';

import React, { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type TabContextType = {
	activeTab: number;
	setActiveTab: (_: unknown, index: number) => void;
};

const TabContext = createContext<TabContextType>({
	activeTab: 0,
	setActiveTab: () => console.error('Not Implemented'),
});

type TabProviderProps = {
	defaultActiveTab?: number;
	dontUpdateUrl?: boolean;
	queryParamName?: string;
} & React.PropsWithChildren;

export const TabProvider: React.FC<TabProviderProps> = ({
	children,
	dontUpdateUrl,
	defaultActiveTab = 0,
	queryParamName = 'tab',
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();
	const [activeTab, _setActiveTab] = useState(defaultActiveTab);

	const setActiveTab: TabContextType['setActiveTab'] = useCallback(
		(_, index) => {
			if (!dontUpdateUrl) {
				const updatedUrl = new URL(pathname, window.origin);
				updatedUrl.searchParams.set(queryParamName, index.toString());

				router.replace(updatedUrl.href);
			}

			_setActiveTab(index);
		},
		[dontUpdateUrl, pathname, queryParamName, router],
	);

	useLayoutEffect(() => {
		if (!dontUpdateUrl) {
			const queryActiveTab = params?.get(queryParamName);

			if (queryActiveTab) {
				_setActiveTab(Number(queryActiveTab));
			}
		}
	}, [params, dontUpdateUrl, queryParamName]);

	const value: TabContextType = useMemo(() => ({ activeTab: activeTab ?? 0, setActiveTab }), [activeTab, setActiveTab]);

	return <TabContext.Provider value={value}>{children}</TabContext.Provider>;
};

export const useTabs = () => {
	const context = useContext(TabContext);

	if (context === undefined) {
		throw new Error('useTabs must be called from TabContext');
	}

	return context;
};
