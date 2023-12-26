import { EmojiPicker } from '#components/common/emojiPicker';
import {
	EmojiMartCustomEmojiMeta,
	EmojiMartEmojiMeta,
} from '#components/common/emojiPicker/picker';
import { Close } from '@mui/icons-material';

import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { FC, useReducer, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface EmojiPickerInputProps {
  name?: string;
  close?: boolean;
  showName?: boolean;
}

export const EmojiPickerInput: FC<EmojiPickerInputProps> = ({ name, close, showName }) => {
	const theme = useTheme();
	const containerRef = useRef<HTMLDivElement>(null);
	const [show, toggle] = useReducer(isOpen => !isOpen, false);
	const [emoji, setEmoji] = useState<
    EmojiMartCustomEmojiMeta | EmojiMartEmojiMeta | null
  >(null);

	const Emoji = emoji ? (
		isDefaultEmoji(emoji) ? (
			<Typography fontSize={24}>{emoji.native}</Typography>
		) : (
			<Image
				src={`https://cdn.discordapp.com/emojis/${emoji.id}`}
				alt={emoji.name}
				height={24}
				width={24}
			/>
		)
	) : null;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: '.25rem',
				justifyContent: 'center',
				alignItems: 'center',
				maxWidth: 'max-content',
			}}
		>
			<Box
				ref={containerRef}
				sx={{
					position: 'relative',
					userSelect: 'none',
					display: 'grid',
					placeItems: 'center',
					height: '3rem',
					width: '3rem',
					borderRadius: '.75rem',
					background: theme.palette.neutral.main,
					border: `2px solid ${theme.palette.neutral.darker}`,
					cursor: 'pointer',
				}}
				onClick={() => toggle()}
			>
				{Emoji}
				<Box
					sx={{
						position: 'absolute',
						display: close && emoji ? 'grid' : 'none',
						placeItems: 'center',
						height: '1.75rem',
						width: '1.75rem',
						top: '-1rem',
						left: '2rem',
						borderRadius: '50%',
						bgcolor: theme.palette.neutral.main,
						border: `2px solid ${theme.palette.neutral.darkest}`,
					}}
					onClick={e => {
						e.stopPropagation();
						setEmoji(null);
					}}
				>
					<Close htmlColor={theme.palette.neutral.dark} sx={{ width: '1rem', height: '1rem' }} />
				</Box>
				<input type='hidden' name={name} value={emoji?.id} />
				{show
					? createPortal(
						<div
							style={{
								position: 'absolute',
								zIndex: 1000,
								top: containerRef.current?.offsetTop,
								left: containerRef.current?.offsetLeft,
								marginTop: '4.75rem',
							}}
						>
							<EmojiPicker
								onEmojiSelect={emoji => {
									setEmoji(emoji);
								}}
								onClickOutside={() => {
									toggle();
								}}
								customEmojisMeta={[]}
							/>
						</div>,
						document.body,
					)
					: null}
			</Box>
			<Box
				sx={{
					minHeight: showName ? '1rem' : 0,
					fontSize: '10px',
					maxWidth: '3rem',
					textAlign: 'center',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis',
					overflow: 'hidden',
				}}
			>
				{showName ? emoji?.name : ''}
			</Box>
		</Box>
	);
};

function isDefaultEmoji(
	emoji: EmojiMartCustomEmojiMeta | EmojiMartEmojiMeta,
): emoji is EmojiMartEmojiMeta {
	return (emoji as EmojiMartEmojiMeta).native !== undefined;
}
