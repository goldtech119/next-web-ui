import { useApi } from "#components/contexts/apiContext";
import type {
  CancelablePromise,
  CreateAutoDeleteDto,
  GetAutoDeleteModuleDto,
} from "@dynogg/dyno-api";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import useSWR from "swr";

export type UseAutoDeleteHook = () => {
  module: GetModuleApiResponse;
  createAutoDelete: (
    guildId: string,
    data: CreateAutoDeleteDto
  ) => Promise<GetModuleApiResponse | undefined>;
  deleteAutoDeleteConfig: (guildId: string, channelId: string) => Promise<any>;
};

export type GetModuleApiResponse = GetAutoDeleteModuleDto;

export const useAutoDelete: UseAutoDeleteHook = () => {
  const api = useApi();
  const params = useParams();

  const { data: module = { configs: [] }, mutate } = useSWR<GetModuleApiResponse>(
    `${params.guildId}.autodelete`,
    () =>
      api.autodelete.get(
        params.guildId as string
      ) as CancelablePromise<GetModuleApiResponse>
  );

  const createAutoDelete = useCallback(
    (guildId: string, data: CreateAutoDeleteDto) =>
      api.autodelete
        .createConfig(guildId, data)
        .then(() => mutate()) as Promise<GetModuleApiResponse | undefined>,
    []
  );

  const deleteAutoDeleteConfig = useCallback(
	(guildId: string, channelId: string) => api.autodelete.deleteConfig(guildId, channelId).then(() => mutate()), []);

  return { module, createAutoDelete, deleteAutoDeleteConfig };
};
