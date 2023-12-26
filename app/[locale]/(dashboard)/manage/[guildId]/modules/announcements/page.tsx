'use client';

import { Box, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { GeneralSettings } from '#components/pages/dashboard/modules/announcements/general-settings';
import { WrapMessage } from '#components/pages/dashboard/modules/announcements/wrap-message';
import { useAnnouncements } from '#hooks/data/useAnnouncements';

export default function AnnouncementsPage() {
  const t = useTranslations();
  const theme = useTheme();
  const { announcements } = useAnnouncements();

  return !announcements ? null : (
    <Box>
      <GeneralSettings />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '36px',
          mt: 4,
          [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        <WrapMessage
          title={t('module_announcements.JoinMessage')}
          defaultValues={{
            joinType: announcements?.joinType,
            joinMessage: announcements?.joinMessage,
          }}
          nameType={'joinType'}
          nameMessage={'joinMessage'}
        />
        <WrapMessage
          title={t('module_announcements.LeaveMessage')}
          defaultValues={{
            leaveType: announcements?.leaveType,
            leaveMessage: announcements?.leaveMessage,
          }}
          nameType={'leaveType'}
          nameMessage={'leaveMessage'}
        />
        <WrapMessage
          title={t('module_announcements.BanMessage')}
          defaultValues={{
            banType: announcements?.banType,
            banMessage: announcements?.banMessage,
          }}
          nameType={'banType'}
          nameMessage={'banMessage'}
        />
      </Box>
    </Box>
  );
}
