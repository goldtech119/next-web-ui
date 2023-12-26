import React from 'react';
import { Autocomplete, Box, TextField, type SxProps, type Theme } from '@mui/material';
import { useTranslations } from 'next-intl';

type ValueType = {
	name: string;
	value: string;
};

export type FilterSelectElementProps = {
	name: string;
	label?: string;
	helperText?: string;
	notClearable?: boolean;
	includeCategories?: boolean;
	value: string;
	placeholder?: string;
	onChange?: (_value: ValueType) => void;
	sx?: SxProps<Theme>;
};

export const FilterSelectElement: React.FC<FilterSelectElementProps> = ({
	label,
	notClearable,
	helperText,
	placeholder,
	onChange,
	sx,
}) => {
	const t = useTranslations();

	const FILTER_OPTIONS = [
		{
			name: t('form.FilterOptions.Links'),
			value: 'links',
		},
		{
			name: t('form.FilterOptions.NotLinks'),
			value: 'not-links',
		},
		{
			name: t('form.FilterOptions.Invites'),
			value: 'invites',
		},
		{
			name: t('form.FilterOptions.NotInvites'),
			value: 'not-invites',
		},
		{
			name: t('form.FilterOptions.Images'),
			value: 'images',
		},
		{
			name: t('form.FilterOptions.NotImages'),
			value: 'not-images',
		},
		{
			name: t('form.FilterOptions.IncludesText'),
			value: 'includes-text',
		},
		{
			name: t('form.FilterOptions.ExactText'),
			value: 'exact-text',
		},
		{
			name: t('form.FilterOptions.ExcludesText'),
			value: 'excludes-text',
		},
		{
			name: t('form.FilterOptions.StartWith'),
			value: 'start-with',
		},
		{
			name: t(`form.FilterOptions.NotStartWith`),
			value: 'not-start-with',
		},
		{
			name: t(`form.FilterOptions.EndsWith`),
			value: 'end-with',
		},
		{
			name: t(`form.FilterOptions.OnlyNumbers`),
			value: 'numbers',
		},
		{
			name: t(`form.FilterOptions.HasRole`),
			value: 'has-role',
		},
		{
			name: t(`form.FilterOptions.NotRole`),
			value: 'not-role',
		},
	]
	return (
		<Box sx={{ ...sx }}>
			<Autocomplete
				placeholder={placeholder}
				options={FILTER_OPTIONS}
				onChange={(_, data: ValueType | null) => {
					if (data) {
						onChange?.(data);
					}
				}}
				isOptionEqualToValue={(option, value) => option.value === value.value}
				getOptionLabel={item => item.name}
				renderInput={params => (
					<TextField {...params} label={label} helperText={helperText} placeholder={placeholder} />
				)}
				ChipProps={{
					sx: {
						padding: '.5rem .75rem',
					},
				}}
				disableClearable={notClearable}
			/>
		</Box>
	);
};
