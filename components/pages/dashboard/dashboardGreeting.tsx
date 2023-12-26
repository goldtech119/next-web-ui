import { DashboardSection } from '#components/common/dashboard/section';
import { useAuth } from '#components/contexts/authContext';
import { hexToRgba } from '#helpers/colorHelper';
import themes from '#styles/theme';
import { ChatRounded, ConnectedTvRounded, CopyAll, PeopleRounded, PersonAddAlt1Rounded } from '@mui/icons-material';
import { Box, SvgIconProps, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

export const DashboardGreeting: React.FC = () => {
	const { user } = useAuth();
	const t = useTranslations('dashboard');
	const hourOfDay = new Date().getHours();
	const greeting = useMemo(() => {
		if (hourOfDay >= 4 && hourOfDay < 12) {
			return t('Greets.Morning', { name: user?.username });
		}

		if (hourOfDay >= 12 && hourOfDay < 17) {
			return t('Greets.Afternoon', { name: user?.username });
		}

		if (hourOfDay >= 17 && hourOfDay < 4) {
			return t('Greets.Evening', { name: user?.username });
		}

		return t('Greets.Default', { name: user?.username });
	}, [hourOfDay, t, user?.username]);
	const updated = new Date();

	return (
		<DashboardSection title={greeting} description={t('News', { count: 30 })} sx={{ marginTop: 4 }}>
			<>
				<Box
					sx={{
						display: 'grid',
						gridAutoFlow: 'column',
						gap: 3,
						justifyContent: 'space-between',
						overflowX: 'auto',
					}}
				>
					{engagementItems.map(item => (
						<EngagementItem key={item.label} {...item} />
					))}
				</Box>
				<Box sx={{ marginTop: 4.5 }}>
					<Typography fontSize={16} color='neutral.lightest' fontWeight={600}>
						{t('Stats')}
					</Typography>
					<Typography fontSize={12} color='neutral.dark' fontWeight={500}>
						{t('UpdateOn')} {updated.toLocaleDateString()}
					</Typography>
					<Statblock />
				</Box>
			</>
		</DashboardSection>
	);
};

interface EngagementItemProps {
	label: string;
	value: string;
	Icon: React.FC<SvgIconProps>;
	color: string;
}

const EngagementItem: React.FC<EngagementItemProps> = ({ label, value, Icon, color }) => (
	<Box
		sx={{
			borderRadius: 1.25,
			background: t => t.palette.neutral.darkest,
			display: 'grid',
			gridTemplateColumns: 'max-content 1fr',
			gap: 2,
			alignItems: 'center',
			padding: 2,
		}}
	>
		<Box>
			<Box sx={{ borderRadius: 1, background: hexToRgba(color, 0.2), display: 'grid', placeContent: 'center', height: 35, width: 35 }}>
				<Icon htmlColor={color} />
			</Box>
		</Box>
		<Box>
			<Typography fontSize={12} color='neutral.dark'>
				{label}
			</Typography>
			<Typography fontSize={20} color='neutral.lightest'>
				{value}
			</Typography>
		</Box>
	</Box>
);

const Statblock: React.FC = () => {
	const t = useTranslations('dashboard');

	return (
		<Box
			sx={{
				borderRadius: 1.5,
				border: t => `1px solid ${t.palette.neutral.darker}`,
				marginTop: 2,
				paddingY: 2,
				paddingX: 3,
			}}
		>
			<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, columnGap: 4 }}>
				<StatblockItem label={t('ServerID')} value={1234123456} />
				<div></div>
				<div></div>
			</Box>
			<Box sx={{ marginTop: 4, display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr' }, columnGap: 4, rowGap: 2 }}>
				<StatblockItem label={t('StatBlocks.Members')} value={(1234567).toLocaleString()} />
				<StatblockItem label={t('StatBlocks.Text')} value={5} />
				<StatblockItem label={t('StatBlocks.Bots')} value={6} />
				<StatblockItem label={t('StatBlocks.Roles')} value={12} />
				<StatblockItem label={t('StatBlocks.Voice')} value={6} />
				<StatblockItem label={t('StatBlocks.Categories')} value={6} />
			</Box>
		</Box>
	);
};

interface StatblockItemProps {
	label: string;
	value: number | string;
	copyable?: boolean;
}

const StatblockItem: React.FC<StatblockItemProps> = ({ label, value, copyable }) => (
	<Box sx={{ display: 'grid', gridTemplateColumns: '1fr max-content' }}>
		<Typography fontSize={13} fontWeight={500} color='neutral.dark' paddingRight={1}>
			{label}
		</Typography>
		<Typography fontSize={13} fontWeight={500} color='neutral.lighter'>
			{value}
		</Typography>
		{copyable && <CopyAll />}
	</Box>
);

const engagementItems: EngagementItemProps[] = [
	{ label: 'Total Members', value: '113k', color: themes.dark.palette.primary.main, Icon: PeopleRounded },
	{ label: 'New Members', value: '2.6k', color: themes.dark.palette.secondary.main, Icon: PersonAddAlt1Rounded },
	{ label: 'Messages Sent', value: '15.4k', color: themes.dark.palette.error.main, Icon: ChatRounded },
	{ label: 'Total Channels', value: '24', color: themes.dark.palette.info.main, Icon: ConnectedTvRounded },
];
