'use client';

import React from 'react';
import { Box } from '@mui/material';

import Footer from '#components/site/footer';
import Topbar from '#components/site/topbar';

export const LayoutDefault: React.FC<React.PropsWithChildren> = ({ children }) => (
	<Box
		sx={{
			display: 'grid',
			gridTemplateRows: 'max-content 1fr max-content',
			height: '100%',
		}}
	>
		<Topbar />
		<Box component="main" sx={{ my: 8, px: 2 }}>
			{children}
		</Box>
		<Footer />
	</Box>
);
