import { useApi } from '#components/contexts/apiContext';
import { GetAnnouncementsDto, UpdateAnnouncementsDto } from '@dynogg/dyno-api';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import useSWR from 'swr';

export type UseAnnouncementsHook = () => {
  announcements: GetAnnouncementsDto | null;
  updateAnnouncements: (_values: UpdateAnnouncementsDto) => Promise<void>;
};

export const useAnnouncements: UseAnnouncementsHook = () => {
  const api = useApi();
  const params = useParams();

  const { data: announcements = null, mutate } = useSWR<GetAnnouncementsDto>(
    `${params.guildId}.announcements`,
    () => api.announcements.get(params.guildId as string)
  );

  const updateAnnouncements = useCallback(
    async (requestBody: UpdateAnnouncementsDto) => {
      api.announcements.update(params.guildId as string, requestBody);
    },
    [api.announcements, announcements, mutate, params.guildId]
  );

  return {
    announcements,
    updateAnnouncements,
  };
};
