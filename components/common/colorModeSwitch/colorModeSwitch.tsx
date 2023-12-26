'use client';

import { useColorMode } from '#components/contexts/colorModeContext';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { Box, Switch } from '@mui/material';
import React from 'react';

const switchWidth = 64;
const switchHeight = 24;

export const ColorModeSwitch: React.FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box display='grid' gridAutoFlow='column' alignItems='center' gap={4} width='fit-content'>
			{colorMode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
			<button
				style={{
					background: 'none',
					outline: 'none',
					border: 'none',
					cursor: 'pointer',
				}}
				onClick={toggleColorMode}
			>
				<Switch
					checked={colorMode === 'dark'}
					sx={{
						padding: 0,
						height: switchHeight,
						width: switchWidth,
						'& .MuiSwitch-switchBase': {
							transform: 'translateX(10px)',
							padding: 0,
							margin: '2px',
							transitionDuration: '300ms',
							'&.Mui-checked': {
								transform: `translateX(${switchWidth - 19}px)`,
								'& + .MuiSwitch-track': {
									backgroundColor: t => t.palette.neutral.darkest,
								},
							},
						},
						'& .MuiSwitch-thumb': {
							boxSizing: 'border-box',
							width: 6,
							height: switchHeight - 4,
							borderRadius: switchWidth / 2,
							color: t => t.palette.primary.main,
							boxShadow: 'none',
						},
						'& .MuiSwitch-track': {
							borderRadius: switchWidth / 2,
							backgroundColor: t => t.palette.neutral.lightest,
							opacity: 1,
							transition: t =>
								t.transitions.create(['background-color'], {
									duration: 500,
								}),
						},
					}}
				/>
			</button>
		</Box>
	);
};
