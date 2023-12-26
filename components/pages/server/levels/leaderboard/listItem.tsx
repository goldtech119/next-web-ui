import { DiscordAvatar } from '#components/common/discordAvatar';
import { abbreviateNumber } from '#helpers/numberHelper';
import { GuildLevel } from '#types/dyno/GuildLevel';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import React from 'react';

export type LeaderboardListItemProps = {
	item: GuildLevel | undefined;
	position: number;
	headerColumns: string;
};

export const LeaderboardListItem: React.FC<LeaderboardListItemProps> = ({ item, position, headerColumns }) => item ? (
	<Box
		sx={theme => ({
			borderRadius: theme.shape.borderRadius,
			background: `linear-gradient(45deg, ${theme.palette.primary.main} -500%, ${theme.palette.background.paper}) 0%`,
			backgroundColor: theme.palette.background.paper,
			py: 1,
			px: 2,
			mb: position % 10 === 0 ? 2 : undefined,
			display: 'grid',
			gridAutoFlow: 'column',
			justifyContent: 'start',
			alignItems: 'center',
			[theme.breakpoints.up('md')]: {
				gridTemplateColumns: headerColumns,
			},
			[theme.breakpoints.down('md')]: {
				gridTemplateAreas: `"position avatar nameAndRole"
                              "totalMessages points level"`,
				gap: 1,
			},
		})}
	>
		<Box
			sx={theme => ({
				fontWeight: 'bold',
				fontSize: position <= 10 ? '2rem' : '1.5rem',
				textAlign: 'center',
				[theme.breakpoints.down('md')]: {
					gridArea: 'position',
				},
			})}
		>
			{position.toString()}
		</Box>
		<DiscordAvatar
			user={item.user}
			sx={theme => ({
				height: position <= 10 ? '4rem' : '3rem',
				width: position <= 10 ? '4rem' : '3rem',
				[theme.breakpoints.down('md')]: {
					gridArea: 'avatar',
				},
			})}
		/>
		<Box
			sx={theme => ({
				display: 'grid',
				ml: 3,
				[theme.breakpoints.down('md')]: {
					gridArea: 'nameAndRole',
				},
			})}
		>
			<Box
				sx={{
					fontSize: '1.25rem',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
				}}
			>
				<strong>{item.user?.username}</strong>
				<Typography variant='caption'>#{item.user?.discriminator}</Typography>
			</Box>
		</Box>
		<Box
			sx={theme => ({
				textAlign: 'center',
				[theme.breakpoints.down('md')]: {
					gridArea: 'totalMessages',
				},
			})}
		>
			<Typography
				variant='overline'
				sx={theme => ({
					display: 'block',
					color: theme.palette.grey[700],
					fontWeight: 'bold',
					[theme.breakpoints.up('md')]: { display: 'none' },
				})}
			>
					Messages
			</Typography>
			{abbreviateNumber(item.totalMessages)}
		</Box>
		<Box
			sx={theme => ({
				textAlign: 'center',
				[theme.breakpoints.down('md')]: {
					gridArea: 'points',
				},
			})}
		>
			<Typography
				variant='overline'
				sx={theme => ({
					display: 'block',
					color: theme.palette.grey[700],
					fontWeight: 'bold',
					[theme.breakpoints.up('md')]: { display: 'none' },
				})}
			>
					XP
			</Typography>
			{abbreviateNumber(item.points)}
		</Box>
		<Box
			sx={theme => ({
				textAlign: 'center',
				[theme.breakpoints.down('md')]: {
					gridArea: 'level',
				},
			})}
		>
			<Typography
				variant='overline'
				sx={theme => ({
					display: 'block',
					color: theme.palette.grey[700],
					fontWeight: 'bold',
					[theme.breakpoints.up('md')]: { display: 'none' },
				})}
			>
					Level
			</Typography>
			{item.level}
		</Box>
	</Box>
) : (
	<Skeleton variant='rounded' height={80} />
);
