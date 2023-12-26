'use client';

import Button from '#components/common/button';
import { ChannelSelectElement } from '#components/common/forms/elements/channelSelect';
import { RoleSelectElement } from '#components/common/forms/elements/roleSelect';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import { Box, Checkbox, Input, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FormProvider, useForm } from 'react-hook-form';

export default function ServerSettingsPage() {
	const theme = useTheme();
	const methods = useForm();
	const t = useTranslations();

	const onSubmit = (data: object) => {
		console.log(data);
	};

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.neutral.main,
				padding: '2.25rem',
				borderRadius: '1.25rem',
				marginTop: '1rem',
			}}
		>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<FormFields>
						<FormField label={t('form.BotNickname.label')} name='bot-name'>
							<Input placeholder={t('form.BotNickname.placeholder')} />
						</FormField>
						<FormField label={t('form.Roles.label')} name='roles'>
							<RoleSelectElement name='roles' value={[]} multiple />
						</FormField>
						<FormField label={t('form.Command.label')} name='command'>
							<Input placeholder={t('form.Command.placeholder')} />
						</FormField>
						<FormField
							label={t('form.ChannelNotifications.label')}
							name='channel'
						>
							<ChannelSelectElement
								name='channel'
								value=''
								placeholder={t('form.ChannelNotifications.placeholder')}
							/>
						</FormField>
						<FormField label={t('form.Timezone.label')} name='timezone'>
							{({ registerOptions }) => (
								<div style={{ display: 'flex', columnGap: '1.25rem' }}>
									<Input {...registerOptions} />
									<Button
										buttonType='other'
										sx={{ height: '52px', paddingX: '1.5rem' }}
									>
										{t('commons.Detect')}
									</Button>
								</div>
							)}
						</FormField>
						<FormField
							label={t('form.DisableWarnings.label')}
							name='warnings-flag'
							containerSx={{
								display: 'flex',
								flexDirection: 'row-reverse',
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}
							inputSx={{ mt: 0 }}
						>
							<Checkbox />
						</FormField>
						<Button type='submit' sx={{ maxWidth: '135px', height: '3rem' }}>
							{t('commons.Save')}
						</Button>
					</FormFields>
				</form>
			</FormProvider>
		</Box>
	);
}
