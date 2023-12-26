'use client';

import React, { type Dispatch, type SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { ContactEmergency, NavigateNext, StarBorderRounded, StarRounded, Tune } from '@mui/icons-material';
import { Box, MenuItem, Breadcrumbs as MuiBreadcrumbs, Select, Typography, useTheme } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { PremiumBadge } from '#components/common/badge/premium';
import { DynoLogo } from '#components/common/dyno/dynoLogo';
import { Switch } from '#components/common/switch/switch';
import { useGuild } from '#components/contexts/guildContext';
import { adaptiveHeightPlugin } from '#helpers/keen-slider/plugins/adaptiveHeight';
import { resizePlugin } from '#helpers/keen-slider/plugins/resize';
import { useFavoriteModules } from '#hooks/data/useFavoriteModules';
import { type Category, type GetModulesApiResponse, categoryMetadataMap, useModules } from '#hooks/data/useModules';

type SortByOptions = 'fav' | 'recent' | 'alpha';

export const ModuleSelector: React.FC = () => {
	const t = useTranslations();
	const theme = useTheme();
	const searchParams = useSearchParams();
	const paramCategory = searchParams.get('category');
	const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [sliderLoaded, setSliderLoaded] = useState(false);
	const { modules, categories } = useModules();
	const activeCategoryModules = useMemo(() => {
		const id = Object.keys(categories).find(id => id === activeCategory);
		return id ? categories[id] : modules;
	}, [activeCategory, categories, modules]);
	const [sortBy, setSortBy] = useState<SortByOptions>('recent');

	const [sliderRef, instanceRef] = useKeenSlider(
		{
			initial: paramCategory ? 1 : 0,
			slideChanged(s) {
				setCurrentSlide(s.track.details.rel);
			},
			created(slider) {
				slider.container.style.height = 'fit-content';

				if (paramCategory) {
					setCurrentSlide(1);
					setActiveCategory(paramCategory);
				}

				setSliderLoaded(true);
			},
		},
		[adaptiveHeightPlugin(), resizePlugin()],
	);

	useEffect(() => {
		if (sliderLoaded && instanceRef.current) {
			instanceRef.current.track.to(currentSlide);
		}
	}, [currentSlide, instanceRef, sliderLoaded]);

	useEffect(() => {
		const category = searchParams.get('category');
		if (category && sliderLoaded && !activeCategory) {
			instanceRef.current?.track.to(1);
			setActiveCategory(category);
		}
	}, [activeCategory, instanceRef, searchParams, sliderLoaded]);

	return (
		<Box sx={{ mt: 4 }}>
			<Box sx={{ display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr max-content', paddingBottom: 4 }}>
				<Breadcrumbs
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
					setCurrentSlide={setCurrentSlide}
				/>
				<Box sx={{ display: 'grid', width: 'fit-content', gridAutoFlow: 'column', alignItems: 'center', gap: 2 }}>
					<Box sx={{ display: 'grid', width: 'fit-content', gridAutoFlow: 'column', alignItems: 'center', gap: 1 }}>
						<Tune htmlColor={theme.palette.neutral.dark} />
						<Typography color="neutral.dark">{t('commons.SortBy')}:</Typography>
					</Box>
					<Select onChange={e => setSortBy(e.target.value as SortByOptions)} value={sortBy}>
						<MenuItem value="fav">{t('commons.Favorites')}</MenuItem>
						<MenuItem value="recent">{t('commons.RecentlyUsed')}</MenuItem>
						<MenuItem value="alpha">{t('commons.Alphabetical')}</MenuItem>
					</Select>
				</Box>
			</Box>
			<Box
				className="keen-slider"
				ref={sliderRef}
				sx={{
					minHeight: 320,
					'& .keen-slider__slide': { minHeight: 'auto !important' },
				}}
			>
				<Box
					sx={{
						display: 'grid',
						gridAutoFlow: 'column',
						gridTemplateRows: { xs: '1fr', md: '1fr 1fr' },
						justifyContent: { md: 'space-around' },
						gap: 4,
						overflowX: 'auto',
						minWidth: '100%',
						height: 320,
					}}
					className="keen-slider__slide"
				>
					<CategoryItem
						id="allmodules"
						modules={modules}
						label={t('commons.AllModules')}
						Icon={<DynoLogo height={36} width={36} variant="white" hideName disabled />}
						setActiveCategory={setActiveCategory}
						setCurrentSlide={setCurrentSlide}
					/>
					{Object.entries(categories).map(([id, modules]) => {
						const { Icon, color } = categoryMetadataMap[id];

						return (
							<CategoryItem
								key={id}
								id={id}
								modules={modules}
								label={t(`categories.${id}` as never)}
								color={color}
								Icon={<Icon />}
								setActiveCategory={setActiveCategory}
								setCurrentSlide={setCurrentSlide}
							/>
						);
					})}
				</Box>
				<Box
					sx={{
						display: 'grid',
						gap: 1,
						overflowY: 'auto !important',
						// eslint-disable-next-line no-mixed-operators
						height: (activeCategoryModules?.length ?? 1) * 100 + (activeCategoryModules?.length ?? 1) * 8,
					}}
					className="keen-slider__slide"
				>
					{activeCategoryModules?.map(m => <ModuleItem key={m.name} {...m} />)}
				</Box>
			</Box>
		</Box>
	);
};

type BreadcrumbsProps = {
	activeCategory: string | undefined;
	setActiveCategory: Dispatch<SetStateAction<BreadcrumbsProps['activeCategory']>>;
	setCurrentSlide: Dispatch<SetStateAction<number>>;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeCategory, setActiveCategory, setCurrentSlide }) => {
	const t = useTranslations();
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const handleModulesClick = useCallback(() => {
		setActiveCategory(undefined);
		setCurrentSlide(0);

		if (searchParams.size && router) {
			const params = new URLSearchParams(Array.from(searchParams.entries()));
			params.delete('category');
			router.push(`${pathname}${params.size ? `?${params.toString()}` : ''}`, { scroll: false });
		}
	}, [pathname, router, searchParams, setActiveCategory, setCurrentSlide]);

	return (
		<MuiBreadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
			<Breadcrumb active={Boolean(activeCategory)} label={t('commons.Modules')} onClick={handleModulesClick} />
			{activeCategory && (
				<Breadcrumb
					label={activeCategory === 'allmodules' ? t('commons.AllModules') : t(`categories.${activeCategory}` as never)}
				/>
			)}
		</MuiBreadcrumbs>
	);
};

type BreadcrumbProps = {
	active?: boolean;
	label: string;
	onClick?: () => void;
};

const Breadcrumb: React.FC<BreadcrumbProps> = props =>
	props.active ? <ActiveBreadcrumb {...props} /> : <InactiveBreadcrumb {...props} />;

const InactiveBreadcrumb: React.FC<BreadcrumbProps> = ({ label, onClick }) => (
	<Typography sx={{ color: '#fefefe', fontSize: 17, fontWeight: 600 }} onClick={onClick}>
		{label}
	</Typography>
);

const ActiveBreadcrumb: React.FC<BreadcrumbProps> = ({ label, onClick }) => (
	<Typography sx={{ color: '#fefefe', fontSize: 17, fontWeight: 600, cursor: 'pointer' }} onClick={onClick}>
		{label}
	</Typography>
);

type CategoryItemProps = {
	id: string;
	label: string;
	color?: string;
	Icon: React.ReactNode;
	modules: GetModulesApiResponse;
	setActiveCategory: Dispatch<SetStateAction<BreadcrumbsProps['activeCategory']>>;
	setCurrentSlide: Dispatch<SetStateAction<number>>;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
	id,
	label,
	color,
	Icon,
	modules,
	setActiveCategory,
	setCurrentSlide,
}) => {
	const [isHovering, setIsHovering] = useState(false);
	const handleClick = useCallback(() => {
		setActiveCategory(id);
		setCurrentSlide(1);
	}, [id, setActiveCategory, setCurrentSlide]);

	return (
		<Box
			sx={{
				display: 'grid',
				justifyContent: 'center',
				cursor: 'pointer',
			}}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={handleClick}
		>
			<Box
				sx={{
					background: color ?? (t => t.palette.neutral.darker),
					width: 72,
					height: 72,
					display: 'grid',
					placeContent: 'center',
					borderRadius: 1.5,
					mx: 'auto',
				}}
			>
				{Icon}
			</Box>
			<Typography align="center" maxWidth={100}>
				{label}
			</Typography>
			<Typography align="center" color="neutral.dark" fontSize={12} fontWeight={400}>{`${modules.length} ${
				modules.length === 1 ? 'module' : 'modules'
			}`}</Typography>
		</Box>
	);
};

const ModuleItem: React.FC<GetModulesApiResponse[0]> = ({ enabled, id, isPremium, category: categoryId }) => {
	const t = useTranslations();
	const { isFavorited, remove, add } = useFavoriteModules();
	const theme = useTheme();
	const router = useRouter();
	const { guildId } = useGuild();
	const category = (categoryId && categoryMetadataMap[categoryId]) as Category;

	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: 'max-content 1fr max-content max-content',
				alignItems: 'center',
				background: t => t.palette.neutral.main,
				border: t => `1px solid ${t.palette.neutral.darker}`,
				paddingY: 3,
				paddingX: 5,
				borderRadius: 2,
				gap: 3,
				cursor: 'pointer',
			}}
			onClick={() => {
				// TODO: scroll to top and show nice loading state
				router.push(`/manage/${guildId}/modules/${id}`);
			}}
		>
			<Box
				sx={{
					background: t => t.palette.neutral.darker,
					height: 50,
					width: 50,
					display: 'grid',
					placeContent: 'center',
					borderRadius: '50%',
				}}
			>
				<ContactEmergency sx={{ fontSize: 24 }} />
			</Box>
			<Box>
				<Box
					sx={{
						display: 'grid',
						alignItems: 'center',
						gridTemplateColumns: 'max-content max-content',
						columnGap: '10px',
					}}
				>
					<Typography fontSize={16} fontWeight={600}>
						{t(`modules.${id}.title` as never)}
					</Typography>
					{isPremium && <PremiumBadge variant="full" />}
				</Box>
				<Typography color="neutral.dark" fontSize={10} fontWeight={400}>
					{t(`modules.${id}.description` as never)}
				</Typography>
			</Box>
			{isFavorited(id) ? (
				<StarRounded htmlColor={theme.palette.warning.main} onClick={() => remove(id)} sx={{ cursor: 'pointer' }} />
			) : (
				<StarBorderRounded
					htmlColor={theme.palette.neutral.darker}
					onClick={() => add(id)}
					sx={{ cursor: 'pointer' }}
				/>
			)}
			<Switch switchType="small" checked={enabled} checkedColor={category?.color} />
		</Box>
	);
};
