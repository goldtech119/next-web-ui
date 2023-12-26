/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel, { type FormControlLabelProps } from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

type RowRadioGroupValue = {
	value: string;
	label: string;
	props?: FormControlLabelProps;
};

type RowRadioGroupProps = {
	name?: string;
	options: RowRadioGroupValue[];
	defaultValue?: string;
	isColumn?: boolean;
	onChange?: (_value: string) => void;
};

const StyledFormControlLabel = styled((props: FormControlLabelProps) => <FormControlLabel {...props} />)(() => ({
	'.MuiFormControlLabel-label': {
		fontSize: '14px',
		fontWeight: 600,
	},
}));

export default function RowRadioGroup({ name, options, defaultValue, isColumn, onChange }: RowRadioGroupProps) {
	const { setValue } = useFormContext();

	useEffect(() => {
		if (defaultValue && name) setValue(name!, defaultValue)
	}, [defaultValue, name])
	return (
		<FormControl>
			<RadioGroup
				row={!isColumn}
				aria-labelledby={`${name}-group-label`}
				name={name}
				defaultValue={defaultValue}
				onChange={(_, value) => {
					onChange?.(value);
					if (name) {
						setValue(name, value);
					}
				}}
			>
				{options.map(option => (
					<StyledFormControlLabel
						key={option.value}
						value={option.value}
						control={<Radio />}
						sx={{ fontSize: '10px' }}
						label={option.label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
