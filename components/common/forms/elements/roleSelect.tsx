import { type GuildRole } from '@dynogg/dyno-api';

import React, { type FC, useMemo } from 'react';
import { Close } from '@mui/icons-material';
import { Autocomplete, Box, TextField } from '@mui/material';
import Image from 'next/image';
import { type ControllerRenderProps, type FieldValues, useFormContext } from 'react-hook-form';

import { discordColorToHex } from '#helpers/colorHelper';
import { routes } from '#helpers/routes';
import { useRoles } from '#hooks/data/useRoles';

export type ValueType = {
	id: string;
	name: string;
};

export type RoleSelectElementProps = {
	name: string;
	label?: string;
	helperText?: string;
	multiple?: boolean;
	notClearable?: boolean;
	value: string | string[];
	field?: ControllerRenderProps<FieldValues, string>;
	placeholder?: string;
	defaultValue?: ValueType[];
};

export const RoleSelectElement: React.FC<RoleSelectElementProps> = ({
	field,
	multiple,
	label,
	name,
	notClearable,
	helperText,
	placeholder,
	defaultValue,
}) => {
	const { setValue } = useFormContext();
	const { roles } = useRoles();

	const handleRenderOptions = (props: React.HTMLAttributes<HTMLLIElement>, role: GuildRole) => (
		<Box component="li" {...props}>
			<RoleIcon roleId={role.id} />
			{role?.name}
		</Box>
	);

	return (
		<Autocomplete
			{...field}
			id={`form-element--input_${name.replace(' ', '-')}`}
			onChange={(_, data) => {
				setValue(name, { roles: data });
			}}
			options={Object.entries(roles).map(r => ({
				id: r[1].id,
				name: r[1].name,
			}))}
			defaultValue={multiple ? defaultValue : defaultValue?.[0]}
			getOptionLabel={(rol: { name: string }) => rol.name}
			renderInput={params => <TextField {...params} label={label} helperText={helperText} placeholder={placeholder} />}
			renderOption={handleRenderOptions}
			disableClearable={notClearable}
			ChipProps={{
				deleteIcon: <Close width={12} height={12} />,
				icon: <RoleIcon roleId={'1'} />,
				sx: {
					padding: '.5rem .75rem',
				},
			}}
			multiple={multiple}
			isOptionEqualToValue={(option, value) => option.id === value.id}
		/>
	);
};

const RoleIcon: FC<{ roleId: string }> = ({ roleId }) => {
	const { roles } = useRoles();

	const role = useMemo(() => roles.find(i => i.id === roleId), [roles, roleId]);

	return role?.icon ? (
		<Box sx={{ display: 'grid', '& img': { mr: 1 } }}>
			<Image height={20} width={20} src={routes.discordRoleIcon(role.id, role.icon)} alt={`${role.name} icon`} />
		</Box>
	) : role?.color ? (
		<Box
			sx={{
				height: 20,
				width: 20,
				mr: 1,
				display: 'grid',
				placeContent: 'center',
			}}
		>
			<Box
				sx={{
					borderRadius: '100%',
					backgroundColor: discordColorToHex(role.color),
					width: 15,
					height: 15,
				}}
			/>
		</Box>
	) : null;
};
