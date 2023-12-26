import { Menu as MuiMenu, MenuProps as MuiMenuProps, SxProps, Theme } from '@mui/material';
import React, { forwardRef } from 'react';

export enum MenuType {
	PRIMARY = 'PRIMARY',
	SECONDARY = 'SECONDARY',
}

export interface MenuProps extends MuiMenuProps {
	menuType: MenuType;
}

export const Menu: React.FC<MenuProps> = forwardRef(({ children, ...props }, ref) => (
	<MuiMenu sx={menuToSx(props)} ref={ref} {...props}>
		{children}
	</MuiMenu>
));
Menu.displayName = 'Menu';

const menuToSx = (props: MenuProps): SxProps<Theme> => {
	switch (props.menuType) {
		case MenuType.SECONDARY: {
			return {
				'& .MuiMenu-list': {
					p: 1,
				},
				'& .MuiPaper-root': {
					backgroundColor: 'neutral.dark',
					backgroundImage: 'none',
					boxShadow: t => `inset 0 0 0 1px ${t.palette.neutral.darker}`,
					borderRadius: 3,
				},
				'& .MuiMenuItem-root': {
					'&:hover': {
						bgcolor: 'neutral.main',
					},
				},
			};
		}

		case MenuType.PRIMARY:
		default: {
			return {
				'& .MuiMenu-list': {
					p: 1,
				},
				'& .MuiPaper-root': {
					bgcolor: 'neutral.main',
					backgroundImage: 'none',
					boxShadow: t => `inset 0 0 0 1px ${t.palette.neutral.darker}`,
					borderRadius: 3,
				},
				'& .MuiMenuItem-root': {
					'&:hover': {
						bgcolor: 'neutral.darkest',
					},
				},
			};
		}
	}
};
