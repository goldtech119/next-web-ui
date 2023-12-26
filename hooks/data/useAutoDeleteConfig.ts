import { useApi } from '#components/contexts/apiContext';
import type { CancelablePromise, GetAutoDeleteDto } from '@dynogg/dyno-api';
import { useParams } from 'next/navigation';
import useSWR from 'swr';

export type UseAutoDeleteConfigHook = () => {
	config: GetConfigApiResponse;
};

export type GetConfigApiResponse = GetAutoDeleteDto[];

export const useAutoDeleteConfig: UseAutoDeleteConfigHook = () => {
	const api = useApi();
	const params = useParams();

	const {
		data: config = [],
	} = useSWR<GetConfigApiResponse>(`${params.guildId}.autdeleteconfig`, () => api.autodelete.listConfig(params.guildId as string) as CancelablePromise<GetConfigApiResponse>);

	return { config };
};
