import {
	Button as MuiButton,
	ButtonProps as MuiButtonProps,
	SxProps,
	Theme,
} from '@mui/material';
import React from 'react';

export interface ButtonProps extends MuiButtonProps {
  buttonType?:
    | 'primary'
    | 'secondary'
    | 'text'
    | 'other'
    | 'outlined'
    | 'neutral';
}

export const Button: React.FC<ButtonProps> = props => {
	const { buttonType, ...rest } = props;
	return (
		<MuiButton
			disableRipple={buttonType === 'text'}
			{...rest}
			sx={buttonToSx(props)}
		/>
	);
};

const buttonToSx = (props: ButtonProps): SxProps<Theme> => {
	switch (props.buttonType) {
		case 'text': {
			return {
				bgcolor: 'transparent',
				backgroundColor: 'transparent',
				boxShadow: 'none',
				fontWeight: 400,
				padding: 0,
				fontSize: '1rem',

				'&:hover': {
					bgcolor: 'transparent',
					boxShadow: 'none',
				},
				...props.sx,
			};
		}

		case 'neutral': {
			return {
				bgcolor: 'transparent',
				backgroundColor: 'transparent',
				boxShadow: 'none',
				fontWeight: 'normal',
				padding: 0,
				fontSize: '1rem',
				'&:hover': {
					bgcolor: 'transparent',
					backgroundColor: 'transparent',
					boxShadow: 'none',
				},
				...props.sx,
			};
		}

		case 'secondary': {
			return {
				bgcolor: 'neutral.main',
				boxShadow: t => `inset 0 0 0 2px ${t.palette.primary.dark}`,
				color: t => t.palette.getContrastText(t.palette.neutral.main),
				fontWeight: 600,
				fontSize: '1rem',
				'&:hover': {
					bgcolor: 'neutral.light',
					boxShadow: 'none',
					color: t => t.palette.getContrastText(t.palette.neutral.light),
				},
				...props.sx,
			};
		}

		case 'other': {
			return {
				bgcolor: 'neutral.lightest',
				boxShadow: 'none',
				color: t => t.palette.getContrastText(t.palette.neutral.light),
				fontSize: '1rem',
				fontWeight: 600,
				transition: 'all 0.2s linear',
				'&:hover': {
					bgcolor: 'neutral.darkest',
					boxShadow: t => `inset 0 0 0 2px ${t.palette.neutral.dark}`,
					color: t => t.palette.getContrastText(t.palette.neutral.dark),
				},
				...props.sx,
			};
		}

		case 'outlined': {
			return {
				bgcolor: 'neutral.darkest',
				boxShadow: t => `inset 0 0 0 2px ${t.palette.neutral.dark}`,
				color: t => t.palette.getContrastText(t.palette.neutral.dark),
				fontSize: '1rem',
				fontWeight: 600,
				transition: 'all 0.2s linear',
				'&:hover': {
					bgcolor: 'neutral.lightest',
					boxShadow: 'none',
					color: t => t.palette.getContrastText(t.palette.neutral.light),
				},
				...props.sx,
			};
		}

		case 'primary':
		default: {
			return {
				bgcolor: 'primary.dark',
				boxShadow: 'none',
				color: t => t.palette.getContrastText(t.palette.primary.dark),
				fontSize: '1rem',
				fontWeight: 600,
				'&:hover': {
					bgcolor: 'neutral.main',
					boxShadow: t => `inset 0 0 0 2px ${t.palette.primary.dark}`,
					color: t => t.palette.getContrastText(t.palette.neutral.main),
				},
				...props.sx,
			};
		}
	}
};
