'use client';

import { DynoLogo } from '#components/common/dyno/dynoLogo';
import { DiscordIcon } from '#components/common/icons';
import { Mail, Twitter } from '@mui/icons-material';
import LaunchIcon from '@mui/icons-material/Launch';
import { Box, Container, Divider, Grid, Link, SxProps, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

const currentYear = new Date().getFullYear();

export interface DefaultFooterProps {
	containerSx?: SxProps;
}

export const DefaultFooter: React.FC<DefaultFooterProps> = ({ containerSx }) => {
	const t = useTranslations();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
	const links = useMemo(() => makeLinks(t as (msg: string) => string), [t]);

	return (
		<Container
			maxWidth={false}
			component='footer'
			sx={{
				paddingY: 5,
				borderTop: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(95,95,95,0.25)' : 'rgba(95,95,95,0.15)'}`,
				...containerSx,
			}}
		>
			{isDesktop && <DynoLogo sx={{ marginX: '0 auto', marginBottom: 13 }} />}
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: ['repeat(1, auto)', 'repeat(2, auto)', 'repeat(3, auto)', 'repeat(5, auto)'],
					gap: 5,
					marginBottom: isDesktop ? 10 : 5,
					marginX: 'auto',
					justifyContent: 'space-evenly',
					maxWidth: 1500,
				}}
			>
				{links.map(([category, list]) => (
					<Box
						key={category}
						sx={{
							display: 'grid',
							gap: 3,
							gridAutoRows: 'max-content 1fr',
						}}
					>
						<Box>
							<Typography variant='monospace' sx={{ textTransform: 'uppercase', fontWeight: 500 }} color='neutral.dark'>
								{category}
							</Typography>
						</Box>
						<Box sx={{ display: 'grid', gap: 2 }}>
							{list.map(link =>
								link.external ? (
									<Link
										key={link.url}
										href={link.url}
										target='_blank'
										sx={{
											display: 'grid',
											alignItems: 'center',
											gap: 1,
											justifyContent: 'start',
											gridAutoFlow: 'column',
										}}
										color='text.primary'
									>
										<span>{link.label}</span>
										<LaunchIcon />
									</Link>
								) : (
									<Link key={link.url} href={link.url} color='text.primary'>
										{link.label}
									</Link>
								),
							)}
						</Box>
					</Box>
				))}
			</Box>
			{!isDesktop && <LegalLinks isDesktop={isDesktop} />}
			<Divider />
			<Box
				sx={{
					display: 'grid',
					gridAutoFlow: ['rows', 'rows', 'column', 'column'],
					alignItems: 'center',
					rowGap: 3,
					marginTop: 3,
				}}
			>
				{isDesktop ? <LegalLinks isDesktop={isDesktop} order={3} /> : <DynoLogo sx={{ margin: '0 auto' }} />}
				<Box
					sx={{
						display: 'grid',
						gridAutoFlow: 'column',
						gap: 5,
						justifyContent: 'center',
						order: isDesktop ? 2 : undefined,
					}}
				>
					<DiscordIcon />
					<Twitter />
					<Mail />
				</Box>
				<Typography
					variant='caption'
					sx={{
						textAlign: isDesktop ? 'left' : 'center',
						order: isDesktop ? 1 : undefined,
					}}
					color='neutral.dark'
				>
					&copy; {currentYear} {t('commons.SwiftMediaEntertainment')}. {t('commons.AllRightsReserved')}.
				</Typography>
			</Box>
		</Container>
	);
};

type LinkData = { label: string; url: string; external?: boolean };
const makeLinks = (t: (msg: string) => string): [string, LinkData[]][] => [
	[
		'dyno',
		[
			{ label: t('commons.AboutDyno'), url: '/1' },
			{ label: t('commons.GetStarted'), url: '/2' },
		],
	],
	[
		'product',
		[
			{ label: t('commons.Features'), url: '/3' },
			{ label: t('commons.BotCommands'), url: '/4' },
		],
	],
	['pricing', [{ label: t('commons.GetPremium'), url: '/5' }]],
	[
		'connect',
		[
			{ label: t('commons.Contact'), url: '/6' },
			{ label: t('commons.JoinOurDiscord'), url: '/7', external: true },
		],
	],
	[
		'help',
		[
			{ label: t('commons.Support'), url: '/8' },
			{ label: t('commons.FAQs'), url: '/9' },
		],
	],
];

const LegalLinks: React.FC<{ isDesktop: boolean; order?: number }> = ({ isDesktop, order }) => {
	const t = useTranslations();

	return (
		<Box
			sx={{
				display: 'grid',
				gridAutoFlow: isDesktop ? 'column' : 'row',
				marginBottom: isDesktop ? undefined : 3,
				gap: 2,
				justifyContent: isDesktop ? 'end' : 'start',
				order,
			}}
		>
			<Grid item>
				<Link href='/terms-of-service' color='neutral.dark' variant={isDesktop ? 'caption' : undefined} textTransform='none'>
					{t('commons.TermsOfService')}
				</Link>
			</Grid>
			<Grid item>
				<Link href='/privacy-policy' color='neutral.dark' variant={isDesktop ? 'caption' : undefined} textTransform='none'>
					{t('commons.PrivacyPolicy')}
				</Link>
			</Grid>
			<Grid item>
				<Link href='/cookie-policy' color='neutral.dark' variant={isDesktop ? 'caption' : undefined} textTransform='none'>
					{t('commons.CookiePolicy')}
				</Link>
			</Grid>
		</Box>
	);
};
