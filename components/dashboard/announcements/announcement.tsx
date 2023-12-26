import { Box, BoxProps } from '@mui/material';
import React from 'react';

export const ANNOUNCEMENT_HEIGHT = 250;
// Export const ANNOUNCEMENT_WIDTH = 690;

export const Announcement: React.FC<BoxProps> = props => {
	const { sx, ...rest } = props;

	return (
		<Box
			{...rest}
			sx={{
				backgroundImage: 'url("/announcements/basic.png")',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				height: ANNOUNCEMENT_HEIGHT,
				width: '100%',
				borderRadius: 4,
				p: 5,
				...sx,
			}}
		/>
	);
};
