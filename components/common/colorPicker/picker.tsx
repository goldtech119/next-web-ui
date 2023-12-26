import { useForwardedRef } from '#hooks/useForwardedRef';
import { important } from '#styles/theme/helpers';
import { Box, styled, useTheme } from '@mui/material';
import { IbmPlexMonoFont } from 'misc/fonts';
import React, { forwardRef, useState } from 'react';
import { ChromePicker, Color } from 'react-color';
import { useFormContext } from 'react-hook-form';
import { useOnClickOutside } from 'usehooks-ts';

export interface ColorPickerProps {
	name: string;
	enableAlpha?: boolean;
	onChange?: () => void;
	onClickOutside?: (event?: MouseEvent) => void;
}

export type ColorPickerRef = ChromePicker;

export const ColorPicker: React.FC<ColorPickerProps> = forwardRef<HTMLDivElement, ColorPickerProps>(
	({ name, enableAlpha, onChange, onClickOutside }, ref) => {
		const innerRef = useForwardedRef(ref);
		const theme = useTheme();
		const { getValues, setValue } = useFormContext();
		const [previewColor, setPreviewColor] = useState<Color | undefined>(getValues(name) as string);

		useOnClickOutside(innerRef, e => {
			e.preventDefault();
			e.stopImmediatePropagation();

			if (onClickOutside) {
				onClickOutside(e);
			}
		}, 'mouseup');

		return (<Box sx={{ height: 0 }} ref={innerRef}>
			<StyledPicker
				color={previewColor}
				onChange={c => setPreviewColor(c.hex)}
				onChangeComplete={c => {
					setValue(name, c.hex);

					if (onChange) {
						onChange();
					}
				}}
				disableAlpha={!enableAlpha}
				styles={{
					default: {
						picker: {
							position: 'relative',
							top: theme.spacing(1),
							zIndex: 999,
							borderRadius: theme.spacing(1.5),
							overflow: 'hidden',
							height: 350,
							width: 270,
							background: theme.palette.neutral.darkest,
							display: 'grid',
							gridTemplateRows: '1fr max-content',
						},
					},
				}}
			/>
		</Box>
		);
	},
);
ColorPicker.displayName = 'ColorPicker';

const StyledPicker = styled(ChromePicker)(({ theme }) => ({
	'& svg': {
		fill: important(theme.palette.neutral.dark),
		'&:hover': {
			background: important(theme.palette.neutral.darker),
		},
	},
	'& input': {
		fontFamily: IbmPlexMonoFont.style.fontFamily,
		color: important(theme.palette.neutral.lighter),
		background: 'transparent',
		position: 'relative',
		boxShadow: important('none'),
		'&::after': {
			content: '""',
			position: 'absolute',
			left: '20%',
			right: '20%',
			bottom: 0,
			height: 2,
			background: theme.palette.primary.darker,
		},
	},
	'& label': {
		color: theme.palette.neutral.dark,
	},
}));
