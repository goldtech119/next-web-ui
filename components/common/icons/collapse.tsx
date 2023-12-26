import { SvgIconProps } from '@mui/material';
import React from 'react';

export interface CollapseIconProps extends SvgIconProps {
	collapsed?: boolean;
}

export const CollapseIcon: React.FC<CollapseIconProps> = ({ collapsed, fill, ...props }) => collapsed ? (
	<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<rect x='2' y='2' width='20' height='20' rx='2.5' fill='#6C7275' />
		<rect x='12' y='4' width='8' height='16' rx='2' fill='#141718' />
		<rect x='4' y='11' width='6' height='2' rx='1' fill='#141718' />
		<rect x='8.41406' y='9' width='4' height='2' rx='1' transform='rotate(45 8.41406 9)' fill='#141718' />
		<rect x='7' y='13.8281' width='4' height='2' rx='1' transform='rotate(-45 7 13.8281)' fill='#141718' />
	</svg>
) : (
	<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<rect x='2' y='2' width='20' height='20' rx='2.5' fill='#6C7275' />
		<rect x='4' y='4' width='8' height='16' rx='2' fill='#141718' />
	</svg>
);
