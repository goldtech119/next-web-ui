'use client';

import { DynoLogo } from '#components/common/dyno/dynoLogo';
import { CollapseIcon } from '#components/common/icons/collapse';
import LanguageSelector from '#components/common/languageSelector';
import { Switch } from '#components/common/switch/switch';
import { useGuild } from '#components/contexts/guildContext';
import { useMenu } from '#components/contexts/menuContext';
import { Category, GetModulesApiResponse, categoryMetadataMap, useModules } from '#hooks/data/useModules';
import { ChevronRight, Cloud, Diamond, FileCopy, Search, Settings, ShieldMoon, Support, Task } from '@mui/icons-material';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import {
	Box,
	Collapse,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
	darken,
	lighten,
	useTheme,
} from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { useTranslations } from 'next-intl';
import { Menu } from './menu';
import { MenuItem } from './menuItem';

export const GuildMenu: React.FC = () => {
	const t = useTranslations();
	const router = useRouter();
	const pathname = usePathname();
	const { guild } = useGuild();
	const { categories } = useModules();
	const { toggleOpen, isOpen } = useMenu();

	return (
		<Menu>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: isOpen ? 'max-content max-content' : '0px 1fr',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Box sx={{ width: isOpen ? undefined : 0, visibility: isOpen ? undefined : 'hidden' }}>
					<DynoLogo sx={{ maxWidth: 'fit-content', my: 5, ml: 3.5 }} disabled />
				</Box>
				<IconButton onClick={toggleOpen} disableRipple sx={{ marginRight: isOpen ? 3 : undefined, padding: 0, height: 'fit-content' }}>
					<CollapseIcon collapsed={!isOpen} />
				</IconButton>
			</Box>
			<List>
				<MenuItem
					label={t('commons.Dashboard')}
					IconComponent={SpeedOutlinedIcon}
					isActive={pathname === '/manage/[guildId]'}
					onClick={() => router.push(`/manage/${guild?._id}`)}
				/>
				<MenuItem
					label={t('commons.Search')}
					IconComponent={Search}
					isActive={pathname === '/manage/[guildId]/modules'}
					onClick={() => alert('Not implemented')}
				/>
				<MenuItem
					label={t('commons.Commands')}
					IconComponent={Task}
					isActive={pathname === '/manage/[guildId]/commands'}
					onClick={() => router.push(`/manage/${guild?._id}/commands`)}
				/>
				<MenuItem
					label={t('commons.Logs')}
					IconComponent={FileCopy}
					isActive={pathname === '/manage/[guildId]/commands'}
					onClick={() => router.push(`/manage/${guild?._id}/logs`)}
				/>
			</List>
			<Divider />
			<List>
				<Box sx={{ width: isOpen ? undefined : 0, height: isOpen ? undefined : 0, visibility: isOpen ? undefined : 'hidden' }}>
					<ListItem sx={{ paddingLeft: 4 }}>
						<Typography
							variant='monospace'
							sx={{
								color: t => t.palette.neutral.dark,
								fontWeight: 500,
								fontSize: 13,
								textTransform: 'uppercase',
							}}
						>
							{t('commons.Modules')}
						</Typography>
					</ListItem>
				</Box>
				<List>
					{Object.entries(categories).map(([category, modules]) => (<CategoryListItem key={category} category={categoryMetadataMap[category]} modules={modules} />))}
				</List>
			</List>
			<Divider />
			<List>
				<Box sx={{ width: isOpen ? undefined : 0, height: isOpen ? undefined : 0, visibility: isOpen ? undefined : 'hidden' }}>
					<ListItem sx={{ paddingLeft: 4 }}>
						<Typography
							variant='monospace'
							sx={{
								color: t => t.palette.neutral.dark,
								fontWeight: 500,
								fontSize: 13,
								textTransform: 'uppercase',
							}}
						>
							{t('commons.General')}
						</Typography>
					</ListItem>
				</Box>
				<MenuItem
					label={t('commons.MyServers')}
					IconComponent={Cloud}
					isActive={false}
					onClick={() => router.push(`/manage/${guild?._id}/logs`)}
				/>
				<MenuItem
					label={t('commons.Settings')}
					IconComponent={Settings}
					isActive={false}
					onClick={() => router.push(`/manage/${guild?._id}/logs`)}
				/>
				<MenuItem
					label={t('commons.Support')}
					IconComponent={Support}
					isActive={false}
					onClick={() => router.push(`/manage/${guild?._id}/logs`)}
				/>
				<MenuItem
					label={t('commons.Premium')}
					IconComponent={Diamond}
					isActive={false}
					onClick={() => router.push(`/manage/${guild?._id}/logs`)}
				/>
			</List>
			<LanguageSelector />
		</Menu>
	);
};

const CategoryListItem: React.FC<{category: Category; modules: GetModulesApiResponse}> = ({ category, modules }) => {
	const t = useTranslations();
	const [isHovering, setIsHovering] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const theme = useTheme();
	const { isOpen: menuIsOpen } = useMenu();

	return (
		<Box
			sx={{
				position: 'relative',
				'&::before': {
					content: isOpen || isHovering ? '\'\'' : undefined,
					position: 'absolute',
					display: 'block',
					width: 38,
					left: 24,
					top: 12,
					bottom: isOpen ? 0 : 4,
					background: '#212426',
					borderRadius: 30,
				},
			}}
		>
			<ListItem onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} sx={{ paddingBottom: isOpen ? 0 : 0 }}>
				<ListItemButton
					onClick={() => setIsOpen(x => !x)}
					sx={{
						display: 'grid',
						gap: 2,
						gridTemplateColumns: 'max-content 1fr max-content',
						alignItems: 'center',
						paddingLeft: 1.5,
						'&:hover': {
							background: 'unset',
						},
					}}
					disableRipple
				>
					<Box
						sx={{
							display: 'grid',
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: '50%',
							background: isHovering ? category.color : darken(category.color, 0.62),
							height: 30,
							width: 30,
						}}
					>
						<ListItemIcon sx={{ minWidth: 'unset' }}>
							<ShieldMoon sx={{ fontSize: 16 }} htmlColor={isHovering ? theme.palette.neutral.lighter : category.color} />
						</ListItemIcon>
					</Box>
					<Box sx={{ width: menuIsOpen ? undefined : 0, visibility: menuIsOpen ? undefined : 'hidden' }}>
						<ListItemText
							primary={t(`categories.${category.id}` as any)}
							primaryTypographyProps={{ noWrap: true }}
							sx={{
								textTransform: 'uppercase',
								'& .MuiTypography-root': {
									fontWeight: 500,
									color: t => (isHovering ? t.palette.text.primary : t.palette.neutral.dark),
									textTransform: 'uppercase',
									fontSize: 13,
								},
							}}
						/>
					</Box>
					<Box sx={{ width: menuIsOpen ? undefined : 0, visibility: menuIsOpen ? undefined : 'hidden' }}>
						<ListItemIcon sx={{ minWidth: 'unset' }}>
							<ChevronRight sx={{ rotate: isOpen ? '90deg' : undefined }} htmlColor={theme.palette.neutral.dark} />
						</ListItemIcon>
					</Box>
				</ListItemButton>
			</ListItem>
			<Collapse in={isOpen} sx={{ marginBottom: isOpen ? 1 : 0 }}>
				{modules.map(module => (
					<ModulesListItem key={module.name} category={category} module={module} />
				))}
			</Collapse>
		</Box>
	);
};

const ModulesListItem: React.FC<{ category: Category; module: GetModulesApiResponse[0]}> = ({
	category,
	module,
}) => {
	const router = useRouter();
	const { guild } = useGuild();
	const theme = useTheme();
	const { toggleModule } = useModules();
	const { isOpen: menuIsOpen } = useMenu();

	const [isHovering, setIsHovering] = useState(false);

	return (
		<ListItem onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} sx={{ paddingY: 0 }} onClick={() => router.push(`/manage/${guild?._id}/modules/${module.id}`)}>
			<ListItemButton
				disableRipple
				sx={{
					display: 'grid',
					gridTemplateColumns: 'max-content 1fr max-content',
					alignItems: 'center',
					color: t => t.palette.neutral.dark,
					paddingY: 0.5,
					paddingLeft: 1.5,
					'&:hover': {
						background: 'unset',
						'& .MuiTypography-root': {
							color: t => t.palette.text.primary,
						},
					},
				}}
			>
				<Box
					sx={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: '50%',
						background: isHovering ? category.color : undefined,
						height: 30,
						width: 30,
					}}
				>
					<ListItemIcon sx={{ minWidth: 'unset' }}>
						<ShieldMoon sx={{ fontSize: 16 }} htmlColor={isHovering ? theme.palette.neutral.lighter : lighten(category.color, 0.5)} />
					</ListItemIcon>
				</Box>
				<Box sx={{ width: menuIsOpen ? undefined : 0, visibility: menuIsOpen ? undefined : 'hidden' }} onClick={() => router.push(`/manage/${guild?._id}/modules/${module.id}`)}>
					<ListItemText
						primary={
							<>
								<Box
									sx={{
										display: 'inline',
										fontWeight: 300,
										fontSize: 10,
										color: lighten(category.color, 0.5),
									}}
								>
									-
								</Box>{' '}
								{module.name}
							</>
						}
						primaryTypographyProps={{ noWrap: true }}
						sx={{
							'& .MuiTypography-root': {
								display: 'grid',
								gridTemplateColumns: 'max-content 1fr',
								alignItems: 'center',
								gap: 1,
								marginLeft: 1.5,
							},
						}}
					/>
				</Box>
				<Box sx={{ width: menuIsOpen ? undefined : 0, visibility: menuIsOpen ? undefined : 'hidden' }}>
					<Switch checked={module.enabled} onChange={() => toggleModule(module.name)} switchType='small' checkedColor={category.color} />
				</Box>
			</ListItemButton>
		</ListItem>
	);
};
