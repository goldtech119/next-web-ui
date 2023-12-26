import { Tab as MuiTab, TabProps as MuiTabProps } from '@mui/material';
import React from 'react';

export interface TabProps extends MuiTabProps {
	index: number;
}

export const Tab: React.FC<TabProps> = props => {
	const { index, ...rest } = props;

	return <MuiTab {...a11yTabProps(index)} {...rest} />;
};

const a11yTabProps = (index: number) => ({
	id: `tab-${index}`,
	'aria-controls': `tabpanel-${index}`,
});
