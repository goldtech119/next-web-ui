import {
  Box,
  Input,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import {
  FormSubmitHandler,
  useFormContext,
  FieldValues,
} from 'react-hook-form';
import { useAutoban } from '#hooks/data/useAutoban';
import { Modal } from '#components/common/modal';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import { SelectElement } from '#components/common/forms/elements/select';
import { DashboardForm } from '#components/common/dashboard/form';
import { AutoCompleteWithChips } from '#components/common/forms/elements/auto-complete-with-chips';

enum RULE {
  INVITES = 'invites',
  NOAVATAR = 'noavatar',
  AGE = 'age',
  WORDS = 'words',
}

function millisecondsToHours(milliseconds: number) {
  return milliseconds / (1000 * 3600);
}

const itemsRuleType = [
  { label: 'Username Invites', value: 'invites' },
  { label: 'Account Age', value: 'age' },
  { label: 'Match Username', value: 'words' },
  { label: 'No Avatar', value: 'noavatar' },
];

const itemsAge = [
  { label: '24 hours', value: '24' },
  { label: '12 hours', value: '12' },
  { label: '6 hours', value: '6' },
];

export const ModalRule = ({ modal, formProps, defaultValue }: any) => {
  const t = useTranslations();
  const { createRule, updateRule } = useAutoban();

  const defaultValues =
    defaultValue === null
      ? {
          enabled: false,
          dm: false,
          age: null,
          wildcard: false,
          name: '',
          type: '',
        }
      : {
          name: defaultValue?.name,
          type: defaultValue?.type,
          dm: defaultValue?.dm,
          wildcard: false,
          words: defaultValue?.data?.words || [],
          age: millisecondsToHours(defaultValue?.data?.age) || null,
        };

  const handleOnSubmit: FormSubmitHandler<FieldValues> = async (formData) => {
    const { name, type, dm, age, words, wildcard } = formData.data;
    const requestBody: any = {
      name,
      type,
      dm,
      data: {},
    };

    if (type === RULE.AGE) {
      requestBody.data.age = age;
    }

    if (type === RULE.WORDS) {
      requestBody.data.words = words;
      requestBody.data.wildcard = wildcard;
    }

    if (formProps.type === 'create') {
      await createRule(requestBody);
    } else {
      await updateRule(formProps.id, requestBody);
    }

    modal.close();
  };

  return (
    <Modal
      title={
        formProps.type === 'create'
          ? t('module_autoban.NewRule')
          : t('module_autoban.EditRule')
      }
      modal={modal}
      hideDivider
    >
      <Box sx={{ width: '450px' }}>
        <DashboardForm
          formOptions={{
            defaultValues,
          }}
          formProps={{
            onSubmit: handleOnSubmit,
          }}
          buttonSx={{ width: '100%' }}
        >
          <RuleFormFields defaultValues={defaultValues} />
        </DashboardForm>
      </Box>
    </Modal>
  );
};

const RuleFormFields = ({ defaultValues }: any) => {
  const t = useTranslations();
  const { watch } = useFormContext();
  const { type } = watch();

  const textRyleType: any = {
    invites: t('module_autoban.InvitesLabel'),
    age: t('module_autoban.AgeLabel'),
    noavatar: t('module_autoban.NoavatarLabel'),
    words: t('module_autoban.WordsLabel'),
  };

  return (
    <FormFields>
      <FormField
        label={t('module_autoban.RuleName')}
        name='name'
        inputSx={{
          mt: 0,
          '.MuiInput-root': {
            background: '#232627',
          },
        }}
      >
        <Input placeholder={t('module_autoban.EnterTextHere')} />
      </FormField>
      <Box>
        <FormField
          inputSx={{ mt: 0 }}
          label={t('module_autoban.RuleType')}
          name='type'
        >
          <SelectElement
            value=''
            defaultValue={defaultValues?.type}
            items={itemsRuleType}
            name='type'
          />
        </FormField>
        <Typography sx={{ color: '#6C7275', mt: '14px' }} fontSize={12}>
          {textRyleType[type]}
        </Typography>
      </Box>

      {type === RULE.AGE && (
        <FormField
          inputSx={{ mt: 0 }}
          label={`${t('module_autoban.AgeThreshold')} ${t(
            'module_autoban.hours'
          )}`}
          name='age'
          dontRegister
        >
          <SelectElement
            defaultValue={defaultValues?.age}
            items={itemsAge}
            name='age'
            value=''
          />
        </FormField>
      )}

      {type === RULE.WORDS && (
        <FormField label={t('module_autoban.WordList')} name='words'>
          <AutoCompleteWithChips
            name='words'
            defaultValue={defaultValues?.words}
          />
        </FormField>
      )}
      <Box sx={{ pl: '10px' }}>
        <FormField
          label=''
          name='dm'
          containerSx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          labelSx={{ margin: 0 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={defaultValues.dm}
                sx={{ padding: 0, mr: 1 }}
              />
            }
            sx={{
              '.MuiFormControlLabel-label': {
                fontSize: '14px',
                color: (t) => t.palette.neutral.light,
              },
            }}
            label={t('module_autoban.SendDM')}
          />
        </FormField>

        {type === RULE.WORDS && (
          <FormField
            label=''
            name='wildcard'
            containerSx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
            labelSx={{ margin: 0 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={defaultValues.wildcard}
                  sx={{ padding: 0, mr: 1 }}
                />
              }
              sx={{
                '.MuiFormControlLabel-label': {
                  fontSize: '14px',
                  color: (t) => t.palette.neutral.light,
                },
              }}
              label={t('module_autoban.WildcardLabel')}
            />
          </FormField>
        )}
      </Box>
    </FormFields>
  );
};
