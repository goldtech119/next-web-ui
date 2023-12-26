'use client';

import Switch from '#components/common/switch';
import { useFavoriteModules } from '#hooks/data/useFavoriteModules';
import { categoryMetadataMap, moduleIconMap, useModules } from '#hooks/data/useModules';
import { StarRounded } from '@mui/icons-material';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { Widget } from '../widget';

export const FavoriteModulesWidget: React.FC = () => {
	const t = useTranslations('dashboard.FavoriteModules');
	const theme = useTheme();
	const { favorites } = useFavoriteModules();
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	return (
		<Widget
			title={<>
				<StarRounded htmlColor={theme.palette.warning.main} sx={{ height: '25px', width: '25px' }} />
				<span>{t('Title')}</span>
			</>}
			action={{
				label: t('SeeMore'),
				onClick() {
					const params = new URLSearchParams(Array.from(searchParams.entries()));
					params.set('category', 'allmodules');
					router.push(`${pathname}?${params}`, { scroll: false });
				},
			}}
		>
			{favorites.map(f => (<FavoriteModuleItem key={f.id} moduleId={f.featureId} />))}
		</Widget>
	);
};

type FavoriteModuleItemProps = {
	moduleId: string;
}

const FavoriteModuleItem:React.FC<FavoriteModuleItemProps> = ({ moduleId }) => {
	const modulesT = useTranslations('modules');
	const categoriesT = useTranslations('categories');
	const { getModule, toggleModule } = useModules();
	const favoriteModule = useMemo(() => getModule(moduleId), [getModule, moduleId]);
	const category = useMemo(() => {
		const cat = favoriteModule?.category && categoryMetadataMap[favoriteModule.category];

		if (!cat) {
			return undefined;
		}

		return cat;
	}, [favoriteModule]);
	const Icon = useMemo(() => moduleIconMap[moduleId], [moduleId]);

	return favoriteModule
		? <Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'max-content 1fr max-content',
				alignItems: 'start',
				columnGap: '20px',
				paddingX: '20px',
				paddingTop: '20px',
			}}
		>
			<Box
				sx={{
					backgroundColor: t => favoriteModule.enabled ? category?.color : t.palette.neutral.darker,
					borderRadius: '10px',
					display: 'grid',
					placeContent: 'center',
					height: '46px',
					width: '46px',
				}}
			>
				{Icon && <Icon htmlColor='#ffffff' />}
			</Box>
			<Box sx={{ marginTop: '5px', overflow: 'hidden' }}>
				<Typography fontSize={13} fontWeight={500} color='neutral.lightest' overflow='hidden' textOverflow='ellipsis'>{modulesT(`${moduleId}.title` as any)}</Typography>
				<Typography fontSize={12} fontWeight={400} color='neutral.dark' overflow='hidden' textOverflow='ellipsis'>{categoriesT(category?.id as any)}</Typography>
			</Box>
			<Box>
				<Switch checked={favoriteModule.enabled} checkedColor={category?.color} onChange={(_, checked) => toggleModule(moduleId, checked)} switchType='small' />
			</Box>
		</Box>
		: <Skeleton />;
};
