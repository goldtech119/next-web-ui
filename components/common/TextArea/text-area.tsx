import { type FC, useState, type ChangeEvent } from 'react';
import { Box, useTheme } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { IbmPlexMonoFont, LexendFont } from 'misc/fonts';

type TextAreaProps = {
	name: string;
	max: number;
	initialValue?: string;
	placeholder?: string;
};
export const TextArea: FC<TextAreaProps> = ({ name, initialValue, placeholder, max }) => {
	const [value, setTextValue] = useState(() => initialValue ?? '');
	const { setValue } = useFormContext();
	const theme = useTheme();

	const countdown = max - value.length;

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setTextValue(value);
		setValue(name, value);
	};

	return (
		<Box sx={{ position: 'relative' }}>
			<Box
				sx={{
					position: 'absolute',
					top: '-1.75rem',
					right: 0,
					fontSize: '14px',
					fontFamily: IbmPlexMonoFont.style.fontFamily,
					fontWeight: 600,
					color: theme.palette.neutral.dark,
				}}
			>
				{countdown}
			</Box>
			<textarea
				placeholder={placeholder}
				name={name}
				maxLength={500}
				value={value}
				onChange={onChange}
				style={{
					width: '100%',
					minHeight: '6rem',
					maxWidth: '100%',
					minWidth: '100%',
					resize: 'none',
					padding: '1rem',
					borderRadius: '.75rem',
					fontSize: '14px',
					fontFamily: LexendFont.style.fontFamily,
					backgroundColor: theme.palette.neutral.darkest,
					borderColor: theme.palette.neutral.darkest,
					color: theme.palette.neutral.dark,
				}}
			/>
		</Box>
	);
};
