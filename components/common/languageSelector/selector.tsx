import { SupportedLocales, useLocale } from '#components/contexts/themeContext';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

export const LanguageSelector: React.FC = () => {
	const { locale, setLocale, locales } = useLocale();

	return (
		<Autocomplete
			options={Object.keys(locales)}
			getOptionLabel={key => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
			style={{ width: 300 }}
			value={locale}
			disableClearable
			onChange={(event: unknown, newValue: string | null) => {
				setLocale(newValue as SupportedLocales);
			}}
			renderInput={params => <TextField {...params} label='Locale' fullWidth />}
		/>
	);
};
