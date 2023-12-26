import React from 'react';
import { useTranslations } from 'next-intl';

import { DashboardPageLayout } from '#components/layouts/dashboard-page-layout';
import { createSsrTranslator } from '#helpers/create-ssr-ranslator';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
	const t = await createSsrTranslator(locale);

	return {
		title: t('dashboard.ServerSettings.title'),
	};
}

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	const t = useTranslations();

	return <DashboardPageLayout title={t('dashboard.ServerSettings.title')}>{children}</DashboardPageLayout>;
}
