import { useMenu } from '#components/contexts/menuContext';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { MenuItemList } from './menuItemList';

export type MenuItemProps = {

	IconComponent: React.ComponentType<any>;
	label: React.ReactNode;
	isActive?: boolean;
	filterable?: boolean;
	menu?: {
		label: string;
		url: string;
		icon?: string;
	}[];
	onClick: () => void;
	closeOnClick?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({ IconComponent, label, isActive, menu, filterable, onClick, closeOnClick = true }) => {
	const [isHovering, setIsHovering] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const theme = useTheme();
	const { isOpen: menuIsOpen } = useMenu();

	return (
		<>
			<ListItem
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				onClick={() => {
					if (closeOnClick) {
						setIsOpen(false);
					}

					onClick();
				}}
				sx={{ flexDirection: 'column', alignItems: 'stretch' }}
			>
				<ListItemButton
					disableRipple={isActive}
					selected={isOpen || isHovering || isActive}
					sx={{
						display: 'grid',
						gap: 2,
						borderRadius: 2,
						gridTemplateColumns: 'max-content 1fr max-content',
						'&.Mui-selected, &.Mui-selected:hover': {
							borderRadius: '8px',
							background: 'linear-gradient(270deg, #323337 50%, rgba(70, 79, 111, 0.50) 100%)',
							boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10), 0px 1px 0px 0px rgba(255, 255, 255, 0.05) inset',
						},
					}}
				>
					<ListItemIcon sx={{ minWidth: 'unset' }}>
						<IconComponent htmlColor={isHovering || isActive ? theme.palette.primary.main : theme.palette.neutral.darker} />
					</ListItemIcon>
					<Collapse in={menuIsOpen} orientation='horizontal'>
						<ListItemText
							primary={label}
							primaryTypographyProps={{ noWrap: true }}
							sx={{
								'& .MuiTypography-root': {
									fontWeight: 500,
									color: isHovering || isActive ? theme.palette.text.primary : theme.palette.neutral.dark,
									textTransform: 'uppercase',
									fontSize: 13,
								},
							}}
						/>
						{menu && menu.length ? isOpen ? <ExpandLess /> : <ExpandMore /> : undefined}
					</Collapse>
				</ListItemButton>
			</ListItem>
			<MenuItemList isOpen={isOpen} menu={menu} filterable={filterable} />
		</>
	);
};
