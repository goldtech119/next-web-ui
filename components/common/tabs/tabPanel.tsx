import React from 'react';

export interface TabPanelProps extends React.PropsWithChildren {
	index: number;
	value: number;
}

export const TabPanel: React.FC<TabPanelProps> = props => {
	const { children, value, index, ...rest } = props;

	return (
		<div hidden={value !== index} {...a11yTabPanelProps(index)} {...rest}>
			{value === index && children}
		</div>
	);
};

const a11yTabPanelProps = (index: number) => ({
	id: `tabpanel-${index}`,
	'aria-labelledby': `tab-${index}`,
	role: 'tabpanel',
});
