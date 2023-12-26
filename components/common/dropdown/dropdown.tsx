import { ChevronRight } from '@mui/icons-material';
import { Box, SxProps, Theme } from '@mui/material';
import { bindMenu, bindToggle, usePopupState } from 'material-ui-popup-state/hooks';
import React from 'react';
import { Button, ButtonProps } from '../button/button';
import { Menu, MenuProps, MenuType } from '../menu/menu';

export interface DropdownProps extends React.PropsWithChildren {
	label: string;
	menuProps?: Omit<MenuProps, 'children'>;
	buttonProps?: ButtonProps;
	sx?: SxProps<Theme>,
}

export const Dropdown: React.FC<DropdownProps> = ({
	label,
	children,
	buttonProps,
	menuProps = { menuType: MenuType.PRIMARY },
	...props
}) => {
	const dropdownState = usePopupState({ variant: 'popover' });

	return (
		<Box {...props}>
			<Button
				endIcon={<ChevronRight sx={{ rotate: dropdownState.isOpen ? '90deg' : 0 }} />}
				className={dropdownState.isOpen ? 'dropdown--open' : 'dropdown--closed'}
				{...bindToggle(dropdownState)}
				{...buttonProps}
				sx={{
					fontWeight: 600,
					color: t => dropdownState.isOpen ? t.palette.neutral.lightest : t.palette.neutral.light,
					...buttonProps?.sx,
				}}
			>
				<span>{label}</span>
			</Button>
			<Menu {...menuProps} {...bindMenu(dropdownState)}>
				{children}
			</Menu>
		</Box>
	);
};
