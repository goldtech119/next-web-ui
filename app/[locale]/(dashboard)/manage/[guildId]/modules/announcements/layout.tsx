'use client';

import React from 'react';

import { TabProvider } from '#components/contexts/tabContext';
import { ModuleSettingsWrapper } from '#components/pages/dashboard/moduleSettingsWrapper';

export default function ModuleAnnouncementsLayout({ children }: { children: React.ReactNode }) {
	return (
		<ModuleSettingsWrapper moduleId="announcements">
			<TabProvider>{children}</TabProvider>
		</ModuleSettingsWrapper>
	);
}
