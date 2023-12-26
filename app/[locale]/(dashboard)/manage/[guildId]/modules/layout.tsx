'use client';

import type React from 'react';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';

import { LayoutGuildDashboard } from '#components/layouts/guildDashboard';
import { useChannels } from '#hooks/data/useChannels';
import { useRoles } from '#hooks/data/useRoles';

import '#styles/globals.css';

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
	const t = useTranslations();
	useChannels();
	useRoles();

	return (
		<LayoutGuildDashboard title={t('commons.Modules')}>
			<Box minHeight={'100vh'}>{children}</Box>
		</LayoutGuildDashboard>
	);
}
