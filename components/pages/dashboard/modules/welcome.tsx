'use client';

import { PremiumBadge } from '#components/common/badge/premium';
import { ColorElement } from '#components/common/colorPicker/element';
import { DashboardForm } from '#components/common/dashboard/form';
import { DashboardSection } from '#components/common/dashboard/section';
import { DiscordMessagePreview } from '#components/common/discordMessage/preview';
import { ChannelSelectElement } from '#components/common/forms/elements/channelSelect';
import { ImageUpload } from '#components/common/forms/elements/imageUpload';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import { RichEditor } from '#components/common/richEditor';
import Tab from '#components/common/tabs';
import { TabPanel } from '#components/common/tabs/tabPanel';
import { useTabs } from '#components/contexts/tabContext';
import { Box, Checkbox, Divider, FormControlLabel, MenuItem, MenuList, Select, Tabs, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

export const WelcomeModule: React.FC = () => {
	const t = useTranslations('module_welcome');
	const { activeTab, setActiveTab } = useTabs();
	const sectionTitle = useMemo(() => {
		switch (activeTab) {
			case 0: {
				return t('WelcomeSimple');
			}

			case 1: {
				return t('WelcomeEmbed');
			}

			case 2: {
				return t('WelcomeMessageAndEmbed');
			}

			case 3: {
				return t('WelcomeImage');
			}

			default: {
				console.error('Unknown tab', activeTab);
				return '';
			}
		}
	}, [activeTab, t]);

	return (
		<Box>
			<Tabs value={activeTab} onChange={setActiveTab}>
				<Tab label={t('Message')} index={0} />
				<Tab label={t('Embed')} index={1} />
				<Tab label={t('MessagePlusEmbed')} index={2} />
				<Tab label={t('CustomImage')} icon={<PremiumBadge variant='icon' sx={{ marginLeft: '1ch' }} />} index={3} />
			</Tabs>
			<Box sx={{ marginTop: 4 }}>
				<DashboardSection title={sectionTitle} premium={activeTab === 3}>
					<>
						<DashboardForm
							formOptions={{ defaultValues: { content: '__apples__ and *oranges* ', 'text-color': '#f0f' } }}
							formProps={{
								method: 'post',
								action: '/api/modules/welcome',
								onSubmit(f) {
									// Api.welcome.update(guild?._id, f);
									console.log('Submitting', f);
								},
							}}
						>
							<TabPanel index={0} value={activeTab}>
								<MessageForm />
							</TabPanel>
							<TabPanel index={1} value={activeTab}>
								<EmbedForm />
							</TabPanel>
							<TabPanel index={2} value={activeTab}>
								<MessageWithEmbedForm />
							</TabPanel>
							<TabPanel index={3} value={activeTab}>
								<CustomImageForm />
							</TabPanel>
						</DashboardForm>
					</>
					<>
						<DiscordMessagePreview />
					</>
				</DashboardSection>
			</Box>
		</Box>
	);
};

const MessageForm: React.FC = () => {
	const t = useTranslations('module_welcome');
	const { register } = useFormContext();

	return (
		<FormFields>
			<FormField label={t('WelcomeChannel')} name='channel' options={{ required: true }} dontRegister>
				<ChannelSelectElement name='channel' value='' register={register('channel', { required: true })} />
			</FormField>
			<FormField label={t('MessageContent')} name='content' dontRegister>
				<RichEditor name='content' />
			</FormField>
			<FormControlLabel control={<Checkbox {...register('sendDm')} />} label={t('SendDM')} />
		</FormFields>
	);
};

const EmbedForm: React.FC = () => {
	const t = useTranslations('module_welcome');
	const { register } = useFormContext();

	return (
		<FormFields>
			<FormField label={t('WelcomeChannel')} name='channel' options={{ required: true }} dontRegister>
				<ChannelSelectElement name='channel' value='' register={register('channel', { required: true })} />
			</FormField>
			<FormField label={t('Color')} name='color'>
				<ColorElement name='color' />
			</FormField>
			<FormField label={t('Title')} name='title'>
				<TextField />
			</FormField>
			<FormField label={t('Description')} name='description'>
				<RichEditor name='description' />
			</FormField>
			<Divider />
			<FormField label={t('Author')} name='author'>
				<TextField />
			</FormField>
			<FormField label={t('AuthorIcon')} name='author-icon'>
				<ImageUpload name='author-icon' />
			</FormField>
			<FormField label={t('Image')} name='image'>
				<ImageUpload name='image' />
			</FormField>
			<FormField label={t('Thumbnail')} name='thumbnail'>
				<ImageUpload name='thumbnail' />
			</FormField>
			<Divider />
			<FormField label={t('Footer')} name='footer'>
				<TextField />
			</FormField>
			<FormField label={t('FooterIcon')} name='footer-icon'>
				<ImageUpload name='footer-icon' />
			</FormField>
			<Divider />
			<FormField label={t('Fields')} name='fields'>
				<div></div>
			</FormField>
			<FormControlLabel control={<Checkbox {...register('sendDm')} />} label={t('SendDM')} />
		</FormFields>
	);
};

const MessageWithEmbedForm: React.FC = () => {
	const t = useTranslations('module_welcome');
	const { register } = useFormContext();

	return (
		<FormFields>
			<FormField label={t('WelcomeChannel')} name='channel' options={{ required: true }} dontRegister>
				<ChannelSelectElement name='channel' value='' register={register('channel', { required: true })} />
			</FormField>
			<FormField label={t('MessageContent')} name='content'>
				<RichEditor name='content' />
			</FormField>
			<Divider />
			<FormField label={t('Color')} name='color'>
				<ColorElement name='color' />
			</FormField>
			<FormField label={t('Title')} name='title'>
				<TextField />
			</FormField>
			<FormField label={t('Description')} name='description'>
				<RichEditor name='description' />
			</FormField>
			<Divider />
			<FormField label={t('Author')} name='author'>
				<TextField />
			</FormField>
			<FormField label={t('AuthorIcon')} name='author-icon'>
				<ImageUpload name='author-icon' />
			</FormField>
			<FormField label={t('Image')} name='image'>
				<ImageUpload name='image' />
			</FormField>
			<FormField label={t('Thumbnail')} name='thumbnail'>
				<ImageUpload name='thumbnail' />
			</FormField>
			<Divider />
			<FormField label={t('Footer')} name='footer'>
				<TextField />
			</FormField>
			<FormField label={t('FooterIcon')} name='footer-icon'>
				<ImageUpload name='footer-icon' />
			</FormField>
			<Divider />
			<FormField label={t('Fields')} name='fields'>
				<div></div>
			</FormField>
			<FormControlLabel control={<Checkbox {...register('sendDm')} />} label={t('SendDM')} />
		</FormFields>
	);
};

const CustomImageForm: React.FC = () => {
	const t = useTranslations('module_welcome');
	const { register } = useFormContext();

	return (
		<FormFields>
			<FormField label={t('WelcomeChannel')} name='channel' options={{ required: true }} dontRegister>
				<ChannelSelectElement name='channel' value='' register={register('channel', { required: true })} />
			</FormField>
			<FormField label={t('Title')} name='title'>
				<TextField />
			</FormField>
			<FormField label={t('Description')} name='description'>
				<TextField />
			</FormField>
			<FormField label={t('Background Image')} name='background-image'>
				<ImageUpload name='background-image' />
			</FormField>
			<FormField label={t('FontFamily')} name='font-family'>
				<Select>
					<MenuList>
						<MenuItem>foo</MenuItem>
						<MenuItem>bar</MenuItem>
					</MenuList>
				</Select>
			</FormField>
			<FormField label={t('TextColor')} name='text-color'>
				<ColorElement name='text-color' />
			</FormField>
			<FormField label={t('BackgroundColor')} name='background-color'>
				<ColorElement name='background-color' />
			</FormField>
			<Divider />
			<DashboardSection title={t('AdvancedSettings')} subsection>
				<FormFields>
					<FormFields title={t('UserTextOptions')} dense>
						<FormField label={t('FontSize')} name='font-size'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
						<FormField label={t('TextAlignment')} name='text-alignment'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
						<FormField label={t('TextStyle')} name='text-style'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
						<FormField label={t('ShadowDepth')} name='shadow-depth'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
					</FormFields>
					<FormFields title={t('WelcomeTextOptions')} dense>
						<FormField label={t('FontSize')} name='font-size'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
						<FormField label={t('TextAlignment')} name='text-alignment'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
						<FormField label={t('TextStyle')} name='text-style'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
						<FormField label={t('ShadowDepth')} name='shadow-depth'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
					</FormFields>
					<FormFields title={t('AvatarOptions')} dense>
						<FormField label={t('Width')} name='width'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
						<FormField label={t('Height')} name='height'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
						<FormField label={t('ImageAlignment')} name='image-alignment'>
							<Select>
								<MenuList>
									<MenuItem>foo</MenuItem>
									<MenuItem>bar</MenuItem>
								</MenuList>
							</Select>
						</FormField>
					</FormFields>
				</FormFields>
			</DashboardSection>
			<FormControlLabel control={<Checkbox {...register('sendDm')} />} label={t('SendDM')} />
		</FormFields>
	);
};
