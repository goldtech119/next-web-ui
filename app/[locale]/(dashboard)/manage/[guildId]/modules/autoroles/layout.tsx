'use client';

import { ModuleSettingsWrapper } from '#components/pages/dashboard/moduleSettingsWrapper';
import { TabProvider } from '#components/contexts/tabContext';

import React from 'react';

export default function AutoRolesLayout({
	children,
}: {
  children: React.ReactNode;
}) {
	return (
		<ModuleSettingsWrapper moduleId='autoroles'>
			<TabProvider>{children}</TabProvider>
		</ModuleSettingsWrapper>
	);
}
