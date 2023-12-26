import { useGuild } from '#components/contexts/guildContext';
import Box, { BoxProps } from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import Image from 'next/image';
import React from 'react';

export type GuildNameProps = {
	hideBadge?: boolean;
	extendedLabel?: string;
	sx?: BoxProps['sx'];
};

export const GuildName: React.FC<GuildNameProps> = ({ hideBadge, extendedLabel, sx }) => {
	const { guild } = useGuild();
	const imageSize = 60;

	return (
		<Box
			sx={{
				display: 'grid',
				gridAutoFlow: 'column',
				gap: 2,
				alignItems: 'center',
				width: 'fit-content',
				...sx,
			}}
		>
			<Box
				sx={{
					borderRadius: '50%',
					background: 'linear-gradient(174.35deg, #393e4a 0%, #292f3c 100%)',
					height: imageSize,
					width: imageSize,
					display: 'grid',
					placeContent: 'center',
					overflow: 'hidden',
				}}
			>
				{guild ? (
					<Image
						src={`${guild.iconURL}?size=${imageSize}`}
						alt='Guild icon'
						width={imageSize}
						height={imageSize}
					/>
				) : (
					<Skeleton height={imageSize} width={imageSize} variant='circular' />
				)}
			</Box>
			<Box sx={{ display: 'grid', gap: 1 }}>
				<Box
					component='span'
					sx={{
						fontSize: 26,
						fontWeight: 600,
						lineHeight: 1,
						width: guild ? undefined : 200,
					}}
				>
					{guild ? `${guild.name}${extendedLabel ? ` ${extendedLabel}` : ''}` : <Skeleton variant='text' />}
				</Box>
				{!hideBadge && guild?.isPremium ? (
					<Box
						component='span'
						sx={{
							fontSize: 11,
							fontWeight: 600,
							letterSpacing: 1.2,
							lineHeight: 1,
							textTransform: 'uppercase',
							color: 'warning.main',
						}}
					>
						Premium
					</Box>
				) : undefined}
			</Box>
		</Box>
	);
};
