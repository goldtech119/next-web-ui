import { type CreateAutoMessageDto, type UpdateAutomessageDto } from '@dynogg/dyno-api';

import { useCallback } from 'react';
import useSWR from 'swr';

import { useApi } from '#components/contexts/apiContext';
import { useGuild } from '#components/contexts/guildContext';

export const useAutoMessage = () => {
	const api = useApi();
	const { guildId } = useGuild();

	const { data: automessages = [], mutate } = useSWR(`${guildId}.automessage`, () => api.automessage.list(guildId));

	const remove = useCallback(
		async (id: string) =>
			api.automessage.delete(guildId, id).then(async () => mutate([...automessages.filter(m => m._id !== id)])),
		[api, guildId, automessages, mutate],
	);

	const update = useCallback(
		async (id: string, values: UpdateAutomessageDto) =>
			api.automessage.update(guildId, id, values).then(async newValue =>
				mutate([
					...automessages.map(m => {
						if (newValue._id === m._id) {
							return newValue;
						}

						return m;
					}),
				]),
			),
		[api, guildId, automessages, mutate],
	);

	const create = useCallback(
		async (values: CreateAutoMessageDto) =>
			api.automessage.create(guildId, values).then(async newValue => mutate([...automessages, newValue])),
		[api, guildId, automessages, mutate],
	);

	return { automessages, remove, update, create };
};
