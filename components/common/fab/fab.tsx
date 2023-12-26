import { Fab as MuiFab, FabProps as MuiFabProps, SxProps, Theme } from '@mui/material';
import React from 'react';

export interface FabProps extends MuiFabProps {}

export const Fab: React.FC<FabProps> = props => <MuiFab {...props} sx={fabToSx(props)} />;

const fabToSx = (props: FabProps): SxProps<Theme> => {
	const sx: SxProps<Theme> = {
		bgcolor: 'neutral.main',
		boxShadow: t => `inset 0 0 1px ${t.palette.neutral.light}`,
		':hover': {
			bgcolor: 'neutral.light',
		},
	};

	return { ...sx, ...props.sx };
};
