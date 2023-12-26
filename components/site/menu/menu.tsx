import { useMenu } from '#components/contexts/menuContext';
import { Close } from '@mui/icons-material';
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React, { useMemo } from 'react';

export interface MenuProps extends React.PropsWithChildren {}

export const Menu: React.FC<MenuProps> = ({ children }) => {
	const theme = useTheme();
	const { isOpen, toggleOpen } = useMenu();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	const menuWidth = useMemo(() => (isOpen ? MENU_MAXWIDTH_PX : MENU_MINWIDTH_PX), [isOpen]);

	return (
		<Drawer
			variant={isDesktop ? 'permanent' : 'temporary'}
			open={isDesktop ? true : isOpen}
			onClose={isDesktop ? undefined : toggleOpen}
			anchor={isDesktop ? 'left' : 'top'}
			ModalProps={{
				keepMounted: !isDesktop, // Better open performance on mobile.
			}}
			PaperProps={{
				sx: {
					boxSizing: 'border-box',
					width: { sm: menuWidth },
					backgroundImage: 'none',
					bgcolor: 'neutral.main',
					borderRight: { sm: 'none' },
					position: { md: 'absolute' },
				},
			}}
		>
			{children}
		</Drawer>
	);
};

export const CloseMenuButton: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { toggleOpen, isOpen } = useMenu();

	return (
		<Box
			sx={{
				display: 'grid',
				gridAutoFlow: 'column',
				gridAutoColumns: 'max-content',
			}}
		>
			{isOpen && (
				<IconButton aria-label='Close dashboard' onClick={toggleOpen} sx={{ ml: 1 }}>
					<Close sx={{ height: 32, width: 32 }} />
				</IconButton>
			)}
			{children}
		</Box>
	);
};

export const MENU_MAXWIDTH_PX = 300;
export const MENU_MINWIDTH_PX = 90;
