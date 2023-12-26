import { useState, type FC, type SetStateAction, type Dispatch } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormContext } from 'react-hook-form';

import { LexendFont } from 'misc/fonts';

type DateTimeProps = {
	name: string;
	defaultValue: Date | string;
	time?: Date | string;
	setTime?: Dispatch<SetStateAction<Date | string>>;
};
export const DateTime: FC<DateTimeProps> = ({ name, defaultValue }) => {
	const [time, setTime] = useState<Date | string>(defaultValue ? new Date(defaultValue) : '');
	const { setValue } = useFormContext();

	return (
		<DateTimePicker
			sx={{
				width: '100%',
				fontFamily: LexendFont.style.fontFamily,
				'& .MuiOutlinedInput-root': {
					paddingRight: '1rem',
				},
			}}
			disablePast
			value={time}
			slotProps={{
				textField: {
					error: false,
				},
			}}
			onChange={value => {
				if (value) {
					setTime(value);
					setValue(name, value);
				}
			}}
		/>
	);
};
