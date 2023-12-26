import type { Meta, StoryObj } from '@storybook/react';
import Fab from '.';

export default {
	title: 'Atoms/Floating Action Button',
	component: Fab,
} satisfies Meta<typeof Fab>;

type Story = StoryObj<typeof Fab>;

export const DefaultProps = {} satisfies Story;
