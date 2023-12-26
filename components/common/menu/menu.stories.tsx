import { MenuItem } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import React, { forwardRef } from 'react';
import Menu, { MenuProps } from '.';
import Button from '../button';
import { MenuType } from './menu';

export default {
	title: 'Atoms/Menu',
	component: Menu,
} satisfies Meta<typeof Menu>;

type Story = StoryObj<typeof Menu>;

const MenuDemo: React.FC<{ menuProps: MenuProps }> = forwardRef<HTMLDivElement, { menuProps: MenuProps }>(({ menuProps }, ref) => {
	const popup = usePopupState({ variant: 'popover' });

	return (
		<div>
			<Button {...bindTrigger(popup)}>Open Menu</Button>
			<Menu {...bindMenu(popup)} {...menuProps} ref={ref}>
				<MenuItem onClick={popup.close}>Cake</MenuItem>
				<MenuItem onClick={popup.close}>Death</MenuItem>
			</Menu>
		</div>
	);
});
MenuDemo.displayName = 'MenuDemo';

export const DefaultProps = {
	render: props => <MenuDemo menuProps={props} />,
} satisfies Story;

export const Primary = {
	args: { menuType: MenuType.PRIMARY },
	render: props => <MenuDemo menuProps={props} />,
} satisfies Story;

export const Secondary = {
	args: { menuType: MenuType.SECONDARY },
	render: props => <MenuDemo menuProps={props} />,
} satisfies Story;
