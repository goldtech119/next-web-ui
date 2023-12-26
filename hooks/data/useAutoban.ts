'use client';

import { useApi } from '#components/contexts/apiContext';
import {
  AutoBanRule,
  CreateAutoBanRuleDto,
  GetAutoBanRuleDto,
  UpdateAutoBanRuleDto,
} from '@dynogg/dyno-api';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import useSWR from 'swr';

export type UseAutobanHook = () => {
  rules: GetAutobanApiResponse;
  removeRule: (_id: string) => Promise<void>;
  updateRule: (_id: string, _values: UpdateAutoBanRuleDto) => Promise<void>;
  createRule: (_values: CreateAutoBanRuleDto) => Promise<void>;
};

export type GetAutobanApiResponse = Array<GetAutoBanRuleDto>;

export const useAutoban: UseAutobanHook = () => {
  const api = useApi();
  const params = useParams();

  const { data: rules = [], mutate } = useSWR<any>(
    `${params.guildId}.autoban`,
    () => api.autoban.listRules(params.guildId as string)
  );

  const createRule = useCallback(
    async (requestBody: CreateAutoBanRuleDto) => {
      api.autoban
        .createRule(params.guildId as string, requestBody)
        .then(() => mutate([...rules, requestBody as any]));
    },
    [api.autoban, rules, mutate, params.guildId]
  );

  const updateRule = useCallback(
    async (ruleId: string, requestBody: UpdateAutoBanRuleDto) => {
      api.autoban
        .updateRule(params.guildId as string, ruleId, requestBody)
        .then((newRule) => {
          mutate([
            ...rules.map((rule: AutoBanRule) => {
              if (newRule.id === rule.id) {
                return newRule;
              }

              return rule;
            }),
          ]);
        });
    },
    [api.autoban, rules, mutate, params.guildId]
  );

  const removeRule = useCallback(
    async (ruleId: string) => {
      api.autoban
        .deleteRule(params.guildId as string, ruleId)
        .then(() =>
          mutate([...rules.filter((f: AutoBanRule) => f.id !== ruleId)])
        );
    },
    [api.autoban, rules, mutate, params.guildId]
  );

  return { rules, createRule, updateRule, removeRule };
};
