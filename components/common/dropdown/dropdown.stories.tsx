import { MenuItem } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '.';

export default {
	title: 'Components/Dropdown',
	component: Dropdown,
} satisfies Meta<typeof Dropdown>;

type Story = StoryObj<typeof Dropdown>;

export const DefaultProps = {} satisfies Story;

export const Primary = {
	args: {
		label: 'Dropdown Label',
		children: [<MenuItem key={1}>One</MenuItem>, <MenuItem key={2}>Two</MenuItem>, <MenuItem key={3}>Three</MenuItem>],
	},
} satisfies Story;
