import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export type WidgetProps = {
	title: React.ReactNode | string;
	action?: {
		label: string;
		onClick: () => void;
	}
} & React.PropsWithChildren;

export const Widget: React.FC<WidgetProps> = ({ title, children, action }) => (
	<Box
		sx={{
			background: t => t.palette.neutral.main,
			borderRadius: '10px',
		}}
	>
		<Box
			sx={{
				paddingX: '20px',
				paddingY: '25px',
				borderBottom: t => `1px solid ${t.palette.divider}`,
			}}
		>
			<Typography fontSize={18} fontWeight={600} color='neutral.lightest' display='inline-grid' gridTemplateColumns='max-content max-content' gap='10px' alignItems='center'>
				{title}
			</Typography>
		</Box>
		<Box>{children}</Box>
		{action && (
			<Box sx={{
				marginTop: '28px',
				marginBottom: '20px',
				paddingX: '34px',
				display: 'grid',
			}}>
				<Button
					onClick={() => action.onClick()}
					sx={{
						border: t => `2px solid ${t.palette.neutral.darker}`,
						background: 'none',
						'&:hover': { background: 'none' },
					}}
				>
					{action.label}
				</Button>
			</Box>
		)}
	</Box>
);
