import { Tabs } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React, { forwardRef, useState } from 'react';
import Tab, { TabProps } from '.';

export default {
	title: 'Atoms/Tab',
	component: Tab,
} satisfies Meta<typeof Tab>;

type Story = StoryObj<typeof Tab>;

const TabDemo: React.FC<{ tabProps: TabProps }> = forwardRef<HTMLDivElement, { tabProps: TabProps }>(({ tabProps }, ref) => {
	const tabs = ['one', 'two', 'three'];
	const [value, setValue] = useState(tabs[0]);

	return (
		<Tabs value={value} onChange={(_, v: (typeof tabs)[0]) => setValue(v)} ref={ref} component='div'>
			{tabs.map(tab => (
				<Tab key={tab} label={tab} {...tabProps} />
			))}
		</Tabs>
	);
});
TabDemo.displayName = 'TabDemo';

export const DefaultProps = {
	render: props => <TabDemo tabProps={props} />,
} satisfies Story;

export const Selected = {
	args: {},
	render: props => <TabDemo tabProps={props} />,
} satisfies Story;

export const Default = {
	args: {},
	render: props => <TabDemo tabProps={props} />,
} satisfies Story;

export const Icon = {
	args: {},
	render: props => <TabDemo tabProps={props} />,
} satisfies Story;
