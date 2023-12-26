'use client';

// Import Button from '#components/common/button';
import { useUpdates } from '#hooks/data/useUpdates';
import { GetUpdateDto } from '@dynogg/dyno-api';
import { Box, Button, Chip, Divider, Typography, darken } from '@mui/material';
import { bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Widget } from '../widget';
import { UpdateDetailsModal } from './modal';

export const UpdatesWidget: React.FC = () => {
	const t = useTranslations();
	const { updates } = useUpdates();

	return (
		<Widget title={t('dashboard.updates')}>
			{updates.map((u, idx) => (
				<UpdateItem key={u._id} update={u} showDivider={idx < updates.length - 1} />
			))}
		</Widget>
	);
};

type UpdateItemProps = {
	showDivider: boolean;
	update: GetUpdateDto;
};

const UpdateItem: React.FC<UpdateItemProps> = ({ showDivider, update }) => {
	const { createdAt, title, preview } = update;
	const tag = undefined;
	const t = useTranslations();
	const modalState = usePopupState({ variant: 'popover' });

	return (
		<>
			<Box
				sx={{
					paddingX: '32px',
					paddingY: '20px',
				}}
			>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'max-content max-content',
						gap: '18px',
						alignItems: 'center',
					}}
				>
					<Typography fontSize={14} color='neutral.dark'>
						{new Date(createdAt).toDateString()}
					</Typography>
					{tag && <Chip label={tag} sx={{
						background: darken(tagToColorMap[tag], 0.43),
						'& .MuiChip-label': {
							color: tagToColorMap[tag],
						},
					}} />}
				</Box>
				<Typography fontSize={18} fontWeight={600} color='neutral.lightest' marginTop='8px'>
					{title}
				</Typography>
				<Typography fontWeight={500} color='neutral.dark' marginTop='8px' overflow='hidden' textOverflow='ellipsis'>
					{preview}
				</Typography>
				<Button {...bindTrigger(modalState)} variant='text' sx={{ marginLeft: 'auto', display: 'flex' }}>
					{t('commons.seeMore')}
				</Button>
			</Box>
			<UpdateDetailsModal modalState={modalState} update={update} />
			{showDivider && <Divider />}
		</>
	);
};

export const tagToColorMap: Record<string, string> = {
	featured: '#9e74f4',
};
