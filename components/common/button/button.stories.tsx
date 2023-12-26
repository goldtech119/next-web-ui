import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

export default {
	title: 'Atoms/Button',
	component: Button,
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const DefaultProps = {} satisfies Story;

export const Primary = {
	args: {
		buttonType: 'primary',
		children: 'Button Label',
	},
} satisfies Story;

export const Secondary = {
	args: {
		buttonType: 'secondary',
		children: 'Button Label',
	},
} satisfies Story;

export const Other = {
	args: {
		buttonType: 'other',
		children: 'Button Label',
	},
} satisfies Story;

export const Success = {
	args: {
		children: 'Success!',
		color: 'success',
	},
} satisfies Story;

export const Error = {
	args: {
		children: 'Error!',
		color: 'error',
	},
} satisfies Story;
