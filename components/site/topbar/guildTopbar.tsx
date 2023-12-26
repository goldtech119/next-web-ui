'use client';

import { useMenu } from '#components/contexts/menuContext';
import { Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Badge, Box, Container, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { MENU_MAXWIDTH_PX, MENU_MINWIDTH_PX } from '../menu';
import { SearchEverythingInput } from '../searchEverything';

export interface GuildTopbarProps extends React.PropsWithChildren {
	title: string;
}

export const GuildTopbar: React.FC<GuildTopbarProps> = ({ title }) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
	const { toggleOpen, isOpen } = useMenu();
	const menuWidth = useMemo(() => (isOpen ? MENU_MAXWIDTH_PX : MENU_MINWIDTH_PX), [isOpen]);

	return (
		<>
			<AppBar
				position='static'
				color='transparent'
				sx={theme => ({
					width: { sm: `calc(100% - ${menuWidth + 24}px)` },
					marginLeft: { sm: `${menuWidth}px` },
					marginTop: { sm: theme.spacing(3) },
					boxShadow: 'none',
					background: t => t.palette.neutral.darkest,
					borderTopLeftRadius: { sm: 20 },
					borderTopRightRadius: { sm: 20 },
					overflow: { sm: 'hidden' },
				})}
			>
				<Container
					maxWidth={false}
					sx={{
						pt: {
							xs: 4,
							sm: 2,
						},
						px: 3,
						height: 100,
						borderBottom: t => `1px solid ${t.palette.neutral.darker}`,
						boxShadow: t => `0 ${t.spacing(3)} ${t.spacing(5)} ${t.spacing(-3)} rgba(0, 0, 0, 0.06)`,
					}}
				>
					<Toolbar
						disableGutters
						sx={{
							display: 'grid',
							gridAutoFlow: 'column',
							gridAutoColumns: 'max-content max-content max-content',
							justifyContent: 'space-between',
						}}
					>
						{/* left side of bar */}
						<Box sx={{ display: 'grid', gridAutoFlow: 'column', marginRight: 2 }}>
							<Typography variant='h1' fontSize={isDesktop ? 28 : 18} letterSpacing='-0.36px' color='neutral.lightest'>
								{title}
							</Typography>
						</Box>
						{/* center of bar */}
						<Box sx={{ display: 'grid' }}>
							<SearchEverythingInput />
						</Box>
						{/* right side of bar */}
						<Box
							sx={{
								display: 'grid',
								gridAutoFlow: 'column',
								'& .MuiButtonBase-root': {
									width: 56,
								},
							}}
						>
							<IconButton
								aria-label='Toggle notifications menu'
								edge='end'
								onClick={() => alert('Not implemented yet.')}
								sx={{ mr: { sm: 2 } }}
							>
								<Badge badgeContent={3} color='error'>
									<Notifications htmlColor={theme.palette.neutral.dark} />
								</Badge>
							</IconButton>
							<IconButton aria-label='Toggle account menu' edge='end' onClick={() => alert('Not implemented yet.')} sx={{ mr: { sm: 2 } }}>
								<Avatar />
							</IconButton>
							<IconButton
								aria-label='Toggle dashboard menu'
								edge='end'
								onClick={toggleOpen}
								sx={{ display: { sm: 'none' }, mr: { xs: -1 } }}
							>
								<MenuIcon htmlColor={theme.palette.neutral.dark} />
							</IconButton>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	);
};
