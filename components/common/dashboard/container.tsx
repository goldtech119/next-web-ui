import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';

export type DashboardContainerProps = {
	title: string;
} & React.PropsWithChildren;

export const DashboardContainer: React.FC<DashboardContainerProps> = ({ title, children }) => (
	<Paper elevation={1} component='section'>
		<Box padding={2}>
			<Typography variant='h6'>{title}</Typography>
			<Box marginTop={1}>{children}</Box>
		</Box>
	</Paper>
);
