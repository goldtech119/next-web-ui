import { useApi } from '#components/contexts/apiContext';
import { useGuild } from '#components/contexts/guildContext';
import {
	CreateAutoResponderDto,
	GetAutoResponderDto,
	UpdateAutoResponderDto,
} from '@dynogg/dyno-api';
import { useCallback } from 'react';
import useSWR from 'swr';

export type UseUpdatesHook = () => {
  messages: GetUpdatesApiResponse;
  remove: (_id: string) => Promise<void>;
  update: (_id: string, _values: UpdateAutoResponderDto) => Promise<void>;
  create: (_values: CreateAutoResponderDto) => Promise<void>;
};

export type GetUpdatesApiResponse = Array<
  GetAutoResponderDto & { createdAt?: string }
>;

export const useAutoResponder: UseUpdatesHook = () => {
	const api = useApi();
	const { guildId } = useGuild();

	const { data: messages = [], mutate } = useSWR(
		`${guildId}.autoresponder`,
		() => api.autoresponder.list(guildId),
	);

	const remove = useCallback(
		(id: string) =>
			api.autoresponder.delete(guildId, id).then(() => {
				mutate([...messages.filter(m => m.id !== id)]);
			}),
		[api, guildId, messages, mutate],
	);

	const update = useCallback(
		(id: string, values: UpdateAutoResponderDto) =>
			api.autoresponder.update(guildId, id, values).then(newValue => {
				mutate([
					...messages.map(m => {
						if (newValue.id === m.id) {
							return newValue;
						}

						return m;
					}),
				]);
			}),
		[api, guildId, messages, mutate],
	);
	const create = useCallback(
		(values: CreateAutoResponderDto) =>
			api.autoresponder.create(guildId, values).then(newValue => {
				mutate([...messages, newValue]);
			}),
		[api, guildId, messages, mutate],
	);

	return { messages, remove, update, create };
};
