import { useApi } from '#components/contexts/apiContext';
import type { CancelablePromise } from '@dynogg/dyno-api';
import type { Emoji } from '@dynogg/eris';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export type UseEmojisHook = () => {
	emojis: GetEmojisApiResponse;
};

export type GetEmojisApiResponse = Array<Emoji>;

export const useEmojis: UseEmojisHook = () => {
	const api = useApi();
	const params = useParams();

	const {
		data: emojis = [],
	} = useSWR<GetEmojisApiResponse>(`${params.guildId}.emojis`, () => api.guilds.getEmojis(params.guildId as string) as CancelablePromise<GetEmojisApiResponse>);

	return { emojis };
};

