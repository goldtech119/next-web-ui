import { DiamondRounded } from '@mui/icons-material';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

export interface PremiumBadgeProps {
  variant?: 'full' | 'icon';
  sx?: SxProps<Theme>;
}

export const PremiumBadge: React.FC<PremiumBadgeProps> = ({
	variant = 'full',
	sx,
}) => {
	const t = useTranslations();

	return (
		<Box
			sx={{
				display: 'inline-grid',
				alignItems: 'center',
				justifyContent: 'center',
				gridTemplateColumns: '1fr',
				background: '#4a4428',
				borderRadius: 2,
				paddingX: 1,
				paddingY: 0.5,
				...sx,
			}}
		>
			{variant === 'icon' && (
				<DiamondRounded color='warning' sx={{ height: 16, width: 16 }} />
			)}
			{variant === 'full' && (
				<Typography
					color='warning.main'
					fontSize={12}
					lineHeight={1}
					component='span'
				>
					{t('commons.Premium')}
				</Typography>
			)}
		</Box>
	);
};
