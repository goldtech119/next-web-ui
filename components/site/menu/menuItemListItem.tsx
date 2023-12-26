import { getCustomIcon } from '#helpers/iconHelper';
import { KeyboardArrowRight } from '@mui/icons-material';
import { alpha, useTheme } from '@mui/material';
import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import React, { useMemo, useState } from 'react';

export type MenuItemListItemProps = {
	item: {
		label: string;
		url: string;
		icon?: string;
	};
};

export const MenuItemListItem: React.FC<MenuItemListItemProps> = ({ item: { url, label, icon } }) => {
	const [isHovering, setIsHovering] = useState(false);
	const theme = useTheme();
	const getColor = (active?: boolean) => (active ? theme.palette.text.primary : theme.palette.text.secondary);

	const IconComponent = useMemo(() => (icon ? getCustomIcon(icon) ?? ((props: any) => <Icon {...props}>{icon}</Icon>) : undefined), [icon]);

	return (
		<ListItem key={url} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} dense>
			<ListItemButton
				selected={isHovering}
				sx={theme => ({
					display: 'grid',
					gap: 2,
					borderRadius: 2,
					gridTemplateColumns: 'max-content 1fr max-content',
					'&.Mui-selected, &.Mui-selected:hover': {
						backgroundColor: alpha(theme.palette.neutral.main, 0.5),
						boxShadow: 2,
					},
				})}
			>
				<ListItemIcon sx={{ minWidth: 'unset' }}>{IconComponent ? <IconComponent htmlColor={getColor(isHovering)} /> : null}</ListItemIcon>
				<ListItemText
					primary={label}
					sx={{
						'& > span': {
							fontWeight: 500,
							color: getColor(isHovering),
						},
					}}
				/>
				<KeyboardArrowRight />
			</ListItemButton>
		</ListItem>
	);
};
