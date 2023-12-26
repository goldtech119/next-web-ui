'use client';
import { EmojiPickerInput } from '#components/common/EmojiPickerInput';
import { ColorElement } from '#components/common/colorPicker/element';
import { DashboardForm } from '#components/common/dashboard/form';

import { ChannelSelectElement } from '#components/common/forms/elements/channelSelect';
import { RoleSelectElement } from '#components/common/forms/elements/roleSelect';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import {
	Box,
	Checkbox,
	TextField,
	useTheme,
} from '@mui/material';
import { useTranslations } from 'next-intl';

export function StarboardSettings() {
	const theme = useTheme();
	const t = useTranslations();

	return (
		<Box>
			<Box
				sx={{
					backgroundColor: theme.palette.neutral.main,
					padding: '2.25rem',
					borderRadius: '1.25rem',
					marginTop: '1rem',
				}}
			>
				<DashboardForm formOptions={{}} formProps={{}}>
					<FormFields title={t('module_starboard.Settings.Forms.StarCount.Title')}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								rowGap: '.5rem',
								alignItems: 'flex-start',
							}}
						>
							<FormField
								name='star'
								label={t('module_starboard.Settings.Forms.StarCount.Label')}
							>
								<TextField
									type='number'
									sx={{ maxWidth: '319px', width: '100%' }}
								/>
							</FormField>
							<FormField
								label={t('module_starboard.Settings.Forms.StarCount.Ignore')}
								name='ignore-stars'
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
							<FormField
								label={t('module_starboard.Settings.Forms.StarCount.Automatic')}
								name='auto-star'
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
							<FormField
								label={t('form.Emojis.label')}
								name='auto-star'
								containerSx={{ mt: 2 }}
								inputSx={{ mb: 2 }}
								isPremium
							>
								<EmojiPickerInput showName close />
							</FormField>
						</Box>
					</FormFields>
				</DashboardForm>

			</Box>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
				<Box
					sx={{
						flexBasis: 'calc(50%-0.5rem)',
						flexGrow: 1,
						backgroundColor: theme.palette.neutral.main,
						padding: '2.25rem',
						borderRadius: '1.25rem',
						marginTop: '1rem',
					}}
				>
					<DashboardForm formOptions={{}} formProps={{}}>
						<FormFields title={t('module_starboard.Settings.Forms.StarCount.Title')} fontSize={24}>
							<FormField
								label={t('module_starboard.Settings.Forms.StarCount.Automatic')}
								name='auto-star'
								containerSx={{}}
								inputSx={{ mt: 0 }}
							>
								<ChannelSelectElement
									name='stared-channel'
									value=''
									placeholder={t('form.ChannelNotifications.placeholder')}
								/>
							</FormField>
						</FormFields>
					</DashboardForm>
				</Box>
				<Box
					sx={{
						flexBasis: 'calc(50%-0.5rem)',
						flexGrow: 1,
						backgroundColor: theme.palette.neutral.main,
						padding: '2.25rem',
						borderRadius: '1.25rem',
						marginTop: '1rem',
					}}
				>
					<DashboardForm formOptions={{}} formProps={{}}>
						<FormFields title={t('module_starboard.Settings.Forms.IgnoreChannels.Title')} fontSize={24}>
							<FormField
								label={t('module_starboard.Settings.Forms.IgnoreChannels.Label')}
								name='auto-star'
								containerSx={{}}
								inputSx={{ mt: 0 }}
							>
								<ChannelSelectElement
									name='ignored-channel'
									value=''
									multiple
									notGrouped
								/>
							</FormField>
						</FormFields>
					</DashboardForm>
				</Box>
				<Box
					sx={{
						flexBasis: 'calc(50%-0.5rem)',
						flexGrow: 1,
						backgroundColor: theme.palette.neutral.main,
						padding: '2.25rem',
						borderRadius: '1.25rem',
						marginTop: '1rem',
					}}
				>
					<DashboardForm formOptions={{}} formProps={{}}>
						<FormFields title={t('module_starboard.Settings.Forms.IgnoreRoles.Title')} fontSize={24}>
							<FormField
								label={t('module_starboard.Settings.Forms.IgnoreRoles.Label')}
								name='auto-star'
								containerSx={{}}
								inputSx={{ mt: 0 }}
							>
								<RoleSelectElement name='ignored-roles' value='' multiple />
							</FormField>
						</FormFields>
					</DashboardForm>
				</Box>
				<Box
					sx={{
						flexBasis: 'calc(50%-0.5rem)',
						flexGrow: 1,
						backgroundColor: theme.palette.neutral.main,
						padding: '2.25rem',
						borderRadius: '1.25rem',
						marginTop: '1rem',
					}}
				>
					<DashboardForm formOptions={{}} formProps={{}}>
						<FormFields title={t('module_starboard.Settings.Forms.Color.Title')} fontSize={24}>
							<FormField
								label={t('module_starboard.Settings.Forms.Color.Label')}
								name='auto-star'
								containerSx={{}}
								inputSx={{ mt: 0 }}
							>
								<ColorElement name='color-embed' />
							</FormField>
						</FormFields>
					</DashboardForm>
				</Box>
			</Box>
		</Box>
	);
}
