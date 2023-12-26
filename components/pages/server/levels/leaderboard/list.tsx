import { GuildLevel } from '#types/dyno/GuildLevel';
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import { LeaderboardListItem } from './listItem';

export type LeaderboardListProps = {
	items: GuildLevel[];
	isLoading: boolean;
};

const headerColumns = '60px max-content 1fr 100px 100px 100px';

export const LeaderboardList: React.FC<LeaderboardListProps> = ({ items, isLoading }) => {
	const leaderboardItems = useMemo<(GuildLevel | undefined)[]>(
		() => (!items.length && isLoading ? Array<undefined>(5).fill(undefined) : items),
	[isLoading, items],
	);

	return (
		<Box sx={{ display: 'grid', gap: 1 }}>
			<Box
				sx={theme => ({
					display: 'none',
					gridAutoFlow: 'column',
					mx: '18px',
					[theme.breakpoints.up('md')]: {
						display: 'grid',
						gridTemplateColumns: headerColumns,
					},
				})}
			>
				<Box
					sx={theme => ({
						color: theme.palette.grey[700],
						fontWeight: 'bold',
					})}
				>
					Position
				</Box>
				<div />
				<div />
				<Box
					sx={theme => ({
						textAlign: 'center',
						color: theme.palette.grey[700],
						fontWeight: 'bold',
					})}
				>
					Messages
				</Box>
				<Box
					sx={theme => ({
						textAlign: 'center',
						color: theme.palette.grey[700],
						fontWeight: 'bold',
					})}
				>
					XP
				</Box>
				<Box
					sx={theme => ({
						textAlign: 'center',
						color: theme.palette.grey[700],
						fontWeight: 'bold',
					})}
				>
					Level
				</Box>
			</Box>
			{leaderboardItems.map((item, idx) => (
				<LeaderboardListItem key={item?.userId ?? `leaderboarditem:${idx}`} item={item} position={idx + 4} headerColumns={headerColumns} />
			))}
		</Box>
	);
};
