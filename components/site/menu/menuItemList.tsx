import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { go } from 'fuzzysort';
import React, { useMemo, useState } from 'react';
import { MenuItemProps } from './menuItem';
import { MenuItemListItem } from './menuItemListItem';

export type MenuItemListProps = {
	isOpen: boolean;
	menu: MenuItemProps['menu'];
	filterable?: boolean;
};

export const MenuItemList: React.FC<MenuItemListProps> = ({ isOpen, menu, filterable }) => {
	const [filter, setFilter] = useState('');
	const filtered = useMemo(() => {
		if (!filter || !menu) {
			return menu;
		}

		const result = go(filter, menu, { threshold: -50000, key: 'label' });

		return result.map(r => r.obj);
	}, [menu, filter]);

	if (!menu || menu.length === 0) {
		return null;
	}

	return (
		<Collapse in={isOpen}>
			<List sx={{ pr: 0, pt: 0, pb: 1 }}>
				{filterable ? (
					<ListItem sx={{ py: 0 }}>
						<TextField
							value={filter}
							onChange={e => setFilter(e.target.value)}
							sx={{ width: '100%' }}
							size='small'
							placeholder='Search...'
						/>
					</ListItem>
				) : null}
				{filtered?.map((item, idx) => <MenuItemListItem key={idx} item={item} />)}
			</List>
		</Collapse>
	);
};
