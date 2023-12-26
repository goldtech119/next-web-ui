'use client';
import {
	CustomThresholds,
	createDefaultThrehold,
} from '#components/common/CustomThresholds';
import { EmojiPickerInput } from '#components/common/EmojiPickerInput';

import { ChannelSelectElement } from '#components/common/forms/elements/channelSelect';
import Tab from '#components/common/tabs';
import { TabPanel } from '#components/common/tabs/tabPanel';
import { useTabs } from '#components/contexts/tabContext';
import { StarboardSettings } from '#components/pages/dashboard/modules/starboard-settings';
import {
	Tabs,
	TextField,
} from '@mui/material';
import { useTranslations } from 'next-intl';

export default function StarboardPage() {
	const t = useTranslations('module_starboard');
	const { activeTab, setActiveTab } = useTabs();

	return (
		<>
			<Tabs value={activeTab} onChange={setActiveTab}>
				<Tab label={t('Settings.TabTitle')} index={0} />
				<Tab label={t('Thresholds.TabTitle')} index={1} />
				<Tab label={t('SecretStarboards.TabTitle')} index={2} />
			</Tabs>
			<TabPanel index={0} value={activeTab}>
				<StarboardSettings />
			</TabPanel>
			<TabPanel index={1} value={activeTab}>
				<CustomThresholds
					title={t('Thresholds.Forms.CustomThreshold.Title')}
					label={t('Thresholds.Forms.CustomThreshold.Label')}
					defaultState={{ items: [createDefaultThrehold(0)]}}
					columnsConfig={[
						{
							label: 'Channel',
							name: 'channel',
							sx: { minWidth: '200px', mr: 4 },
							renderInput: threshold => (
								<ChannelSelectElement
									name={threshold.channelId as string}
									value=''
								/>
							),
						},
						{
							label: 'Threshold',
							name: 'threshold',
							sx: { minWidth: '115px' },
							renderInput: () => (
								<TextField
									type='number'
									sx={{ minWidth: '115px', height: '52px' }}
								/>
							),
						},
					]}
				/>
			</TabPanel>
			<TabPanel index={2} value={activeTab}>
				<CustomThresholds
					title={t('SecretStarboards.Forms.CustomThreshold.Title')}
					label={t('SecretStarboards.Forms.CustomThreshold.Label')}
					defaultState={{
						items: [
							{
								...createDefaultThrehold(0),
								emoji: '',
								followingChannelId: '',
							},
						],
					}}
					columnsConfig={[
						{
							label: 'Channel',
							name: 'channel',
							sx: { minWidth: '200px', mr: 4 },
							renderInput: threshold => (
								<ChannelSelectElement
									name={threshold.channelId as string}
									value=''
								/>
							),
						},
						{
							label: 'Channels Following',
							name: 'channel-following',
							sx: { width: '200px', mr: 4 },
							renderInput: (_, config) => (
								<ChannelSelectElement name={config?.name as string} value='' />
							),
						},
						{
							label: 'Emoji',
							name: 'emoji',
							renderInput: (_, config) => (
								<EmojiPickerInput name={config?.name as string} />
							),
						},
					]}
				/>
			</TabPanel>
		</>
	);
}

