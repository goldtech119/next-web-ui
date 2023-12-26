import { Typography, TypographyProps } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

export default {
	title: 'Typography',
	component: Typography,
} satisfies Meta<typeof Typography>;

type Story = StoryObj<typeof Typography>;

const defaultProps = {
	children:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpat.',
} satisfies TypographyProps;

export const h1 = {
	args: defaultProps,
	render: (props) => <Typography variant="h1" {...props} />,
} satisfies Story;

export const h2 = {
	args: defaultProps,
	render: (props) => <Typography variant="h2" {...props} />,
} satisfies Story;

export const h3 = {
	args: defaultProps,
	render: (props) => <Typography variant="h3" {...props} />,
} satisfies Story;

export const h4 = {
	args: defaultProps,
	render: (props) => <Typography variant="h4" {...props} />,
} satisfies Story;

export const h5 = {
	args: defaultProps,
	render: (props) => <Typography variant="h5" {...props} />,
} satisfies Story;

export const h6 = {
	args: defaultProps,
	render: (props) => <Typography variant="h6" {...props} />,
} satisfies Story;

export const body1 = {
	args: defaultProps,
	render: (props) => <Typography variant="body1" {...props} />,
} satisfies Story;

export const body2 = {
	args: defaultProps,
	render: (props) => <Typography variant="body2" {...props} />,
} satisfies Story;

export const subtitle1 = {
	args: defaultProps,
	render: (props) => <Typography variant="subtitle1" {...props} />,
} satisfies Story;

export const subtitle2 = {
	args: defaultProps,
	render: (props) => <Typography variant="subtitle2" {...props} />,
} satisfies Story;

export const button = {
	args: defaultProps,
	render: (props) => <Typography variant="button" {...props} />,
} satisfies Story;

export const caption = {
	args: defaultProps,
	render: (props) => <Typography variant="caption" {...props} />,
} satisfies Story;

export const overline = {
	args: defaultProps,
	render: (props) => <Typography variant="overline" {...props} />,
} satisfies Story;
