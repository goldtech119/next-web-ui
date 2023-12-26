import { useClipboard } from '#hooks/useClipboard';
import { ContentCopyRounded, Palette } from '@mui/icons-material';
import {
	Box,
	InputAdornment,
	TextField,
	Tooltip,
	Zoom,
	styled,
} from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { ColorPicker } from './picker';

export interface ColorElementProps {
  name: string;
}

export const ColorElement: React.FC<ColorElementProps> = forwardRef<
  HTMLDivElement,
  ColorElementProps
>(({ name }, ref) => {
	const [showPicker, setShowPicker] = useState(false);
	const value = useWatch({ name }) as string;
	const { copy, success } = useClipboard(value);

	return (
		<>
			<Box
				sx={{
					display: 'grid',
					gap: 2,
					gridTemplateColumns: '1fr max-content',
					gridAutoRows: 'fit-content',
				}}
			>
				<TextField
					ref={ref}
					value={value}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start' sx={{ pl: 1 }}>
								<Box
									sx={{
										height: 24,
										width: 24,
										borderRadius: 1.5,
										background: value,
									}}
								/>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment position='end' sx={{ pr: 1 }}>
								<Tooltip title={success && 'Copied!'}>
									<ContentCopyRounded
										onClick={copy}
										sx={{ cursor: 'pointer' }}
									/>
								</Tooltip>
							</InputAdornment>
						),
						readOnly: true,
					}}
				/>
				<StyledTrigger
					onClick={e => {
						e.preventDefault();

						if (showPicker) {
							setShowPicker(false);
						} else {
							setShowPicker(true);
						}
					}}
				>
					<Palette />
				</StyledTrigger>
			</Box>
			<Zoom in={showPicker}>
				<div>
					<ColorPicker
						name={name}
						onClickOutside={() => {
							setShowPicker(false);
						}}
					/>
				</div>
			</Zoom>
		</>
	);
});
ColorElement.displayName = 'ColorElement';

const StyledTrigger = styled('button')(({ theme }) => ({
	background: theme.palette.neutral.darkest,
	border: 'none',
	borderRadius: theme.spacing(2),
	height: 56,
	width: 56,
	display: 'grid',
	placeContent: 'center',
	cursor: 'pointer',
	color: theme.palette.neutral.lightest,
}));
