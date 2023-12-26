import type { Meta, StoryObj } from '@storybook/react';
import Switch from '.';

export default {
	title: 'Atoms/Switch',
	component: Switch,
} satisfies Meta<typeof Switch>;

type Story = StoryObj<typeof Switch>;

export const DefaultProps = {} satisfies Story;

export const DefaultChecked = {
	args: {
		defaultChecked: true,
	},
} satisfies Story;

export const Disabled = {
	args: {
		disabled: true,
	},
} satisfies Story;

export const ForceChecked = {
	args: {
		checked: true,
	},
} satisfies Story;
