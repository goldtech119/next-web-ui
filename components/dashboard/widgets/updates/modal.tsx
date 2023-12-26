import { hexToRgba } from '#helpers/colorHelper';
import { GetUpdateDto } from '@dynogg/dyno-api';
import { Close } from '@mui/icons-material';
import { Box, Chip, Dialog, DialogContent, DialogTitle, IconButton, Typography, darken } from '@mui/material';
import { PopupState, bindPopover } from 'material-ui-popup-state/hooks';
import { useTranslations } from 'next-intl';
import React from 'react';
import Markdown from 'react-markdown';
import { tagToColorMap } from './widget';

export type UpdateDetailsModalProps = {
	modalState: PopupState;
	update: GetUpdateDto;
};

export const UpdateDetailsModal: React.FC<UpdateDetailsModalProps> = ({ modalState, update }) => {
	const t = useTranslations();
	const { createdAt, content, title } = update;
	const tag = undefined;
	const author = undefined;

	return (
		<Dialog {...bindPopover(modalState)}>
			<IconButton
				onClick={modalState.close}
				sx={{
					position: 'absolute',
					top: '24px',
					right: '24px',
					zIndex: t => t.zIndex.fab,
				}}
			>
				<Close />
			</IconButton>
			<DialogTitle
				sx={{
					textTransform: 'none',
					fontSize: 40,
					fontWeight: 600,
					color: t => t.palette.neutral.lightest,
					paddingRight: '60px',
					lineHeight: 1.125,
					background: 'url("/updates/banner_default.png")',
					minHeight: '300px',
					display: 'grid',
					alignItems: 'center',
					position: 'relative',
					'&::before': {
						content: '""',
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						height: '100px',
						background: t => `linear-gradient(180deg, transparent -10%, ${hexToRgba(t.palette.neutral.main)} 90%)`,
					},
				}}
			>
				{update.title}
			</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'max-content max-content',
						alignItems: 'center',
						gap: '16px',
					}}
				>
					{tag && <Chip label={tag} sx={{
						background: darken(tagToColorMap[tag], 0.43),
						'& .MuiChip-label': {
							color: tagToColorMap[tag],
						},
					}} />}
					<Typography fontSize={14} fontWeight={400} color='neutral.light'>
						{new Date(createdAt).toLocaleDateString()} {t('commons.by')} {author ?? 'The Dyno Team'}
					</Typography>
				</Box>
				<Box sx={{ color: t => t.palette.neutral.lightest }}>
					<Markdown>{content}</Markdown>
				</Box>
			</DialogContent>
		</Dialog>
	);
};
