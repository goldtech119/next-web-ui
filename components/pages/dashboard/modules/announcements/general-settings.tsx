'use client';

import { FC } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FormSubmitHandler, FieldValues } from 'react-hook-form';
import { DashboardForm } from '#components/common/dashboard/form';
import { DashboardSection } from '#components/common/dashboard/section';
import { ChannelSelectElement } from '#components/common/forms/elements/channelSelect';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import { useAnnouncements } from '#hooks/data/useAnnouncements';
import {
  CreateAnnouncementsDto,
  UpdateAnnouncementsDto,
} from '@dynogg/dyno-api';

export const GeneralSettings: FC = () => {
  const t = useTranslations();
  const { announcements, updateAnnouncements } = useAnnouncements();

  const handleOnSubmit: FormSubmitHandler<FieldValues> = (formData) => {
    const newFormData = {
      ...formData.data,
      channel: formData?.data?.channel?.channels?.[0]?.id,
    };
    updateAnnouncements(newFormData);
  };

  const defaultValues = {
    channel: announcements?.channel,
    joinEnabled: announcements?.joinEnabled,
    leaveEnabled: announcements?.leaveEnabled,
    banEnabled: announcements?.banEnabled,
    dmJoins: announcements?.dmJoins,
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <DashboardSection title={t('module_announcements.GeneralSettings')}>
        <DashboardForm
          formOptions={{
            defaultValues,
          }}
          formProps={{
            onSubmit: handleOnSubmit,
          }}
        >
          <FormFields>
            <FormField
              label={t('module_announcements.SetAnnouncementChannel')}
              name='channel'
              options={{ required: true }}
              dontRegister
              containerSx={{ maxWidth: '360px' }}
            >
              <ChannelSelectElement
                defaultValue={[{ id: defaultValues?.channel || '', name: '' }]}
                name='channel'
                value=''
              />
            </FormField>

            <FormField
              label=''
              name='joinEnabled'
              containerSx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'flex-end',
                margin: 0,
              }}
              labelSx={{ margin: 0 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={defaultValues.joinEnabled}
                    sx={{ padding: 0, mr: 1 }}
                  />
                }
                sx={{
                  '.MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: (t) => t.palette.neutral.light,
                  },
                }}
                label={t('module_announcements.EnableJoinMessages')}
              />
            </FormField>

            <FormField
              label=''
              name='leaveEnabled'
              containerSx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'flex-end',
                margin: 0,
              }}
              labelSx={{ margin: 0 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={defaultValues.leaveEnabled}
                    sx={{ padding: 0, mr: 1 }}
                  />
                }
                sx={{
                  '.MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: (t) => t.palette.neutral.light,
                  },
                }}
                label={t('module_announcements.EnableLeaveMessages')}
              />
            </FormField>
            <FormField
              label=''
              name='banEnabled'
              containerSx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'flex-end',
                margin: 0,
              }}
              labelSx={{ margin: 0 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={defaultValues.banEnabled}
                    sx={{ padding: 0, mr: 1 }}
                  />
                }
                sx={{
                  '.MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: (t) => t.palette.neutral.light,
                  },
                }}
                label={t('module_announcements.EnableBanMessages')}
              />
            </FormField>
            <FormField
              label=''
              name='dmJoins'
              containerSx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                justifyContent: 'flex-end',
                margin: 0,
              }}
              labelSx={{ margin: 0 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={defaultValues.dmJoins}
                    sx={{ padding: 0, mr: 1 }}
                  />
                }
                sx={{
                  '.MuiFormControlLabel-label': {
                    fontSize: '14px',
                    color: (t) => t.palette.neutral.light,
                  },
                }}
                label={t('module_announcements.SendJoinMessagesDM')}
              />
            </FormField>
          </FormFields>
        </DashboardForm>
      </DashboardSection>
    </Box>
  );
};
