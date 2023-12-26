'use client';

import { type CreateAutoMessageDto } from '@dynogg/dyno-api';

import { useCallback, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Button from '#components/common/button';
import { Modal, useModal } from '#components/common/modal';
import { AutomessageForm } from '#components/pages/automessages/automessage-form';
import { AutomessageItem } from '#components/pages/automessages/automessage-item';
import { useAutoMessage } from '#hooks/data/useAutomessage';
const actions = [
	{ action: 'all', label: 'All' },
	{ action: 'active', label: 'Active' },
	{ action: 'inactive', label: 'Inactive' },
	{ action: 'newest', label: 'Newest' },
	{ action: 'oldest', label: 'Oldest' },
];

export default function Automessage() {
	const [sortBy, setSortBy] = useState<'all' | 'active' | 'inactive' | 'newest' | 'oldest'>('all');
	const [formProps, setFormProps] = useState<{ id: string; type: 'update' } | { type: 'create'; id: undefined }>({
		type: 'create',
		id: undefined,
	});

	const { automessages, create, update } = useAutoMessage();

	const t = useTranslations();
	const modal = useModal({ renderOnLoad: false });

	const onNewMessage = useCallback(() => {
		setFormProps({ type: 'create', id: undefined });
		modal.open();
	}, []);

	const onEditMessage = useCallback((id: string) => {
		setFormProps({ type: 'update', id });
		modal.open();
	}, []);

	return (
		<Box
			sx={{
				backgroundColor: t => t.palette.neutral.main,
				padding: '3rem 0',
				minHeight: '1000px',
				borderRadius: '.75rem',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					justifyContent: 'flex-end',
					marginBottom: '2rem',
					paddingX: '2rem',
				}}
			>
				<Button sx={{ padding: '.5rem 2rem' }} onClick={onNewMessage}>
					{`+ ${t('module_automessage.NewAutoMessage')}`}
				</Button>
			</Box>
			<Divider />
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					rowGap: '1rem',
					marginBottom: '2rem',
					paddingX: '2rem',
					marginTop: '2rem',
				}}
			>
				<Typography color="neutral.lightest" fontSize={12} fontWeight={500}>
					{t('module_automessage.SortMessage')}
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						columnGap: '.75rem',
						width: '100%',
						overflowX: 'scroll',
						paddingBottom: '1rem',
					}}
				>
					{actions.map(action => (
						<Button
							key={action.action}
							buttonType={sortBy === action.action ? 'secondary' : 'primary'}
							onClick={() => setSortBy(action.action as typeof sortBy)}
							sx={{
								fontSize: '14px',
								px: '1.5rem',
								'&:hover': t => ({
									background: 'initial',
									boxShadow: `inset 0 0 0 2px ${t.palette.primary.dark}`,
								}),
							}}
						>
							{action.label}
						</Button>
					))}
				</Box>
			</Box>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingX: '2rem' }}>
				{automessages.map(automessage => (
					<AutomessageItem key={automessage._id} message={automessage} onEdit={onEditMessage} />
				))}
			</Box>
			<Modal modal={modal} title="" hideDivider>
				<AutomessageForm
					title={
						formProps.type === 'create'
							? t('module_automessage.NewAutoMessage')
							: t('module_automessage.EditAutoMessage')
					}
					defaultValue={formProps.type === 'create' ? undefined : automessages.find(msg => msg._id === formProps.id)}
					onSubmit={async ({ channel, name, interval, content, postTime, embed }) => {
						const formData: CreateAutoMessageDto = {
							name,
							channel: typeof channel === 'string' ? channel : channel.channels[0].id,
							interval: Number(interval),
							content,
							postTime,
							embed,
						};
						if (formProps.type === 'create') {
							await create(formData);
						} else {
							await update(formProps.id, formData);
						}

						modal.close();
					}}
				/>
			</Modal>
		</Box>
	);
}
