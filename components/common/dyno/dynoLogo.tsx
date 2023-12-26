import { Box, Link, SxProps, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export type LogoWithNameProps = {
	height?: number;
	width?: number;
	disabled?: boolean;
	hideName?: boolean;
	variant?: 'white';
	fontSize?: number;
	sx?: SxProps;
};

export const DynoLogo: React.FC<LogoWithNameProps> = ({ height = 40, width = 40, disabled, hideName, variant, fontSize = 32, sx }) => (
	<Box
		component={disabled ? Box : Link}
		href='/'
		sx={{
			display: 'grid',
			alignItems: 'center',
			gridAutoFlow: 'column',
			gridAutoColumns: 'max-content 1fr',
			gap: 2,
			textDecoration: 'none',
			color: t => t.palette.neutral.lightest,
			width: 'fit-content',
			'& h1': {
				textTransform: 'uppercase',
				fontSize,
				fontWeight: 700,
				lineHeight: 1,
				letterSpacing: '1.6px',
				width: 'fit-content',
			},
			...sx,
		}}
	>
		<Image src={variant ? `/dyno-logo--${variant}.png` : '/dyno-logo.png'} height={height} width={width} alt='Dyno Logo' />
		{!hideName && <Typography variant='h1'>Dyno</Typography>}
	</Box>
);
