import { Box, Typography } from '@mui/material';
import React from 'react';

export interface DiscordPreviewContainerProps extends React.PropsWithChildren {
	title: string;
}

export const DiscordPreviewContainer: React.FC<DiscordPreviewContainerProps> = ({ title, children }) => (
	<Box>
		<Typography fontSize={12} fontWeight={500} color='neutral.light'>
			{title}
		</Typography>
		<Box
			sx={{
				border: t => `2px solid ${t.palette.neutral.darker}`,
				padding: 2.5,
				borderRadius: 2,
				marginTop: 2,
			}}
		>
			{children}
		</Box>
	</Box>
);
