'use client';

import { GuildName } from '#components/common/guild/guildName';
import { useAuth } from '#components/contexts/authContext';
import { useGuild } from '#components/contexts/guildContext';
import { useServerLeaderboard } from '#hooks/data/useServerLeaderboard';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { LeaderboardList } from './list';
import { Top3 } from './top3';

export const LevelsLeaderboard: React.FC = () => {
	const { guild } = useGuild();
	const { user } = useAuth();
	const { leaderboard, isLoading } = useServerLeaderboard(guild?._id, user?.id);

	const top3List = useMemo(() => leaderboard.slice(0, 3), [leaderboard]);
	const leaderboardList = useMemo(() => leaderboard.slice(3), [leaderboard]);

	return (
		<Box sx={{ maxWidth: 1200, mx: 'auto' }}>
			<GuildName hideBadge extendedLabel='Leaderboard' sx={{ mb: 2 }} />
			<Top3 items={top3List} />
			<LeaderboardList items={leaderboardList} isLoading={isLoading} />
		</Box>
	);
};
