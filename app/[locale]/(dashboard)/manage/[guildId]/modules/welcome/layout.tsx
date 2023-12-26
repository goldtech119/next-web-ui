'use client';

import { TabProvider } from '#components/contexts/tabContext';
import { ModuleSettingsWrapper } from '#components/pages/dashboard/moduleSettingsWrapper';
import { usePathname } from 'next/navigation';
import type React from 'react';

import '#styles/globals.css';

export default function ModuleWelcomeLayout({
	children,
}: {
  children: React.ReactNode;
}) {
	return (
		<ModuleSettingsWrapper moduleId={'welcome'}>
			<TabProvider>{children}</TabProvider>
		</ModuleSettingsWrapper>
	);
}
