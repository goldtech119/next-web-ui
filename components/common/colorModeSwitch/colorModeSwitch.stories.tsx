import type { Meta, StoryObj } from '@storybook/react';
import ColorModeSwitch from '.';

export default {
	title: 'Components/Color Mode Switch',
	component: ColorModeSwitch,
} satisfies Meta<typeof ColorModeSwitch>;

type Story = StoryObj<typeof ColorModeSwitch>;

export const DefaultProps = {} satisfies Story;
