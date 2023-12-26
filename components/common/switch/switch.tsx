import React from 'react';
import { Switch as MuiSwitch, type SwitchProps as MuiSwitchProps, type SxProps, type Theme } from '@mui/material';

export type SwitchProps = {
	switchType?: 'big' | 'small';
	checkedColor?: string;
} & MuiSwitchProps;

export const Switch: React.FC<SwitchProps> = ({ switchType = 'big', ..._props }) => {
	const props: SwitchProps = { switchType, ..._props };
	const { switchType: _, checkedColor: __, ...rest } = props;

	return <MuiSwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...rest} sx={switchToSx(props)} />;
};

const switchToSx = (props: SwitchProps): SxProps<Theme> => {
	const height = props.switchType === 'big' ? 26 : 14;
	const width = props.switchType === 'big' ? 48 : 28;

	const sx: SxProps<Theme> = {
		width,
		height,
		padding: 0,
		'& .MuiSwitch-switchBase': {
			padding: 0,
			margin: '2px',
			transitionDuration: '300ms',
			'&.Mui-checked': {
				transform: `translateX(${props.switchType === 'big' ? 22 : 14}px)`,
				'& + .MuiSwitch-track': {
					backgroundColor: t => props.checkedColor ?? t.palette.primary.main,
					opacity: 1,
					border: 0,
				},
				'&.Mui-disabled + .MuiSwitch-track': {
					opacity: 0.5,
				},
			},
			'&.Mui-focusVisible .MuiSwitch-thumb': {
				border: t => `6px solid ${t.palette.neutral.lighter}`,
			},
			'&.Mui-disabled .MuiSwitch-thumb': {
				color: t => t.palette.neutral.main,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: t => (t.palette.mode === 'light' ? 0.7 : 0.3),
			},
		},
		'& .MuiSwitch-thumb': {
			boxSizing: 'border-box',
			width: height - 4,
			height: height - 4,
			color: t => t.palette.neutral.darkest,
		},
		'& .Mui-checked .MuiSwitch-thumb': {
			color: t => t.palette.neutral.lightest,
		},
		'& .MuiSwitch-track': {
			borderRadius: height / 2,
			backgroundColor: t => (t.palette.mode === 'light' ? '#E9E9EA' : '#39393D'),
			opacity: 1,
			transition: t =>
				t.transitions.create(['background-color'], {
					duration: 500,
				}),
		},
	};

	return { ...sx, ...props.sx };
};
