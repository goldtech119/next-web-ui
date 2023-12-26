import { type Embed, type GetAutoMessageDto } from '@dynogg/dyno-api';

import { useState } from 'react';
import { TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { type FormSubmitHandler } from 'react-hook-form';

import { DateTime } from '#components/common/DateTime/date-time';
import RowRadioGroup from '#components/common/RowRadioGroup/RowRadioGroup';
import { TextArea } from '#components/common/TextArea/text-area';
import { DashboardForm } from '#components/common/dashboard/form';
import { ChannelSelectElement } from '#components/common/forms/elements/channelSelect';
import { type ValueType } from '#components/common/forms/elements/roleSelect';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import { useChannels } from '#hooks/data/useChannels';

type CreateOrUpdateFormData = {
	name: string;
	channel: { channels: ValueType[] } | string;
	content: string;
	embed?: Embed;
	interval: string;
	postTime: string;
};

type AutomessageFormProps = {
	title: string;
	onSubmit: (_data: CreateOrUpdateFormData) => void;
	defaultValue: GetAutoMessageDto | undefined;
};
export function AutomessageForm({ title, onSubmit, defaultValue }: AutomessageFormProps) {
	const [isInterval, setIsInterval] = useState(() => Boolean(defaultValue?.interval));
	const [messageType, setMessageType] = useState<'embed' | 'plain'>(() => (defaultValue?.embed ? 'embed' : 'plain'));

	const { channels } = useChannels();
	const t = useTranslations('module_automessage');

	const handleOnSubmit = (formData: CreateOrUpdateFormData) => {
		onSubmit({ ...formData, interval: isInterval ? formData.interval : '0' });
	};

	// eslint-disable-next-line operator-linebreak
	const defaultValues =
		defaultValue === undefined
			? {
					name: '',
					channel: '',
					content: '',
					postTime: '',
					interval: 0,
					embed: undefined,
			  }
			: {
					name: defaultValue.name,
					channel: defaultValue.channel,
					interval: defaultValue.interval,
					postTime: defaultValue.nextPost,
					content: defaultValue.content,
					embed: defaultValue.embed,
			  };

	const defaultChannel = channels.find(c => c.id === defaultValue?.channel);

	return (
		<DashboardForm
			formOptions={{
				defaultValues,
			}}
			formProps={{
				onSubmit: form => handleOnSubmit(form.data as CreateOrUpdateFormData),
			}}
			buttonSx={{ width: '100%', minWidth: { md: '22rem' } }}
		>
			<FormFields title={title} fontSize={28} sx={{ maxWidth: '26rem', width: '100%' }}>
				<FormField label={t('Forms.Name.Label')} name="name">
					<TextField placeholder={t('Forms.Name.Placeholder')} sx={{ width: '100%' }} autoFocus />
				</FormField>
				<FormField label={t('Forms.Channel.Label')} name="channel">
					<ChannelSelectElement name="channel" value="" defaultValue={[defaultChannel!]} />
				</FormField>
				<FormField label={t('Forms.IntervalType.Label')} name="" dontRegister>
					<RowRadioGroup
						defaultValue={isInterval ? 'repeating' : 'once'}
						options={[
							{ label: 'Repeating', value: 'repeating' },
							{ label: 'One Time', value: 'once' },
						]}
						onChange={value => {
							setIsInterval(value === 'repeating');
						}}
					/>
				</FormField>
				{isInterval && (
					<FormField label={t('Forms.IntervalSelect.Label')} name="interval">
						<TextField sx={{ width: '100%' }} type="number" />
					</FormField>
				)}
				<FormField label={t('Forms.Date.Label')} name="" inputSx={{ width: '100%' }} dontRegister>
					<DateTime name="postTime" defaultValue={defaultValues.postTime} />
				</FormField>
				{/* TODO: embed field */}
				{/* <FormField label={t('Forms.MessageType.Label')} name="" dontRegister>
					<RowRadioGroup
						defaultValue={messageType}
						options={[
							{ label: 'Plain message', value: 'plain' },
							{ label: 'Embed', value: 'embed' },
						]}
						onChange={value => {
							setMessageType(value as typeof messageType);
						}}
					/>
				</FormField> */}
				<FormField label={t('Forms.MessageContent.Label')} name="content">
					<TextArea
						name="content"
						placeholder={t('Forms.MessageContent.Placeholder')}
						initialValue={defaultValues.content}
						max={500}
					/>
				</FormField>
			</FormFields>
		</DashboardForm>
	);
}
