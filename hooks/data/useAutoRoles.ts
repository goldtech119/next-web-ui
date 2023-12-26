import { useApi } from "#components/contexts/apiContext";
import {
  CancelablePromise,
  CreateAutoRoleDto,
  CreateRankDto,
  GetAutoRoleDto,
  GetRankDto,
  UpdateAutoRoleDto,
  UpdateRankDto,
} from "@dynogg/dyno-api";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import useSWR from "swr";

type GetAutoRoleAPIResponse = Array<GetAutoRoleDto>;
type GetRanksAPIReponse = Array<GetRankDto>;

export type UseAutoRolesHook = () => {
  autoRoles: GetAutoRoleAPIResponse;
  ranks: GetRanksAPIReponse;
  updateRole: (
    guildId: string,
    roleId: string,
    data: UpdateAutoRoleDto
  ) => Promise<GetAutoRoleAPIResponse | undefined>;
  deleteRole: (guildId: string, roleId: string) => Promise<any>;
  updateRank: (
    guildId: string,
    rankId: string,
    data: UpdateRankDto
  ) => Promise<GetRanksAPIReponse | undefined>;
  deleteRank: (guildId: string, rankId: string) => Promise<any>;
  createRole: (
    guildIdL: string,
    data: CreateAutoRoleDto
  ) => Promise<GetAutoRoleAPIResponse | undefined>;
  createRank: (guildId: string, data: CreateRankDto) => Promise<GetRanksAPIReponse | undefined> 
};

export const useAutoRoles: UseAutoRolesHook = () => {
  const api = useApi();
  const params = useParams();

  const { data: autoRoles = [], mutate } = useSWR<GetAutoRoleAPIResponse>(
    `${params.guildId}.autoroles.roles`,
    () =>
      api.autoroles.listRoles(
        params.guildId as string
      ) as CancelablePromise<GetAutoRoleAPIResponse>
  );

  const { data: ranks = [], mutate: mutateRanks } = useSWR<GetRanksAPIReponse>(
    `${params.guildId}.autoroles.ranks`,
    () =>
      api.autoroles.listRanks(
        params.guildId as string
      ) as CancelablePromise<GetRanksAPIReponse>
  );

  const updateRole = useCallback(
    (guildId: string, roleId: string, data: UpdateAutoRoleDto) =>
      api.autoroles.updateRole(guildId, roleId, data).then(() => mutate()),
    []
  );

  const createRole = useCallback(
    (guildId: string, data: CreateAutoRoleDto) =>
      api.autoroles.createRole(guildId, data).then(() => mutate()),
    []
  );

  const deleteRole = useCallback(
    (guildId: string, roleId: string) =>
      api.autoroles.deleteRole(guildId, roleId).then(() => mutate()),
    []
  );

  const updateRank = useCallback(
    (guildId: string, rankId: string, data: UpdateRankDto) =>
      api.autoroles.updateRank(guildId, rankId, data).then(() => mutateRanks()),
    []
  );

  const deleteRank = useCallback(
    (guildId: string, rankId: string) =>
      api.autoroles.deleteRank(guildId, rankId).then(() => mutateRanks()),
    []
  );

  const createRank = useCallback(
    (guildId: string, data: CreateRankDto) =>
      api.autoroles.createRank(guildId, data).then(() => mutateRanks()),
    []
  );

  return {
    autoRoles,
    ranks,
    updateRole,
    deleteRole,
    updateRank,
    deleteRank,
    createRole,
    createRank
  };
};
