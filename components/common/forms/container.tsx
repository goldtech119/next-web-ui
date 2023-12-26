import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';

export type FormContainerProps = {
	hideSubmitButton?: boolean;
} & React.PropsWithChildren;

export const FormContainer: React.FC<FormContainerProps> = ({ children, hideSubmitButton }) => (
	<Box
		sx={{
			display: 'grid',
			gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
			gap: {
				xs: 1,
				md: 2,
			},
		}}
	>
		{children}
		{!hideSubmitButton && (
			<Box
				sx={{
					marginTop: 2,
					gridColumnStart: { xs: 'auto', md: -1 },
					gridColumnEnd: { xs: 'auto', md: 1 },
				}}
			>
				<Button type='submit'>Save</Button>
			</Box>
		)}
	</Box>
);
