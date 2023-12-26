'use client';

import { useGuild } from '#components/contexts/guildContext';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

export type DashboardPageLayoutProps = {
	title: string;
	description?:string;
} & PropsWithChildren;

export const DashboardPageLayout: FC<DashboardPageLayoutProps> = ({ children, title, description }) => {
	const router = useRouter();
	const { guild } = useGuild();
	const t = useTranslations();
	const theme = useTheme();

	return (
		<>
			<Box sx={{ marginBottom: 4 }}>
				<Box
					onClick={() => router.push(`/manage/${guild?._id}`)}
					sx={{
						display: 'grid',
						gap: 1,
						gridTemplateColumns: 'max-content 1fr',
						cursor: 'pointer',
						width: 'fit-content',
						padding: 1,
						marginLeft: -1,
					}}
				>
					<ChevronLeft htmlColor={theme.palette.neutral.dark} />
					<Typography color='neutral.dark'>{t('commons.GoBack')}</Typography>
				</Box>
				<Box
					sx={{
						marginTop: 5,
						display: 'grid',
						gridTemplateColumns: '1fr max-content',
						alignItems: 'center',
					}}
				>
					<Box>
						<Typography
							variant='h2'
							fontSize={40}
							fontWeight={600}
							color='neutral.lightest'
						>
							{title}
						</Typography>
						{description && <Typography color='neutral.dark' fontSize={16} fontWeight={400}>
							{description}
						</Typography>}
					</Box>
				</Box>
			</Box>
			{children}
		</>
	);
};
