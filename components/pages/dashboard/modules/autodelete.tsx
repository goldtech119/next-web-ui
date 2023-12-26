'use client';

import React, { useState, useMemo } from 'react';
import { Add, HighlightOff, Delete } from '@mui/icons-material';
import {
	Box,
	Button,
	MenuItem,
	Select,
	Typography,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import RowRadioGroup from '#components/common/RowRadioGroup/RowRadioGroup';
import { DashboardForm } from '#components/common/dashboard/form';
import { ModuleSidebar } from '#components/common/dashboard/moduleSidebar';
import { ModuleSection } from '#components/common/dashboard/section';
import { ChannelSelectElement } from '#components/common/forms/elements/channelSelect';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import { Modal, type UseModalHookReturn, useModal } from '#components/common/modal';
import { FilterSelectElement } from '#components/common/select/filterSelect';
import { useAutoDelete } from '#hooks/data/useAutoDelete';

export const AutoDeleteModule: React.FC = () => {
	const t = useTranslations('module_autodelete');
	const { module, createAutoDelete, deleteAutoDeleteConfig } = useAutoDelete();
	const params = useParams();
	const modal = useModal({
		renderOnLoad: false,
	});

	const [filters, setFilters] = useState<any[]>([{
		name: 'Links',
		value: 'links',
	}]);
	const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

	const defaultValues = useMemo(
		() => ({
			id: '',
			channel: {
				id: '',
				name: '',
			},
			filters: [],
			match: 'all',
			delay: 10,
		}),
		[],
	);

	const handleAddFilter = () => {
		const newFilter = { id: Math.random().toString(36).substring(2) };
		setFilters([...filters, newFilter]);
	};

	const handleChangeFilter = (id: string, filter: any) => {
		setFilters(prevFilters => prevFilters.map(f => (f.id === id ? { ...f, filter } : f)));
	};

	const handleRemoveFilter = (id: string) => {
		setFilters(prevFilters => [...prevFilters.filter(f => f.id !== id)]);
	};

	const handleSubmitModule = (values: any) => {
		createAutoDelete(params.guildId as string, values);
	};

	return (
		<Box>
			<ModuleSection>
				
				<ModuleSidebar
					action={{
						title: t('NewAutoDelete'),
						Icon: Add,
						action: () => ({}),
					}}
				>
					<Box sx={{minHeight: 700}}>
						{module?.configs.map(channel => (
							<ChannelItem
								key={channel.id}
								name={channel.name}
								filters={channel.filters}
								onDelete={() => {
									modal.open();
									setSelectedChannel(channel.id);
								}}
							/>
						))}
					</Box>
				</ModuleSidebar>
				<Box sx={{maxWidth: "460px"}}>
					<DashboardForm
						formOptions={{ defaultValues }}
						formProps={{
							onSubmit(f) {
								const payload = {
									id: f.data.channel.channels[0].id,
									name: f.data.channel.channels[0].name,
									delay: f.data.delay,
									filters: filters.map(f => ({ name: f.filter.name, text: f.filter.value })),
								};

								handleSubmitModule(payload);
							},
						}}
					>
						<Typography sx={{ fontSize: 24, color: 'neutral.lightest' }}>{t('NewAutoDelete')}</Typography>
						<FormFields>
							<Box sx={{ mt: 4 }}>
								<FormField label={'Channel'} name="channel">
									<ChannelSelectElement name={'channel'} defaultValue={[defaultValues.channel]} value="" placeholder="Select a Channel" />
								</FormField>
							</Box>
							<Box
								sx={{
									mt: 4,
									p: 3,
									background: 'rgba(35, 38, 39, .5)',
									borderRadius: 2,
								}}
							>
								<Typography sx={{ color: 'neutral.lightest', fontSize: 12 }}>{t('AddFilter')}</Typography>
								{filters.map(filter => (
									<FilterItem
										key={filter.id}
										filter={filter}
										onChange={handleChangeFilter}
										onDelete={() => handleRemoveFilter(filter.id)}
									/>
								))}
							</Box>
							<Box sx={{ mt: 0 }}>
								<Button
									sx={{
										px: 1,
										py: 0.5,
										borderRadius: 2.5,
										justifyContent: 'center',
										alignItems: 'center',
										gap: 0.25,
										color: 'neutral.main',
										background: t => t.palette.neutral.lightest,
									}}
									onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleAddFilter()}
								>
									<Add />
									<Typography sx={{ fontSize: 12 }}>{t('AddFilter')}</Typography>
								</Button>
							</Box>
							<Box sx={{ mt: 4 }}>
								<FormField name="match" label={t('MatchFilterOption')}>
									<RowRadioGroup
										isColumn={true}
										options={[
											{
												label: t('DeleteAllFilterMatch'),
												value: 'all',
											},
											{
												label: t('DeleteAnyFilterMatch'),
												value: 'any',
											},
										]}
										name="match"
										defaultValue={'all'}
									/>
								</FormField>
							</Box>
							<Box sx={{ mt: 4 }}>
								<FormField name="delay" label={t('Delay')}>
									<Select defaultValue={10}>
										<MenuItem value={10}>10 {t('Seconds')}</MenuItem>
										<MenuItem value={20}>20 {t('Seconds')}</MenuItem>
										<MenuItem value={30}>30 {t('Seconds')}</MenuItem>
									</Select>
								</FormField>
							</Box>
						</FormFields>
					</DashboardForm>
				</Box>
			</ModuleSection>
			<DeleteConfirmModal
				modal={modal}
				onClickYes={() => {
					if (selectedChannel) {
						deleteAutoDeleteConfig(params.guildId as string, selectedChannel).finally(() => modal.close());
					}
				}}
			/>
		</Box>
	);
};

type ChannelItemProps = {
	name: string;
	filters?: any[];
	onDelete?: () => void;
};

const ChannelItem: React.FC<ChannelItemProps> = ({ name, filters = [''], onDelete }: ChannelItemProps) => {
	const t = useTranslations();
	return (
		<Box
			sx={{
				position: 'relative',
				margin: 2,
				p: 2.5,
				borderRadius: 4,
				border: t => `2px solid ${t.palette.neutral.darker}`,
			}}
		>
			<Typography
				sx={{
					fontSize: 12,
					color: 'primary.light',
					mb: 1.5,
				}}
			>
				#{name}
			</Typography>
			<Box>
				<Box sx={{ display: 'flex', gap: 0.5 }}>
					<Typography sx={{ fontSize: 12 }}>{t('module_autodelete.Filters')}:</Typography>
					<Box>
						{filters.map((filter, index) => (
							<Typography
								key={index}
								sx={{
									fontSize: 12,
									color: 'neutral.lightest',
								}}
							>
								{filter?.name}
							</Typography>
						))}
					</Box>
				</Box>
			</Box>
			<Delete
				onClick={onDelete}
				sx={{
					position: 'absolute',
					top: 14,
					right: 14,
					width: 20,
					height: 20,
					color: t => t.palette.neutral.dark,
					cursor: 'pointer',
				}}
			/>
		</Box>
	);
};

type FilterItemProps = {
	filter: any;
	onDelete: () => void;
	onChange: (id: string, filter: any) => void;
};

const FilterItem: React.FC<FilterItemProps> = ({ filter, onDelete, onChange }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: 2.5,
			}}
		>
			<FilterSelectElement
				name={'filter'}
				value={filter.id}
				onChange={val => onChange(filter.id, val)}
				placeholder={'Select type of filter'}
				sx={{ width: '100%', my: 2 }}
			/>
			<HighlightOff
				onClick={onDelete}
				sx={{
					width: 24,
					height: 24,
					color: 'error.main',
					cursor: 'pointer',
				}}
			/>
		</Box>
	);
};

type DeleteConfirmModalProps = {
	modal: UseModalHookReturn;
	onClickYes: () => void;
	name?: string;
};

const DeleteConfirmModal = ({ modal, onClickYes, name }: DeleteConfirmModalProps) => {
	const t = useTranslations();
	return (
		<Modal modal={modal} title={t('commons.Confirm')}>
			<Typography component="p">{t('module_autodelete.ConfirmDeleteConfig')}</Typography>

			<Button
				onClick={onClickYes}
				fullWidth
				sx={{
					marginTop: '16px',
				}}
			>
				{t('commons.Yes')}
			</Button>
		</Modal>
	);
};
