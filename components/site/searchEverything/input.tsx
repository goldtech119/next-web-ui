import { Search } from '@mui/icons-material';
import { Box, InputAdornment, TextField, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

export interface SearchEverythingInputProps {}

export const SearchEverythingInput: React.FC<
  SearchEverythingInputProps
> = () => {
	const t = useTranslations();
	const theme = useTheme();
	const [value, setValue] = useState('');

	return (
		<Box
			sx={{
				display: { xs: 'none', sm: 'block' },
			}}
		>
			<TextField
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder={t('commons.SearchEverything')}
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search htmlColor={theme.palette.neutral.dark} sx={{ height: 27, width: 27 }} />
						</InputAdornment>
					),
					sx: {
						background: 'none',
						border: 'none',
						'& fieldset': {
							border: 'none',
						},
					},
				}}
			/>
		</Box>
	);
};
