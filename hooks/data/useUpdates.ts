import { useApi } from '#components/contexts/apiContext';
import { GetUpdateDto } from '@dynogg/dyno-api';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export type UseUpdatesHook = () => {
	updates: GetUpdatesApiResponse;
};

export type GetUpdatesApiResponse = Array<GetUpdateDto>;

export const useUpdates: UseUpdatesHook = () => {
	const api = useApi();
	const params = useParams();

	const {
		data: updates = [],
	} = useSWR(`${params.guildId}.updates`, () => api.updates.list());

	return { updates };
};
