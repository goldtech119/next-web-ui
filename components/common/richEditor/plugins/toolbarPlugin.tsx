import { EmojiPicker } from '#components/common/emojiPicker';
import { CustomEmojiMeta, PickerProps, isCustomEmoji } from '#components/common/emojiPicker/picker';
import { hexToRgba } from '#helpers/colorHelper';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import {
	CodeRounded,
	EmojiEmotionsOutlined,
	FormatBoldRounded,
	FormatItalicRounded,
	FormatStrikethroughRounded,
	FormatUnderlinedRounded,
	LinkRounded,
} from '@mui/icons-material';
import { Box, styled } from '@mui/material';
import {
	$createTextNode,
	$getSelection,
	$isRangeSelection,
	COMMAND_PRIORITY_CRITICAL,
	COMMAND_PRIORITY_NORMAL,
	FORMAT_TEXT_COMMAND,
	KEY_MODIFIER_COMMAND,
	SELECTION_CHANGE_COMMAND,
} from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { $createCustomEmojiNode } from '../nodes/customEmojiNode';
import { IS_APPLE } from '../utils/environment';
import { getSelectedNode, sanitizeUrl } from '../utils/helpers';

export type ToolbarPluginProps = {
	hide?: boolean;
	customEmojisMeta?: CustomEmojiMeta[];
};

const ToolbarPlugin: React.FC<ToolbarPluginProps> = ({ hide, customEmojisMeta }) => {
	const [editor] = useLexicalComposerContext();
	const [activeEditor, setActiveEditor] = useState(editor);
	const [isLink, setIsLink] = useState(false);
	const [isBold, setIsBold] = useState(false);
	const [isItalic, setIsItalic] = useState(false);
	const [isUnderline, setIsUnderline] = useState(false);
	const [isStrikethrough, setIsStrikethrough] = useState(false);
	const [isCode, setIsCode] = useState(false);
	const [isEditable, setIsEditable] = useState(() => editor.isEditable());
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const $updateToolbar = useCallback(() => {
		const selection = $getSelection();

		if ($isRangeSelection(selection)) {
			// Update text format
			setIsBold(selection.hasFormat('bold'));
			setIsItalic(selection.hasFormat('italic'));
			setIsUnderline(selection.hasFormat('underline'));
			setIsStrikethrough(selection.hasFormat('strikethrough'));
			setIsCode(selection.hasFormat('code'));

			// Update links
			const node = getSelectedNode(selection);
			const parent = node.getParent();
			if ($isLinkNode(parent) || $isLinkNode(node)) {
				setIsLink(true);
			} else {
				setIsLink(false);
			}
		}
	}, []);

	useEffect(() => editor.registerCommand(
		SELECTION_CHANGE_COMMAND,
		(_payload, newEditor) => {
			$updateToolbar();
			setActiveEditor(newEditor);
			return false;
		},
		COMMAND_PRIORITY_CRITICAL,
	), [editor, $updateToolbar]);

	useEffect(() => mergeRegister(
		editor.registerEditableListener(editable => {
			setIsEditable(editable);
		}),
		activeEditor.registerUpdateListener(({ editorState }) => {
			editorState.read(() => {
				$updateToolbar();
			});
		}),
	), [$updateToolbar, activeEditor, editor]);

	useEffect(() => activeEditor.registerCommand(
		KEY_MODIFIER_COMMAND,
		payload => {
			const event: KeyboardEvent = payload;
			const { code, ctrlKey, metaKey } = event;

			if (code === 'KeyK' && (ctrlKey || metaKey)) {
				event.preventDefault();
				return activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
			}

			return false;
		},
		COMMAND_PRIORITY_NORMAL,
	), [activeEditor, isLink]);

	const insertLink = useCallback(() => {
		if (isLink) {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
		} else {
			editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
		}
	}, [editor, isLink]);

	const onEmojiSelect: PickerProps['onEmojiSelect'] = useCallback(
		emoji => {
			editor.update(() => {
				setShowEmojiPicker(false);

				const selection = $getSelection();

				if (!$isRangeSelection(selection)) {
					return;
				}

				if (isCustomEmoji(emoji)) {
					selection.insertNodes([
						$createCustomEmojiNode({
							id: emoji.id,
							name: emoji.name,
						}),
					]);
				} else {
					selection.insertNodes([$createTextNode((emoji as any).native)]);
				}
			});
		},
		[editor],
	);

	return hide ? null : (
		<Box
			sx={{
				display: 'flex',
				background: t => t.palette.neutral.darkest,
				padding: 2,
				borderTopLeftRadius: 10,
				borderTopRightRadius: 10,
				border: t => `2px solid ${t.palette.neutral.darker}`,
				verticalAlign: 'middle',
				gap: 2,
			}}
		>
			<div
				style={{
					position: 'fixed',
					zIndex: 10,
					display: showEmojiPicker ? 'block' : 'none',
				}}
			>
				<EmojiPicker
					onEmojiSelect={onEmojiSelect}
					onClickOutside={() => {
						if (showEmojiPicker) {
							setShowEmojiPicker(false);
						}
					}}
					customEmojisMeta={customEmojisMeta ?? []}
				/>
			</div>
			<ToolbarButton
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
				}}
				title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
				aria-label={`Format text as bold. Shortcut: ${IS_APPLE ? '⌘B' : 'Ctrl+B'}`}
				active={isBold}
			>
				<FormatBoldRounded />
			</ToolbarButton>
			<ToolbarButton
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
				}}
				title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
				aria-label={`Format text as italics. Shortcut: ${IS_APPLE ? '⌘I' : 'Ctrl+I'}`}
				active={isItalic}
			>
				<FormatItalicRounded />
			</ToolbarButton>
			<ToolbarButton
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
				}}
				title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
				aria-label={`Format text to underlined. Shortcut: ${IS_APPLE ? '⌘U' : 'Ctrl+U'}`}
				active={isUnderline}
			>
				<FormatUnderlinedRounded />
			</ToolbarButton>
			<ToolbarButton
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
				}}
				title='Strikethrough'
				aria-label='Format text with a strikethrough'
				active={isStrikethrough}
			>
				<FormatStrikethroughRounded />
			</ToolbarButton>
			<ToolbarButtonSpacer />
			<ToolbarButton
				disabled={!isEditable}
				onClick={() => {
					activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
				}}
				title='Insert code block'
				aria-label='Insert code block'
				active={isCode}
			>
				<CodeRounded />
			</ToolbarButton>
			<ToolbarButton disabled={!isEditable} onClick={insertLink} aria-label='Insert link' title='Insert link' active={isLink}>
				<LinkRounded />
			</ToolbarButton>
			<ToolbarButton disabled={!isEditable} onClick={() => setShowEmojiPicker(true)} aria-label='Insert Emoji' title='Insert Emoji'>
				<EmojiEmotionsOutlined />
			</ToolbarButton>
		</Box>
	);
};

interface ToolbarButtonProps extends React.PropsWithChildren {
	active?: boolean;
	disabled?: boolean;
	onClick: () => void;
	ariaLabel?: string;
	title?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ children, onClick, ...rest }) => (
	<StyledToolbarButton
		onClick={e => {
			e.preventDefault();
			onClick();
		}}
		{...rest}
	>
		{children}
	</StyledToolbarButton>
);

const ToolbarButtonSpacer = styled('div')(({ theme }) => ({
	width: theme.spacing(3),
}));

const StyledToolbarButton = styled('button')<{ active?: boolean }>(({ theme, active }) => ({
	backgroundColor: active ? '#ffffff' : hexToRgba(theme.palette.neutral.dark, 0.1),
	color: active ? theme.palette.neutral.main : theme.palette.neutral.dark,
	cursor: 'pointer',
	border: 'none',
	borderRadius: 4,
	display: 'grid',
	placeContent: 'center',
	height: 24,
	width: 24,
	'& svg': {
		height: 14,
		width: 14,
	},
}));

export default ToolbarPlugin;
