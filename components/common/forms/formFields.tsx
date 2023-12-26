import React from 'react';
import { Box, type SxProps, Typography } from '@mui/material';

export type FormFieldsProps = {
	title?: string;
	dense?: boolean;
	fontSize?: number;
	sx?: SxProps;
} & React.PropsWithChildren;

export const FormFields: React.FC<FormFieldsProps> = ({ children, dense, title, sx, fontSize = 14 }) => (
	<Box sx={sx}>
		{title && (
			<Typography fontSize={fontSize} fontWeight={600} color="neutral.lightest" marginBottom={2}>
				{title}
			</Typography>
		)}
		<Box
			sx={{
				display: 'grid',
				gridAutoFlow: dense ? undefined : 'row',
				gap: dense ? 2 : 4,
				gridTemplateColumns: dense ? '1fr 1fr' : undefined,
				gridTemplateRows: dense ? '1fr 1fr' : undefined,
			}}
		>
			{children}
		</Box>
	</Box>
);
