import { FormControl, FormControlLabel, FormLabel, RadioGroup } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React, { forwardRef } from 'react';
import Radio, { RadioProps } from '.';

export default {
	title: 'Atoms/Radio',
	component: Radio,
} satisfies Meta<typeof Radio>;

type Story = StoryObj<typeof Radio>;

const RadioDemo: React.FC<{ radioProps: RadioProps }> = forwardRef(({ radioProps }, ref) => (
	<FormControl>
		<FormLabel id='demo-radio-buttons-group-label'>Radio Group Label</FormLabel>
		<RadioGroup aria-labelledby='demo-radio-buttons-group-label' defaultValue='one' name='radio-buttons-group' ref={ref}>
			<FormControlLabel value='zero' control={<Radio {...radioProps} />} label='zero' />
			<FormControlLabel value='one' control={<Radio {...radioProps} />} label='one' />
			<FormControlLabel value='two' control={<Radio {...radioProps} />} label='two' />
		</RadioGroup>
	</FormControl>
));
RadioDemo.displayName = 'RadioDemo';

export const DefaultProps = {
	render: props => <RadioDemo radioProps={props} />,
} satisfies Story;
