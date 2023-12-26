import { type SWRConfiguration } from 'swr';
export const defaultFetcher = async <T>(
	url: string,
	init: RequestInit = {
		credentials: 'same-origin',
		headers: {
			Accept: 'application/json',
			Authorization: process.env.API_KEY!,
		} satisfies HeadersInit,
	},
) => fetch(url, init).then(res => res.json() as T);

export const globalSwrConfig: SWRConfiguration = {
	fetcher: defaultFetcher,
	onError: (error, key, config) => console.error(error, key),
};
