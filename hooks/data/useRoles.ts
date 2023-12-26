import { useApi } from '#components/contexts/apiContext';
import { CancelablePromise } from '@dynogg/dyno-api';
import { Role } from '@dynogg/eris';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import useSWR from 'swr';

export type UseRolesHook = () => {
	roles: GetRolesApiResponse;
	getRole: (id: string) => Role | undefined;
};

export type GetRolesApiResponse = Array<Role>;

export const useRoles: UseRolesHook = () => {
	const api = useApi();
	const params = useParams();

	const {
		data: roles = [],
	} = useSWR<GetRolesApiResponse>(`${params.guildId}.roles`, () => api.guilds.getRoles(params.guildId as string) as CancelablePromise<GetRolesApiResponse>);

	const getRole = useCallback((id: string) => roles.find(r => r.id === id), [roles]);

	return { roles, getRole };
};
