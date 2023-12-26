/* eslint-disable no-mixed-spaces-and-tabs */
'use client';

import RowRadioGroup from '#components/common/RowRadioGroup/RowRadioGroup';
import { Table, TableProps } from '#components/common/Table';
import Button from '#components/common/button';
import { DashboardForm } from '#components/common/dashboard/form';
import { ChannelSelectElement } from '#components/common/forms/elements/channelSelect';
import { RoleSelectElement } from '#components/common/forms/elements/roleSelect';
import { FormField } from '#components/common/forms/formField';
import { FormFields } from '#components/common/forms/formFields';
import { Modal, useModal } from '#components/common/modal';
import { RichEditor } from '#components/common/richEditor';
import { useAutoResponder } from '#hooks/data/useAutoResponder';
import {
	CreateAutoResponderDto,
	GetAutoResponderDto,
	UpdateAutoResponderDto,
} from '@dynogg/dyno-api';
import { Box, Checkbox, TextField, Typography, useTheme } from '@mui/material';
import { IbmPlexMonoFont } from 'misc/fonts';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { FormSubmitHandler } from 'react-hook-form';

const actions = [
	{ action: 'desc', label: 'Newest' },
	{ action: 'asc', label: 'Older' },
	{ action: 'alphabet', label: 'Alphabet' },
];

export default function AutoResponderPage() {
	const [order, setOrder] = useState<'asc' | 'desc' | 'alphabet'>('desc');
	const [formProps, setFormProps] = useState<
    { id: string; type: 'update' } | { type: 'create'; id: null }
  >({ type: 'create', id: null });

	const theme = useTheme();
	const t = useTranslations();
	const modal = useModal({ renderOnLoad: false });

	const { messages, remove, update, create } = useAutoResponder();

	const orderedMessages = useMemo(
		() => [...messages].sort(orderRows(order)),
		[messages, order],
	);

	const onEditRow = useCallback(
		(id: string) => {
			setFormProps({ type: 'update', id });
			modal.open();
		},
		[modal],
	);

	const onNewResponse = useCallback(() => {
		setFormProps({ type: 'create', id: null });
		modal.open();
	}, [modal]);

	const defaultValue = useMemo(() => {
		if (formProps.id === null) {
			return null;
		}

		return messages.find(
			msg => msg.id === formProps.id!,
		) as GetAutoResponderDto;
	}, [formProps.id, messages]);

	const rows: TableProps['rows'] = useMemo(
		() =>
			orderedMessages.map((message, index) => ({
				id: message.id,
				async onDelete(id) {
					await remove(id);
				},
				onEdit(id) {
					onEditRow(id);
				},
				options: [
					{
						headerName: '#',
						value: index,
						cellProps: {
							sx: {
								width: '2rem',
								color: theme.palette.neutral.lightest,
								fontWeight: 600,
								fontFamily: IbmPlexMonoFont.style.fontFamily,
							},
						},
					},
					{
						headerName: t('commons.Trigger'),
						value: message.command,
						cellProps: {
							sx: { color: theme.palette.primary.main, fontWeight: 500 },
						},
					},
					{
						headerName: t('commons.Response'),
						value: message.response!,
						cellProps: {
							sx: { color: theme.palette.secondary.main, fontWeight: 500 },
						},
					},
				],
			})),
		[orderedMessages, remove, theme, onEditRow, t],
	);

	return (
		<Box
			sx={{
				backgroundColor: t => t.palette.neutral.main,
				padding: '3rem 2rem',
				minHeight: '1000px',
				borderRadius: '.75rem',
			}}
		>
			<Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginBottom: '2rem' }}>
				<Button sx={{ padding: '.5rem 2rem' }} onClick={onNewResponse}>
					{`+ ${t('module_autoresponder.NewResponse')}`}
				</Button>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					rowGap: '1rem',
					marginBottom: '2rem',
				}}
			>
				<Typography color='neutral.lightest' fontSize={12} fontWeight={500}>
					{t('module_autoresponder.SortTrigger')}
				</Typography>
				<Box
					sx={{ display: 'flex', alignItems: 'center', columnGap: '.75rem' }}
				>
					{actions.map(action => (
						<Button
							key={action.action}
							buttonType={order === action.action ? 'secondary' : 'primary'}
							onClick={() => setOrder(action.action as typeof order)}
							sx={{
								fontSize: '14px',
								px: '1.5rem',
								'&:hover': t => ({ background: 'initial', boxShadow: `inset 0 0 0 2px ${t.palette.primary.dark}` }),
							}}
						>
							{action.label}
						</Button>
					))}
				</Box>
			</Box>
			<Table
				headers={['#', t('commons.Trigger'), t('commons.Response')]}
				rows={rows}
				tHeadCellProps={{ sx: { paddingTop: '1.25rem' } }}
			/>
			<Modal title={''} modal={modal} hideDivider>
				<AutoresponseForm
					title={
						formProps.type === 'create'
							? t('module_autoresponder.NewResponse')
							: t('module_autoresponder.EditResponse')
					}
					onSubmit={async (
						data: UpdateAutoResponderDto | CreateAutoResponderDto,
					) => {
						if (formProps.type === 'update') {
							await update(formProps.id, data as UpdateAutoResponderDto);
						} else {
							await create(data as CreateAutoResponderDto);
						}

						modal.close();
					}}
					defaultValue={defaultValue}
				/>
			</Modal>
		</Box>
	);
}

function AutoresponseForm({
	title,
	onSubmit,
	defaultValue,
}: {
  title: string;
  onSubmit: (_data: UpdateAutoResponderDto | CreateAutoResponderDto) => void;
  defaultValue: GetAutoResponderDto | null;
}) {
	const t = useTranslations();
	const handleOnSubmit: FormSubmitHandler<
    UpdateAutoResponderDto | CreateAutoResponderDto
  > = formData => {
  	onSubmit(formData.data);
  };

	const defaultValues
    = defaultValue === null
    	? {
    		command: '',
    		type: '',
    		response: '',
    		ignoredChannels: {
    			channels: [],
    		},
    		allowedChannels: {
    			channels: [],
    		},
    		ignoredRoles: {
    			roles: [],
    		},
    		allowedRoles: {
    			roles: [],
    		},
    	}
    	: {
    		command: defaultValue.command,
    		type: defaultValue.type,
    		response: defaultValue.response,
    		ignoredChannels: {
    			channels: defaultValue.ignoredChannels?.channels ?? [],
    		},
    		allowedChannels: {
    			channels: defaultValue.allowedChannels?.channels ?? [],
    		},
    		ignoredRoles: {
    			roles: defaultValue.ignoredRoles?.roles ?? [],
    		},
    		allowedRoles: {
    			roles: defaultValue.allowedRoles?.roles ?? [],
    		},
    	};

	return (
		<DashboardForm
			formOptions={{
				defaultValues,
			}}
			formProps={{
				onSubmit: handleOnSubmit,
			}}
			buttonSx={{ width: '100%' }}
		>
			<FormFields title={title} fontSize={28}>
				<FormField
					label={t('module_autoresponder.Forms.Trigger.Label')}
					name='command'
				>
					<TextField
						placeholder={t('module_autoresponder.Forms.Trigger.Placeholder')}
						sx={{ width: '100%' }}
						autoFocus
					/>
				</FormField>
				<FormField
					label={t('module_autoresponder.Forms.ResponseType.Label')}
					name='type'
				>
					<RowRadioGroup
						defaultValue={defaultValues.type}
						options={[
							{ label: 'Message', value: 'message' },
							{ label: 'Embed', value: 'embed' },
							{ label: 'Reaction', value: 'reaction' },
						]}
					/>
				</FormField>
				<FormField
					label={t('module_autoresponder.Forms.Response.Label')}
					name='response'
					dontRegister
				>
					<RichEditor name='response' />
				</FormField>
				<FormField
					label={t('form.AllowedChannels.label')}
					name='allowedChannels'
				>
					<ChannelSelectElement
						name='allowedChannels'
						value=''
						multiple
						defaultValue={defaultValues.allowedChannels.channels}
					/>
				</FormField>
				<FormField
					label={t('form.IgnoredChannels.label')}
					name='ignoredChannels'
				>
					<ChannelSelectElement
						name='ignoredChannels'
						value=''
						multiple
						defaultValue={defaultValues.ignoredChannels.channels}
					/>
				</FormField>
				<FormField label={t('form.AllowedRoles.label')} name='allowedRoles'>
					<RoleSelectElement
						name='allowedRoles'
						value=''
						multiple
						defaultValue={defaultValues.allowedRoles.roles}
					/>
				</FormField>
				<FormField label={t('form.IgnoredRoles.label')} name='ignoredRoles'>
					<RoleSelectElement
						name='ignoredRoles'
						value=''
						multiple
						defaultValue={defaultValues.ignoredRoles.roles}
					/>
				</FormField>
				<FormField
					label={t('module_autoresponder.Forms.Wildcard.Label')}
					name='wildcard'
					containerSx={{
						display: 'flex',
						flexDirection: 'row-reverse',
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}
					labelSx={{ margin: 0 }}
				>
					<Checkbox sx={{ padding: 0, mr: 1 }} />
				</FormField>
			</FormFields>
		</DashboardForm>
	);
}

function orderRows(order: 'asc' | 'desc' | 'alphabet') {
	return (
		a: GetAutoResponderDto & { createdAt?: string },
		b: GetAutoResponderDto & { createdAt?: string },
	) => {
		const [unixA, unixB] = [
			new Date(a.createdAt!).getTime(),
			new Date(b.createdAt!).getTime(),
		];

		if (order === 'asc') {
			return unixA - unixB;
		}

		if (order === 'desc') {
			return unixB - unixA;
		}

		if (order === 'alphabet') {
			return a.command.localeCompare(b.command);
		}

		return 0;
	};
}
