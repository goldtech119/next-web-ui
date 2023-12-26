import { Radio as MuiRadio, RadioProps as MuiRadioProps, SxProps, Theme } from '@mui/material';
import React from 'react';

export interface RadioProps extends MuiRadioProps {}

export const Radio: React.FC<RadioProps> = props => <MuiRadio {...props} sx={radioToSx(props)} />;

const radioToSx = (props: RadioProps): SxProps<Theme> => {
	const sx: SxProps<Theme> = {};

	return { ...sx, ...props.sx };
};
