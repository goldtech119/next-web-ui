import { type GetAutoMessageDto } from '@dynogg/dyno-api';

import { CalendarMonth, Delete, Edit } from '@mui/icons-material';
import { Box, Typography, styled, type Theme, useTheme } from '@mui/material';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

import { LinearProgress } from '#components/common/LinearProgress/linear-progress';
import Switch from '#components/common/switch';
import { useAutoMessage } from '#hooks/data/useAutomessage';

type AutomessageItemProps = {
	onEdit: (id: string) => void;
	message: GetAutoMessageDto;
};

export function AutomessageItem(props: AutomessageItemProps) {
	const { onEdit, message } = props;
	const { update, remove } = useAutoMessage();
	const t = useTranslations();
	const theme = useTheme();

	return (
		<Box
			sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				rowGap: '.5rem',
				padding: '1rem',
				borderRadius: '1.25rem',
				border: t => `2px solid ${t.palette.neutral.darker}`,
				backgroundColor: t => t.palette.neutral.darkest,
				maxWidth: '306px',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', columnGap: '.5rem' }}>
					<CalendarMonth htmlColor={theme.palette.neutral.dark} sx={{ width: '1rem', height: '1rem' }} />
					<Typography sx={{ fontSize: '12px', fontWeight: 600, color: t => t.palette.neutral.dark }}>{`${t(
						'commons.Created',
					)} ${format(new Date(message.createdAt), 'dd MMM, yyyy')}`}</Typography>
				</Box>
				<Switch
					switchType="big"
					checked={!message.disabled}
					onChange={async (_, value) => {
						await update(message._id, {
							disabled: !value,
							channel: message.channel,
							content: message.content,
							embed: message.embed,
							interval: message.interval,
							name: message.name,
							postTime: message.nextPost,
						});
					}}
				/>
			</Box>
			<Typography sx={{ fontSize: '18px', fontWeight: 600, color: t => t.palette.neutral.lightest }}>
				{message.name}
			</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', columnGap: '.25rem' }}>
				<Typography sx={{ fontSize: '13px', fontWeight: 600, color: t => t.palette.neutral.dark }}>
					{t('commons.NextPost')}
				</Typography>
				<Typography sx={{ fontSize: '13px', fontWeight: 600, color: t => t.palette.neutral.lightest }}>
					{format(new Date(message.nextPost), 'dd MMM, yyyy hh:mm a')}
				</Typography>
			</Box>
			<Box>
				<Typography
					sx={{ marginBottom: '.5rem', fontSize: '14px', fontWeight: 600, color: t => t.palette.neutral.lightest }}
				>
					{t('commons.TimeLeft')}
				</Typography>
				<LinearProgress createdAt={message.createdAt} nextPost={message.nextPost} />
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', columnGap: '.5rem', marginTop: '.75rem' }}>
				<Action
					type="edit"
					onClick={() => {
						onEdit(message._id);
					}}
				/>
				<Action
					type="delete"
					onClick={async () => {
						await remove(message._id);
					}}
				/>
			</Box>
		</Box>
	);
}

function Action({ onClick, type }: { onClick: () => void; type: 'edit' | 'delete' }) {
	const theme = useTheme();
	const t = useTranslations();

	const Icon = type === 'edit' ? Edit : Delete;

	return (
		<Box
			sx={{
				display: 'flex',
				placeItems: 'center',
				padding: '.5rem 1rem',
				columnGap: '.5rem',
				width: 'max-content',
				borderRadius: '4px',
				cursor: 'pointer',
				border: `2px solid ${theme.palette.neutral.dark}`,
			}}
			onClick={onClick}
		>
			<Typography sx={{ fontSize: '14px', fontWeight: 600, color: t => t.palette.neutral.lightest }}>
				{type === 'edit' ? t('commons.Edit') : t('commons.Delete')}
			</Typography>
			<Icon sx={{ width: '20px', height: '20px' }} htmlColor={theme.palette.neutral.dark} />
		</Box>
	);
}
