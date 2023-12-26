import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '.';

export default {
	title: 'Atoms/Pagination',
	component: Pagination,
} satisfies Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

export const DefaultProps = {} satisfies Story;

export const DefaultChecked = {} satisfies Story;

export const Disabled = {} satisfies Story;

export const ForceChecked = {} satisfies Story;
