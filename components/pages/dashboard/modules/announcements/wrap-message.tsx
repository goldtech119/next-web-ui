'use client';

import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { FormSubmitHandler } from 'react-hook-form';
import {
  CreateAnnouncementsDto,
  UpdateAnnouncementsDto,
} from '@dynogg/dyno-api';
import { DashboardForm } from '#components/common/dashboard/form';
import { DashboardSection } from '#components/common/dashboard/section';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import { RichEditor } from '#components/common/richEditor';
import RowRadioGroup from '#components/common/RowRadioGroup/RowRadioGroup';
import { useAnnouncements } from '#hooks/data/useAnnouncements';

export const WrapMessage: FC<any> = ({
  title,
  defaultValues,
  nameType,
  nameMessage,
}) => {
  const t = useTranslations();
  const { updateAnnouncements } = useAnnouncements();

  const handleOnSubmit: FormSubmitHandler<
    UpdateAnnouncementsDto | CreateAnnouncementsDto
  > = (formData) => {
    updateAnnouncements(formData.data);
  };

  return (
    <DashboardSection title={title}>
      <DashboardForm
        formOptions={{
          defaultValues,
        }}
        formProps={{
          onSubmit: handleOnSubmit,
        }}
      >
        <FormFields>
          <FormField label='' name={nameType}>
            <RowRadioGroup
              defaultValue={defaultValues?.[nameType]}
              options={[
                {
                  label: t('module_announcements.PlainMessage'),
                  value: 'message',
                },
                { label: t('module_announcements.Embed'), value: 'embed' },
              ]}
            />
          </FormField>
          <FormField
            label={t('module_announcements.MessageContent')}
            name={nameMessage}
            dontRegister
          >
            <RichEditor name={nameMessage} />
          </FormField>
        </FormFields>
      </DashboardForm>
    </DashboardSection>
  );
};
