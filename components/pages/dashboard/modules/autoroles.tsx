'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormSubmitHandler } from 'react-hook-form'
import { useParams } from 'next/navigation'

import {useTheme} from '@mui/material'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import AddOutlined from '@mui/icons-material/AddOutlined';
import TypoGraphy from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

// Dyno API
import { Role } from '@dynogg/eris';
import { CreateAutoRoleDto, CreateRankDto, GetAutoRoleDto, GetRankDto, UpdateAutoRoleDto, UpdateRankDto } from '@dynogg/dyno-api';

// Custom Components
import Tab from '#components/common/tabs';
import Button from '#components/common/button';
import { useAutoRoles } from '#hooks/data/useAutoRoles';
import { useRoles } from '#hooks/data/useRoles';
import { RowConfig, Table } from '#components/common/Table';
import { TabPanel } from '#components/common/tabs/tabPanel';
import { Modal, useModal, UseModalHookReturn } from '#components/common/modal';
import { RoleSelectElement } from '#components/common/forms/elements/roleSelect';
import { FormFields } from '#components/common/forms/formFields';
import { FormField } from '#components/common/forms/formField';
import { DashboardForm } from '#components/common/dashboard/form';
import RowRadioGroup from '#components/common/RowRadioGroup/RowRadioGroup';
import { DashboardSection } from '#components/common/dashboard/section';

type AutoRolesModuleProps = {
  showPagination?: boolean;
};

export const AutoRolesModule: React.FC<AutoRolesModuleProps> = ({
	showPagination,
}) => {
	const params = useParams();
	const t = useTranslations('module_autoroles');
	const { autoRoles, ranks, updateRole, deleteRole, createRole,  updateRank, createRank, deleteRank } = useAutoRoles();
	const { roles } = useRoles();
	const roleModal = useModal({ renderOnLoad : false });
	const rankModal = useModal({ renderOnLoad : false });
	const delModal = useModal({ renderOnLoad: false });
	const theme = useTheme();

	const [activeTab, setActiveTab] = useState(0);
	const [autoRolesRows, setAutoRolesRows] = useState<RowConfig[]>([]);
	const [ranksRows, setRanksRows] = useState<RowConfig[]>([]);
	const [selectedRole, setSelectedRole] = useState<GetAutoRoleDto | null>(null);
	const [selectedRank, setSelectedRank] = useState<GetRankDto | null>(null);

	const autoRolesHeaders = ['#', t('Role'), t('Type'), t('Delay')];
	const ranksHeaders = ['#', t('Rank')];

	const handleChange = (e: React.SyntheticEvent, value: number) => {
		setActiveTab(value);
	};

	const onHandleEditRole = (item: GetAutoRoleDto) => {
		setSelectedRole(item);
		roleModal.open();
	};

	const onHandleDeleteRole = (item: GetAutoRoleDto) => {
		setSelectedRole(item)
		delModal.open();
	};

	const onHandleDeleteRank = (item: GetRankDto) => {
		setSelectedRank(item);
		delModal.open();
	};

	const onConfirmDelete = () => {
		if (activeTab === 1 && selectedRank) {
			deleteRank(params?.guildId as string, selectedRank.id).finally(() => setSelectedRank(null));
		} else if (activeTab === 0 && selectedRole) {
			deleteRole(params?.guildId as string, selectedRole.role).finally(() => setSelectedRole(null));
		}

		delModal.close();
	}

	useEffect(() => {
		setAutoRolesRows(
			autoRoles.map((item, idx) => ({
				id: `${idx}_${item.role}`,
				options: [
					{
						headerName: '#',
						value: idx + 1,
					},
					{
						headerName: 'role',
						value: roles.find(roleItem => roleItem.id === item.role)?.name || t('Deleted'),
						cellProps: {
							sx: {
								color: theme.palette.primary.main,
							}
						}
					},
					{
						headerName: 'type',
						value: item.type,
						cellProps: {
							sx: {
								color: item.type === 'add' ? theme.palette.success.main : theme.palette.error.main
							}
						}
					},
					{
						headerName: 'delay',
						value: item?.wait ?? '',
					},
				],
				onEdit: () => onHandleEditRole(item),
				onDelete: () => onHandleDeleteRole(item),
			})),
		);
	}, [autoRoles, roles]);

	useEffect(() => {
		setRanksRows(
			ranks.map((item, idx) => ({
				id: `${idx}_${item.id}`,
				options: [
					{
						headerName: '#',
						value: idx + 1,
					},
					{
						headerName: 'rank',
						value: item.name,
					},
				],
				onDelete: () => onHandleDeleteRank(item),
			})),
		);
	}, [ranks]);

	const handleOpenModal = () => {
		if (activeTab === 0) {
			setSelectedRole(null)
			roleModal.open()
		} else {
			setSelectedRank(null)
			rankModal.open()
		}
	}

	const handleSubmitRole = (values: any) => {
		if (values && selectedRole && selectedRole?.role) {
			updateRole(params?.guildId as string, selectedRole?.role, {
				wait: Number(values?.wait),
				type: values?.type
			})
		} else {
			createRole(params?.guildId as string, {
				role: values?.role?.roles.id,
				wait: Number(values.wait),
				type: values.type
			})
		}

		roleModal.close();
	}

	const handleSubmitRank = (values: any) => {
		if (values && selectedRank && selectedRank.id) {
			updateRank(params?.guildId as string, selectedRank?.id , {
				name: values.role.roles?.name as string,
			});
		} else {
			createRank(params?.guildId as string, {
				id: values.role.roles?.id as string, 
				name: values.role.roles?.name as string,
			})
		}

		rankModal.close();
	}

	return (
		<DashboardSection title={t('SelectList')} vertical>
			<Box display={'flex'} justifyContent={'space-between'} mb={'53px'}>
				<TabsWrapper value={activeTab} onChange={handleChange}>
					<Tab index={0} label={t('AutoRoles')} />
					<Tab index={1} label={t('JoinableRanks')} />
				</TabsWrapper>

				<Button startIcon={<AddOutlined />}  onClick={handleOpenModal} buttonType='primary'>
					{activeTab === 0 ?  t('AddNewRole') : t('AddNewRank')}
				</Button>
			</Box>

			<Box>
				<TabPanel index={0} value={activeTab}>
					<Table
						headers={autoRolesHeaders}
						enableActions={true}
						rows={autoRolesRows}
					/>
				</TabPanel>
				<TabPanel index={1} value={activeTab}>
					<Table
						headers={ranksHeaders}
						enableActions={true}
						rows={ranksRows}
					/>
				</TabPanel>
			</Box>

			{/* New Role Modal */}
			<RoleFormModal modal={roleModal} onSubmit={handleSubmitRole} defaultItem={selectedRole ? {
				role: selectedRole ? {
					id: selectedRole?.role,
					name: roles.find(roleItem => roleItem.id === selectedRole?.role)?.name ?? t('Deleted')
				} : undefined,
				wait: selectedRole?.wait,
				type: selectedRole?.type
			} : undefined} type={selectedRole ? 'edit' : 'new'} />
			
			{/* New Rank Modal */}
			<RankFormModal modal={rankModal} onSubmit={handleSubmitRank} />

			{/* Delete Confirm Modal  */}
			<DeleteConfirmModal modal={delModal} onClickYes={onConfirmDelete} name={activeTab === 0 ? roles.find(item => item.id === selectedRole?.role)?.name as string : selectedRank?.name} />
		</DashboardSection>
	);
};


type RoleFormModalProps = {
	modal: UseModalHookReturn,
	onSubmit: (data: UpdateAutoRoleDto | CreateAutoRoleDto) => void;
	type: 'edit' | 'new',
	defaultItem?: {
		role?: {
			id: string,
			name: string,
		},
		wait?: number;
		type: GetAutoRoleDto.type;
	}
}

const RoleFormModal = ({ modal, onSubmit, type, defaultItem }: RoleFormModalProps) => {
	const t = useTranslations('module_autoroles');
	const handleOnSubmit: FormSubmitHandler<
		UpdateAutoRoleDto | CreateAutoRoleDto
	> = formData => {
		onSubmit(formData.data);
	};
	return (
		<Modal 
			modal={modal} 
			title={''}
			hideDivider
		>
			<DashboardForm 
				formOptions={{
					defaultValues: {
						...defaultItem
					}
				}}
				formProps={{
					onSubmit: handleOnSubmit
				}}
			>
				<FormFields title={type === 'edit' ? t('EditRole') : t('NewRole')} fontSize={28}>
					<Box sx={{
						marginBottom: '16px',
					}}>
						<TypoGraphy>
							{t('NewRoleDesc')}
						</TypoGraphy>
					</Box>
					<FormField label={t('SelectRole')} name='role'>
						<RoleSelectElement name='role' defaultValue={defaultItem?.role ? [defaultItem?.role] : []} value="" />
					</FormField>
					<FormField label={t('DelayLabel')} name='wait'>
						<Input placeholder={`0 ${t('Minutes')}`} type='number' />
					</FormField>
					<FormField name='type' label={t('Type')}>
						<RowRadioGroup options={[{
							label: t('AddRole'),
							value: 'add'
						}, {
							label: t('RemoveRole'),
							value: 'remove'
						}]} defaultValue={defaultItem?.type ?? 'add'} />
					</FormField>
				</FormFields>
			</DashboardForm>
		</Modal>
	)
}

type RankModalProps = {
	modal: UseModalHookReturn,
	onSubmit: (data: UpdateRankDto | CreateRankDto) => void;
}

const RankFormModal = ({ modal, onSubmit }: RankModalProps) => {
	const t = useTranslations('module_autoroles');
	const handleOnSubmit: FormSubmitHandler<
		UpdateRankDto | CreateRankDto
	> = formData => {
		onSubmit(formData.data);
	};
	return (
		<Modal 
			modal={modal} 
			title={''}
			hideDivider
		>
			<DashboardForm 
				formOptions={{
					defaultValues: {}
				}}
				formProps={{
					onSubmit: handleOnSubmit
				}}
			>
					<FormFields title={t('NewRankRole')} fontSize={28}>
						<Box sx={{
							marginBottom: '16px',
						}}>
							<TypoGraphy>
								{t('NewRankRoleDesc')}
							</TypoGraphy>
						</Box>

						<FormField label={t('SelectRole')} name='role'>
							<RoleSelectElement name='role' value='' />
						</FormField>
						
						<Box sx={{
							display: 'flex',
							flexDirection: 'column'
						}}>
							<FormControlLabel value='limit_users' control={<Checkbox />} label={t('LimitUsers')} />
							<FormControlLabel value='delete_command' control={<Checkbox />} label={t('DeleteCommand')} />
							<FormControlLabel value='auto_delete' control={<Checkbox />} label={t('AutoDelete')} />
						</Box>
					</FormFields>
				</DashboardForm>
		</Modal>
	)
}


type DeleteConfirmModalProps = {
	modal: UseModalHookReturn;
	onClickYes: () => void;
	name?: string
}

const DeleteConfirmModal = ({modal, onClickYes, name}: DeleteConfirmModalProps) => {
	const t = useTranslations()
	return (
		<Modal
			modal={modal}
			title={t('commons.Confirm')}
		>
			<TypoGraphy component="p">
				{t('module_autoroles.DeleteConfirmRole')} : {name}
			</TypoGraphy>

			<Button onClick={onClickYes} fullWidth sx={{
				marginTop: '16px'
			}}>
				{t('commons.Yes')}
			</Button>
		</Modal>
	)
}


type RoleItemProps = {
  role: Role | undefined;
};

const RoleItem: React.FC<RoleItemProps> = ({ role }) => {
	const t = useTranslations('module_autoroles');

	return <Box>{role ? role.name : t('Deleted')}</Box>;
};

const SectionTitle = styled(Box)(({ theme }) => ({
	color: 'white',
	marginBottom: '16px',
}));

const TabsWrapper = styled(Tabs)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',

	columnGap: '14px',
}));
