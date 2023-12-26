'use client';

import { ModuleSettingsWrapper } from '#components/pages/dashboard/moduleSettingsWrapper';
import { TabProvider } from '#components/contexts/tabContext';

import React from 'react';

export default function AutoDeleteLayout({
	children,
}: {
  children: React.ReactNode;
}) {
	return (
		<ModuleSettingsWrapper moduleId='autodelete'>
			<TabProvider>{children}</TabProvider>
		</ModuleSettingsWrapper>
	);
}
