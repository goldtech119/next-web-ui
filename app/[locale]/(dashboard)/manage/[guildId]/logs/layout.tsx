'use client';

import { DashboardPageLayout } from '#components/layouts/dashboard-page-layout';
import { useTranslations } from 'next-intl';
import type React from 'react';

export default function GuildLogsLayout({ children }: { children: React.ReactNode }) {
	const t = useTranslations('dashboard');
	return (
		<DashboardPageLayout title={t('Logs.title')} description={t('Logs.description')}>
			{children}
		</DashboardPageLayout>
	);
}
