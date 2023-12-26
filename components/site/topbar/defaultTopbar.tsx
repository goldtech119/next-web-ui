'use client';

import { Button } from '#components/common/button/button';
import { Dropdown } from '#components/common/dropdown/dropdown';
import { DynoLogo } from '#components/common/dyno/dynoLogo';
import {
	ChevronRight,
	Close as CloseIcon,
	Launch as LaunchIcon,
	Menu as MenuIcon,
	Notifications as NotificationsIcon,
	RocketLaunch,
	Search as SearchIcon,
} from '@mui/icons-material';
import { Avatar, Badge, Box, Collapse, Divider, Drawer, IconButton, Link, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useCallback, useMemo, useState } from 'react';

const makeLinks: (t: ReturnType<typeof useTranslations>) => [
	string,
	(
		| {
				label: string;
				url: string;
				external?: boolean;
			}[]
		| { url: string; external?: boolean }
	),
	(() => React.ReactNode)?,
][] = t => [
	[
		'Dyno Bot',
		[
			{ label: t('About'), url: '/1' },
			{ label: t('Features'), url: '/2' },
			{ label: t('BotCommands'), url: '/3' },
			{ label: t('PublicServers'), url: '/4' },
		],
		() => <RocketLaunch key='dyno-icon' />,
	],
	[t('GetStarted'), { url: '/5' }, () => <RocketLaunch key='getting-started-icon' />],
	[t('Pricing'), { url: '/6' }, () => <RocketLaunch key='pricing-icon' />],
	[
		'Support',
		[
			{ label: t('FAQs'), url: '/7' },
			{ label: t('DynoWiki'), url: '/8', external: true },
			{ label: t('SupportChannel'), url: '/9', external: true },
		],
		() => <RocketLaunch key='support-icon' />,
	],
];

export const DefaultTopbar: React.FC = () => {
	const t = useTranslations('commons');
	const theme = useTheme();
	const [mobilePopoverState, _setMobilePopoverState] = useState({ isOpen: false });
	const toggleMobilePopover = useCallback(() => _setMobilePopoverState(x => ({ ...x, isOpen: !x.isOpen })), []);
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
	const links = useMemo(() => makeLinks(t), [t]);

	return (
		<>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: isDesktop ? 'max-content 1fr max-content' : 'max-content 1fr',
					gap: 5,
					paddingTop: 4,
					paddingX: isDesktop ? 6 : undefined,
				}}
			>
				{!isDesktop && (
					<IconButton onClick={toggleMobilePopover}>
						<MenuIcon />
					</IconButton>
				)}
				<DynoLogo />
				{isDesktop && (
					<Box display='grid' gridAutoFlow='column' justifyContent='space-evenly' alignItems='center'>
						{links.map(([name, link]) => {
							if (Array.isArray(link)) {
								return (
									<Dropdown
										key={name}
										label={name}
										buttonProps={{
											buttonType: 'text',
											sx: {
												paddingX: 2,
												paddingY: 1,
												bgcolor: 'transparent',
												'&:hover': {
													bgcolor: 'primary.dark',
													color: t => t.palette.neutral.lightest,
												},
												'&.dropdown--open': {
													bgcolor: 'primary.dark',
												},
											},
										}}
									>
										{link.map(({ label, url, external }) => (
											<MenuItem
												key={label}
												sx={{
													'&.MuiMenuItem-root:hover': {
														bgcolor: 'primary.dark',
														'& .MuiTypography-root': {
															color: t => t.palette.neutral.lightest,
														},
													},
												}}
											>
												{external ? (
													<Link
														href={url}
														target='_blank'
														color='neutral.dark'
														display='grid'
														alignItems='center'
														gap={1}
														justifyContent='start'
														gridAutoFlow='column'
													>
														<span>{label}</span>
														<LaunchIcon />
													</Link>
												) : (
													<Link key={url} href={url} color='neutral.dark' display='block'>
														{label}
													</Link>
												)}
											</MenuItem>
										))}
									</Dropdown>
								);
							}

							return link.external ? (
								<Link
									key={link.url}
									href={link.url}
									target='_blank'
									color='neutral.light'
									fontWeight={600}
									display='grid'
									alignItems='center'
									gap={1}
									justifyContent='start'
									gridAutoFlow='column'
								>
									<span>{name}</span>
									<LaunchIcon />
								</Link>
							) : (
								<Link key={link.url} href={link.url} color='neutral.light' fontWeight={600} display='block'>
									{name}
								</Link>
							);
						})}
					</Box>
				)}
				{isDesktop && (
					<Box display='grid' gridAutoFlow='column' alignItems='center' gap={4}>
						<Button href='/dashboard' sx={{ paddingX: 5, paddingY: 2 }}>
							Go To Dashboard
						</Button>
						<IconButton onClick={() => console.error('Not implemented')}>
							<SearchIcon />
						</IconButton>
						<IconButton onClick={() => console.error('Not implemented')}>
							<Badge badgeContent={3} color='error'>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton disableRipple>
							<Avatar />
						</IconButton>
					</Box>
				)}
			</Box>
			<MobilePopover state={mobilePopoverState} toggle={toggleMobilePopover} />
		</>
	);
};

type MobilePopoverState = { isOpen: boolean };
const MobilePopover: React.FC<{ state: MobilePopoverState; toggle: () => void }> = props => {
	const t = useTranslations('commons');
	const links = useMemo(() => makeLinks(t), [t]);

	return (
		<Drawer
			anchor='left'
			open={props.state.isOpen}
			onClose={props.toggle}
			PaperProps={{
				sx: {
					width: '100%',
					maxWidth: 280,
					padding: 6,
					bgcolor: 'neutral.main',
				},
			}}
		>
			<IconButton onClick={props.toggle} sx={{ marginRight: 'auto', marginLeft: -0.5 }}>
				<CloseIcon />
			</IconButton>
			<Box marginTop={5} display='grid' gridAutoFlow='row' justifyContent='space-evenly' alignItems='center'>
				{links.map(([name, link, icon]) => (
					<Box key={name}>
						<MobileMenuItem link={link} label={name} icon={icon?.()} />
					</Box>
				))}
			</Box>
		</Drawer>
	);
};

const MobileMenuItem: React.FC<{
	icon?: React.ReactNode;
	label: string;
	link:
		| Array<{
			label: string;
			url: string;
			external?: boolean;
		}>
		| {
				url: string;
				external?: boolean;
		};
}> = ({ link, label, icon }) => {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(false);

	if (Array.isArray(link)) {
		return (
			<>
				<Button
					buttonType='text'
					startIcon={icon}
					endIcon={<ChevronRight sx={{ rotate: isOpen ? '90deg' : 0 }} />}
					onClick={() => setIsOpen(x => !x)}
					sx={{
						marginY: 2,
						width: '100%',
						display: 'grid',
						gridTemplateColumns: icon ? '40px 1fr max-content' : '1fr max-content',
						alignItems: 'center',
						justifyContent: 'space-between',
						textAlign: 'left',
						'&:hover': { color: 'primary.main', transition: theme.transitions.easing.easeInOut, bgcolor: 'transparent' },
					}}
				>
					{label}
				</Button>
				<Divider />
				<Collapse in={isOpen}>
					<Box display='grid'>
						{link.map(({ url, label }) => (
							<Link
								key={label}
								href={url}
								marginY={1}
								marginLeft={5}
								fontWeight={500}
								color='text.primary'
								sx={{ '&:hover': { color: 'primary.main', transition: theme.transitions.easing.easeInOut } }}
							>
								{label}
							</Link>
						))}
					</Box>
				</Collapse>
			</>
		);
	}

	return (
		<>
			<Button
				buttonType='text'
				startIcon={icon}
				key={label}
				href={link.url}
				sx={{
					display: 'grid',
					gridTemplateColumns: icon ? '40px 1fr' : '1fr',
					marginY: 2,
					fontWeight: 500,
					color: 'text.primary',
					textAlign: 'left',
					'&:hover': { color: 'primary.main', transition: theme.transitions.easing.easeInOut, bgcolor: 'transparent' },
				}}
			>
				{label}
			</Button>
			<Divider />
		</>
	);
};
