import { useApi } from '#components/contexts/apiContext';
import { useAuth } from '#components/contexts/authContext';
import { GetFavoriteFeatureDto } from '@dynogg/dyno-api';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import useSWR from 'swr';

export type UseFavoriteModulesHook = () => {
	favorites: Array<GetFavoriteFeatureDto>;
    add: (id:string) => void;
    remove: (id: string) => void;
	isFavorited: (id: string) => boolean;
};

export const useFavoriteModules: UseFavoriteModulesHook = () => {
	const params = useParams();
	const { user } = useAuth();
	const api = useApi();

	const {
		data: favorites = [],
		mutate,
	} = useSWR(`${user!.id}.${params.guildId}.favorites`, () => api.favoriteFeatures.list(params.guildId as string, user!.id));

	const add = useCallback((id: string) => {
		api.favoriteFeatures.create(params.guildId as string, user!.id, { featureId: id }).then(() => mutate([...favorites, { featureId: id } as any]));
	}, [api.favoriteFeatures, favorites, mutate, params.guildId, user]);
	const remove = useCallback((id: string) => {
		api.favoriteFeatures.delete(params.guildId as string, user!.id, id).then(() => mutate([...favorites.filter(f => f.featureId !== id)]));
	}, [api.favoriteFeatures, favorites, mutate, params.guildId, user]);
	const isFavorited = useCallback((id: string) => Boolean(favorites.find(f => f.featureId === id)), [favorites]);

	return { favorites, add, remove, isFavorited };
};

