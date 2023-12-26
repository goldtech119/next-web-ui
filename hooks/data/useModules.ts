'use client';

import { useApi } from '#components/contexts/apiContext';
import { GetGuildModuleDto } from '@dynogg/dyno-api';
import { EmojiPeopleRounded, PeopleAltRounded, PhoneIphoneRounded, ReviewsRounded, SecurityRounded, SmartToyRounded, TimerRounded } from '@mui/icons-material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';

export type UseModulesHook = () => {
	modules: GetModulesApiResponse;
	categories: Record<string, GetModulesApiResponse>;
	toggleModule: (id: string, state?: boolean) => boolean;
	getModule: (id:string) => GetGuildModuleDto | undefined;
};

export type GetModulesApiResponse = Array<GetGuildModuleDto>;

export const useModules: UseModulesHook = () => {
	const api = useApi();
	const params = useParams();

	const {
		data: modules = [],
		mutate,
	} = useSWR<GetModulesApiResponse>(`${params.guildId}.modules`, () => api.guilds.getModules(params.guildId as string));

	const getModule = useCallback((id: string) => modules.find(m => m.id === id), [modules]);

	const toggleModule = useCallback((id: string, state?: boolean) => {
		const foundModule = modules.find(m => m.id === id);

		if (!foundModule) {
			throw new Error('Module not found.');
		}

		const enabled = state ?? foundModule.enabled;
		api.guilds.setModuleStatus(params.guildId as string, id, enabled).then(() => mutate());

		return enabled;
	}, [api.guilds, modules, mutate, params.guildId]);

	const categories = useMemo(() => modules.reduce((record, module) => {
		if (module.category) {
			if (record[module.category]) {
				record[module.category].push(module);
			} else {
				record[module.category] = [module];
			}
		}

		return record;
	}, {} as Record<string, GetModulesApiResponse>), [modules]);

	return { modules, categories, toggleModule, getModule };
};

export type Category = {
	id: string,
	color: `#${string}`,
	Icon: OverridableComponent<any>
}

export const categoryMetadataMap: Record<string, Category> = {
	automation: {
		id: 'automation',
		color: '#9e74f4',
		Icon: SmartToyRounded,
	},
	engagement: {
		id: 'engagement',
		color: '#d84c10',
		Icon: PeopleAltRounded,
	},
	moderation: {
		id: 'moderation',
		color: '#3e90f0',
		Icon: SecurityRounded,
	},
	socialfeeds: {
		id: 'socialfeeds',
		color: '#52ba69',
		Icon: PhoneIphoneRounded,
	},
	servermanagement: {
		id: 'servermanagement',
		color: '#e68a1d',
		Icon: TimerRounded,
	},
	utilities: {
		id: 'utilities',
		color: '#e462e7',
		Icon: ReviewsRounded,
	},
};

export const moduleIconMap:Record<string, OverridableComponent<any>> = {
	welcome: EmojiPeopleRounded,
};
