import type { Meta, StoryObj } from '@storybook/react';
import Topbar from '.';

export default {
	title: 'Components/Topbar',
	component: Topbar,
} satisfies Meta<typeof Topbar>;

type Story = StoryObj<typeof Topbar>;

export const DefaultProps = {} satisfies Story;
