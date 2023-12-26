'use client';

import { SetStateAction, useCallback, useState, useMemo } from 'react';
import { Box, Input, Stack, Typography, Tabs } from '@mui/material';
import { Search, Add } from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { useAutoban } from '#hooks/data/useAutoban';
import Tab from '#components/common/tabs';
import { useTabs } from '#components/contexts/tabContext';
import { Pagination } from '#components/common/pagination/pagination';
import { useModal } from '#components/common/modal';
import Button from '#components/common/button';
import { NoRules } from '#components/pages/dashboard/modules/autoban/no-rules';
import { ModalRule } from '#components/pages/dashboard/modules/autoban/modal-rule';
import { RuleCard } from '#components/pages/dashboard/modules/autoban/rule-card';

type FormPropsType =
  | { id: string; type: 'update' }
  | { type: 'create'; id: null };

export default function AutoBanPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const t = useTranslations();
  const { activeTab, setActiveTab } = useTabs();

  const { rules } = useAutoban();

  const [formProps, setFormProps] = useState<FormPropsType>({
    type: 'create',
    id: null,
  });

  const modal = useModal({ renderOnLoad: false });

  const onEditRule = useCallback(
    (id: string) => {
      setFormProps({ type: 'update', id });
      modal.open();
    },
    [modal]
  );

  const onNewRule = useCallback(() => {
    setFormProps({ type: 'create', id: null });
    modal.open();
  }, [modal]);

  const defaultValue = useMemo(() => {
    if (formProps.id === null) {
      return null;
    }

    return rules.find((rule) => rule.id === formProps.id!);
  }, [formProps.id, rules]);

  const handleChange = (_event: any, value: SetStateAction<number>) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Box
        sx={{
          padding: '2rem 1.75rem',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Typography marginBottom={2}>
          {t('module_autoban.SearchRules')}
        </Typography>
        <Stack flexDirection='row' gap={4}>
          <Input startAdornment={<Search />} />
          <Button
            sx={{ height: '3rem', whiteSpace: 'pre', px: 6 }}
            onClick={onNewRule}
          >
            <Add /> {t('commons.CreateNewRule')}
          </Button>
          {modal.isOpen && (
            <ModalRule
              modal={modal}
              formProps={formProps}
              defaultValue={defaultValue}
            />
          )}
        </Stack>
      </Box>
      <Box sx={{ padding: '2rem 1.75rem' }}>
        <Typography marginBottom={2}>
          {t('module_autoban.SortRulesBy')}
        </Typography>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          sx={{
            marginBottom: 7,
            '.MuiTabs-flexContainer': {
              gap: '13px',
            },
          }}
        >
          <Tab label={t('module_autoban.All')} index={0} />
          <Tab label={t('module_autoban.Active')} index={1} />
          <Tab label={t('module_autoban.Inactive')} index={2} />
          <Tab label={t('module_autoban.Newest')} index={3} />
          <Tab label={t('module_autoban.Oldest')} index={4} />
        </Tabs>

        <Box
          sx={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {rules.length ? (
            rules?.map((rule: any) => (
              <RuleCard key={rule.id} rule={rule} onEditRule={onEditRule} />
            ))
          ) : (
            <NoRules />
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <Pagination
            setCurrentPage={setCurrentPage}
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </Box>
      </Box>
    </Box>
  );
}
