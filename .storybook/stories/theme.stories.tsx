import { Box, Typography } from '@mui/material';
import { PaletteColor } from '@mui/material/styles';
import type { Meta, StoryObj } from '@storybook/react';
import React, { forwardRef } from 'react';
import { theme } from '../../styles/theme';

export default {
	title: 'Theme',
} satisfies Meta<unknown>;

type Story = StoryObj<unknown>;

const ThemeDemo: React.FC<{ palette: PaletteColor; name: string }> = forwardRef(({ palette, name }, ref) => {
	return (
		<>
			<Typography variant="h2">{name}</Typography>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'max-content max-content',
					gap: 5,
					'& .MuiBox-root': {
						minHeight: 100,
						width: 100,
					},
				}}
				ref={ref}
			>
				<Box
					sx={{
						display: 'grid',
						padding: 1,
						backgroundColor: palette.main,
						color: palette.contrastText,
						height: 500,
						borderRadius: 1,
						'& .MuiTypography-root': {
							color: theme.palette.getContrastText(palette.main),
						},
					}}
				>
					<Typography variant="body1" sx={{ alignSelf: 'end' }}>
						Main
					</Typography>
					<Typography variant="body1" sx={{ alignSelf: 'start' }}>
						{palette.main}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'grid',
						gap: 1,
						'& .MuiBox-root': {
							borderRadius: 1,
						},
					}}
				>
					{(palette as any).lighter && (
						<Box
							sx={{
								display: 'grid',
								padding: 1,
								backgroundColor: (palette as any).lighter,
								color: theme.palette.getContrastText((palette as any).lighter),
							}}
						>
							<Typography variant="body1" sx={{ alignSelf: 'end' }}>
								Lighter
							</Typography>
							<Typography variant="body1" sx={{ alignSelf: 'start' }}>
								{(palette as any).lighter}
							</Typography>
						</Box>
					)}
					<Box
						sx={{
							display: 'grid',
							padding: 1,
							backgroundColor: palette.light,
							color: theme.palette.getContrastText(palette.light),
						}}
					>
						<Typography variant="body1" sx={{ alignSelf: 'end' }}>
							Light
						</Typography>
						<Typography variant="body1" sx={{ alignSelf: 'start' }}>
							{palette.light}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'grid',
							padding: 1,
							backgroundColor: palette.dark,
							color: theme.palette.getContrastText(palette.dark),
						}}
					>
						<Typography variant="body1" sx={{ alignSelf: 'end' }}>
							Dark
						</Typography>
						<Typography variant="body1" sx={{ alignSelf: 'start' }}>
							{palette.dark}
						</Typography>
					</Box>
					{(palette as any).darker && (
						<Box
							sx={{
								display: 'grid',
								padding: 1,
								backgroundColor: (palette as any).darker,
								color: theme.palette.getContrastText((palette as any).darker),
							}}
						>
							<Typography variant="body1" sx={{ alignSelf: 'end' }}>
								Darker
							</Typography>
							<Typography variant="body1" sx={{ alignSelf: 'start' }}>
								{(palette as any).darker}
							</Typography>
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
});
ThemeDemo.displayName = 'ThemeDemo';

export const Primary = {
	render: () => <ThemeDemo name="Primary" palette={theme.palette.primary} />,
} satisfies Story;

export const Secondary = {
	render: () => <ThemeDemo name="Secondary" palette={theme.palette.secondary} />,
} satisfies Story;

export const Neutral = {
	render: () => <ThemeDemo name="Neutral" palette={(theme.palette as any).neutral} />,
} satisfies Story;
