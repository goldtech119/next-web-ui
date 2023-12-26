import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { Box, useTheme, Stack, Typography } from '@mui/material';
import { CalendarMonthOutlined, Edit, Delete } from '@mui/icons-material';
import { useAutoban } from '#hooks/data/useAutoban';
import { Switch } from '#components/common/switch/switch';
import Button from '#components/common/button';

export const RuleCard = ({ onEditRule, rule }: any) => {
  const t = useTranslations();
  const theme = useTheme();
  const { removeRule, updateRule } = useAutoban();

  const [checked, setChecked] = useState(rule?.enabled);

  const onEnabled = useCallback(
    (checked: boolean) => {
      updateRule(rule.id, { enabled: checked });
    },
    [rule.id, updateRule]
  );

  const handleToggleSwitch = useCallback(() => {
    const newChecked = !checked;
    setChecked(newChecked);
    onEnabled(newChecked);
  }, [checked, onEnabled]);

  const textRyleType: any = {
    invites: t('module_autoban.InvitesLabel'),
    age: t('module_autoban.AgeLabel'),
    noavatar: t('module_autoban.NoavatarLabel'),
    words: t('module_autoban.WordsLabel'),
  };

  return (
    <Box
      sx={{
        borderRadius: '1.25rem',
        border: `2px solid ${theme.palette.neutral.darker}`,
        background: theme.palette.neutral.darkest,
        maxWidth: '19rem',
        padding: '1.75rem 1.25rem',
      }}
    >
      <Stack
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        marginBottom={1}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <CalendarMonthOutlined />
          {t('commons.Created')}:
          {rule?.createdAt
            ? format(new Date(rule?.createdAt), 'dd MMM, yyyy')
            : ''}
        </Box>
        <Switch checked={checked} onChange={handleToggleSwitch} />
      </Stack>
      <Typography fontSize={18} color='neutral.lightest' marginBottom={1}>
        {rule?.name}
      </Typography>
      <Box sx={{ display: 'flex' }} fontSize={13} marginBottom={2}>
        <Box>{t('module_autoban.RuleType')}:</Box>
        <Box component='span' color='neutral.lightest'>
          {rule?.type}
        </Box>
      </Box>
      <Box fontSize={13}>{textRyleType[rule.type]}</Box>
      <Box sx={{ marginTop: '1.25rem', display: 'flex', gap: 2 }}>
        <Button
          buttonType='outlined'
          sx={{ display: 'flex', gap: 1 }}
          onClick={() => onEditRule(rule?.id)}
        >
          {t('commons.Edit')}
          <Edit
            sx={{
              color: theme.palette.neutral.dark,
              width: '20px',
            }}
          />
        </Button>
        <Button
          onClick={() => removeRule(rule?.id)}
          buttonType='outlined'
          sx={{ display: 'flex', gap: 1 }}
        >
          {t('commons.Delete')}
          <Delete
            sx={{
              color: theme.palette.neutral.dark,
              width: '20px',
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};
