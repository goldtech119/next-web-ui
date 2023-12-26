'use client';

import { MenuProvider, useMenu } from '#components/contexts/menuContext';
import { DefaultFooter } from '#components/site/footer/defaultFooter';
import { GuildMenu, MENU_MAXWIDTH_PX, MENU_MINWIDTH_PX } from '#components/site/menu';
import { GuildTopbar } from '#components/site/topbar/guildTopbar';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

export interface LayoutGuildDashboardProps extends React.PropsWithChildren {
	sidebar?: ContentWrapperProps['sidebar'];
	title: string;
}

export const LayoutGuildDashboard: React.FC<LayoutGuildDashboardProps> = ({ children, sidebar, title }) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

	return (
		<MenuProvider defaultOpened={isDesktop}>
			<Box sx={{ maxWidth: 1440 + MENU_MAXWIDTH_PX, marginX: 'auto', position: 'relative' }}>
				<GuildTopbar title={title} />
				<GuildMenuWrapper />
				<ContentWrapper content={children} sidebar={sidebar} />
				<FooterWrapper />
			</Box>
		</MenuProvider>
	);
};

const GuildMenuWrapper: React.FC = () => {
	const { isOpen } = useMenu();
	const menuWidth = useMemo(() => (isOpen ? MENU_MAXWIDTH_PX : MENU_MINWIDTH_PX), [isOpen]);
	return (
		<Box component='nav' sx={{ width: { sm: menuWidth }, flexShrink: { sm: 0 } }}>
			<GuildMenu />
		</Box>
	);
};

interface ContentWrapperProps {
	sidebar?: React.ReactNode[];
	content: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ content, sidebar }) => {
	const { isOpen } = useMenu();
	const menuWidth = useMemo(() => (isOpen ? MENU_MAXWIDTH_PX : MENU_MINWIDTH_PX), [isOpen]);
	const hasSidebar = useMemo(() => Boolean(sidebar && sidebar.length > 0), [sidebar]);

	return (
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				width: { sm: `calc(100% - ${menuWidth + 24}px)` },
				marginLeft: { sm: `${menuWidth}px` },
				boxShadow: 'none',
				background: t => t.palette.neutral.darkest,
				borderBottomLeftRadius: { sm: 20 },
				borderBottomRightRadius: { sm: 20 },
				display: hasSidebar ? 'grid' : undefined,
				gridTemplateColumns: { xs: '1fr', sm: '1fr 360px' },
			}}
		>
			<Box sx={{ p: 2.5, minWidth: '100%' }}>{content}</Box>
			{hasSidebar && (
				<Box
					sx={{
						borderLeft: t => `1px solid ${t.palette.neutral.darker}`,
						p: 3,
						display: 'grid',
						gridAutoRows: 'max-content',
						gridAutoColumns: '100%',
						rowGap: '26px',
					}}
				>
					{sidebar}
				</Box>
			)}
		</Box>
	);
};

const FooterWrapper = () => {
	const { isOpen } = useMenu();
	const menuWidth = useMemo(() => (isOpen ? MENU_MAXWIDTH_PX : MENU_MINWIDTH_PX), [isOpen]);

	return <DefaultFooter containerSx={{ width: 'unset', borderTop: 'none', marginLeft: `${menuWidth}px` }} />;
};
