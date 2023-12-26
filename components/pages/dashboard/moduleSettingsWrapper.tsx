import Switch from '#components/common/switch';
import { useGuild } from '#components/contexts/guildContext';
import { useModules } from '#hooks/data/useModules';
import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

interface ModuleSettingsWrapperProps extends React.PropsWithChildren {
  moduleId: string;
}

export const ModuleSettingsWrapper: React.FC<ModuleSettingsWrapperProps> = ({
	children,
	moduleId,
}) => {
	const t = useTranslations();
	const router = useRouter();
	const theme = useTheme();
	const { guild } = useGuild();
	const { getModule, toggleModule } = useModules();
	const dynoModule = useMemo(() => getModule(moduleId), [getModule, moduleId]);

	// TODO: handle not found dynomodule

	return (
		<>
			<Box sx={{ marginBottom: 4 }}>
				<Box
					onClick={() => router.push(`/manage/${guild?._id}`)}
					sx={{
						display: 'grid',
						gap: 1,
						gridTemplateColumns: 'max-content 1fr',
						cursor: 'pointer',
						width: 'fit-content',
						padding: 1,
						marginLeft: -1,
					}}
				>
					<ChevronLeft htmlColor={theme.palette.neutral.dark} />
					<Typography color='neutral.dark'>{t('commons.GoBack')}</Typography>
				</Box>
				<Box
					sx={{
						marginTop: 5,
						display: 'grid',
						gridTemplateColumns: '1fr max-content',
						alignItems: 'center',
					}}
				>
					<Box>
						<Typography
							variant='h2'
							fontSize={40}
							fontWeight={600}
							color='neutral.lightest'
						>
							{t(`modules.${moduleId}.title` as any)}
						</Typography>
						<Typography color='neutral.dark' fontSize={16}>
							{t(`modules.${moduleId}.description` as any)}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'grid',
							gridAutoFlow: 'column',
							gap: 2,
						}}
					>
						<Typography color='neutral.dark' fontSize={16}>
							{dynoModule?.enabled ? t('commons.Enabled') : t('commons.Disabled')}
						</Typography>
						<Switch checked={dynoModule?.enabled} onChange={(_, checked) => toggleModule(dynoModule?.id as string, checked)} />
					</Box>
				</Box>
			</Box>
			<Box sx={{
				'& .dashboard-section': {
					pointerEvents: dynoModule?.enabled ? undefined : 'none',
					userSelect: dynoModule?.enabled ? undefined : 'none',
					position: 'relative',
					'&::before': {
						content: dynoModule?.enabled ? undefined : '""',
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						borderRadius: 2.5,
						background: t => t.palette.neutral.main,
						opacity: 0.7,
						cursor: 'not-allowed',
						zIndex: t => t.zIndex.modal,
					},
				},

			}}>
				{children}
			</Box>
		</>
	);
};
