import { GuildLevel } from "#types/dyno/GuildLevel";
import React from "react";
import useSWR from "swr";

type UseServerLeaderboardHook = (
  guildId: string | undefined,
  userId?: string | undefined,
  options?: UseServerLeaderboardOptions
) => {
  leaderboard: GuildLevel[];
  userLevel: GuildLevel | undefined;
  isLoading: boolean;
};

type UseServerLeaderboardOptions = {
  skip?: number;
  take?: number;
};

export const useServerLeaderboard: UseServerLeaderboardHook = (
  guildId,
  userId,
  options
) => {
  const url = React.useMemo(() => {
    const url = new URL(
      `${process.env.API_URL}/api/server/${guildId}/levels/leaderboard`
    );

    if (userId) {
      url.searchParams.append("userId", userId);
    }

    if (options) {
      Object.entries(options).forEach(([option, value]) => {
        if (value != undefined) {
          url.searchParams.append(option, value.toString());
        }
      });
    }

    return url;
  }, [guildId, options, userId]);

  const req = useSWR<ServerLeaderboardApiResponse>(guildId ? url : null);

  return {
    leaderboard: req.data?.leaderboard ?? [],
    userLevel: req.data?.userLevel,
    isLoading: req.isValidating,
  };
};

type ServerLeaderboardApiResponse = {
  leaderboard: GuildLevel[];
  userLevel: GuildLevel | undefined;
};
