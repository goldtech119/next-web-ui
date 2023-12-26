'use client';

import { useParams } from 'next/navigation';

import { BaseError } from '#types/errors';
import { GetGuildDto } from '@dynogg/dyno-api';
import React, { createContext, useContext, useMemo } from 'react';
import useSWR from 'swr';
import { useApi } from './apiContext';

export type GuildProviderProps = {
	guildId?: string | undefined;
} & React.PropsWithChildren;

type GuildContextType = {
	guild: GetGuildDto | undefined;
	guildId: string;
	isLoading: boolean;
	error?: BaseError;
};

const GuildContext = createContext<GuildContextType>({
	guild: undefined,
	isLoading: true,
	guildId: '',
});

export const GuildProvider: React.FC<GuildProviderProps> = ({ children }) => {
	const api = useApi();
	const params = useParams();
	const {
		data: guild,
		isLoading,
		error,
	} = useSWR<GetGuildDto, GuildContextType['error']>(params.guildId, (guildId: string) => api.guilds.get(guildId));

	const value: GuildContextType = useMemo(() => ({
		guildId: params.guildId as string,
		guild,
		isLoading,
		error,
	}), [guild, error, isLoading, params.guildId]);

	return <GuildContext.Provider value={value}>{children}</GuildContext.Provider>;
};

export const useGuild = () => {
	const context = useContext(GuildContext);

	if (context === undefined) {
		throw new Error('useGuild must be called from GuildContext');
	}

	return context;
};
