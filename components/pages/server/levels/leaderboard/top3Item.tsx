import { DiscordAvatar } from '#components/common/discordAvatar';
import { CrownIcon } from '#components/common/icons/crown';
import { GuildLevel } from '#types/dyno/GuildLevel';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import React from 'react';

export type Top3ItemProps = {
	item: GuildLevel | undefined;
	position: number;
};

export const Top3Item: React.FC<Top3ItemProps> = ({ item, position }) => (
	<Box
		sx={theme => ({
			display: 'grid',
			alignItems: 'end',
			gridTemplateRows: '1fr max-content',
			maxWidth: 220,
			[theme.breakpoints.up('md')]: {
				order: positionOrder[position],
			},
		})}
	>
		<CrownIcon fill={positionColor[position]} sx={{ margin: '0 auto', height: 30, width: 30 }} />
		<Badge
			overlap='circular'
			badgeContent={item ? item.level.toString() : undefined}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			sx={theme => ({
				'& .MuiBadge-badge': {
					bottom: 0,
					left: '50%',
					fontFamily: 'Courier New',
					fontWeight: 'bold',
					fontSize: '1.5rem',
					p: 2,
					borderRadius: '100px',
					background: theme.palette.background.paper,
					border: `2px solid ${positionColor[position]}`,
					color: theme.palette.getContrastText(theme.palette.background.paper),
				},
			})}
		>
			{item ? (
				<DiscordAvatar
					user={item.user}
					sx={{
						margin: '0 auto',
						height: positionSize[position],
						width: positionSize[position],
						border: `2px solid ${positionColor[position]}`,
					}}
				/>
			) : (
				<Skeleton variant='circular' height={positionSize[position]} width={positionSize[position]} />
			)}
		</Badge>
		<Box
			sx={{
				color: ({ palette }) => palette.neutral.light,
				textAlign: 'center',
				fontSize: '1.25rem',
				mt: 3,
				textOverflow: 'ellipsis',
				overflow: 'hidden',
			}}
		>
			{item ? (
				<>
					<strong>{item.user?.username}</strong>
					<Typography variant='caption'>#{item.user?.discriminator}</Typography>
				</>
			) : (
				<Skeleton />
			)}
		</Box>
	</Box>
);

const positionColor: Record<number, string> = {
	1: '#ffd700',
	2: '#c0c0c0',
	3: '#cd7f32',
};

const positionSize: Record<number, number> = {
	1: 220,
	2: 180,
	3: 160,
};

const positionOrder: Record<number, number> = {
	1: 2,
	2: 1,
	3: 3,
};
