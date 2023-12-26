import { useApi } from '#components/contexts/apiContext';
import type { CancelablePromise } from '@dynogg/dyno-api';
import type { GuildChannel } from '@dynogg/eris';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export type UseChannelsHook = () => {
	channels: GetChannelsApiResponse;
};

export type GetChannelsApiResponse = Array<GuildChannel>;

export const useChannels: UseChannelsHook = () => {
	const api = useApi();
	const params = useParams();

	const {
		data: channels = [],
	} = useSWR<GetChannelsApiResponse>(`${params.guildId}.channels`, () => api.guilds.getChannels(params.guildId as string) as CancelablePromise<GetChannelsApiResponse>);

	return { channels };
};

