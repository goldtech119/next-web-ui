import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import {
	$convertFromMarkdownString,
	$convertToMarkdownString,
	TEXT_FORMAT_TRANSFORMERS,
	TEXT_MATCH_TRANSFORMERS,
	TRANSFORMERS,
} from '@lexical/markdown';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { styled } from '@mui/material';
import {
	$getRoot,
	$getSelection,
	$getTextContent,
	EditorState,
	GridSelection,
	LexicalEditor,
	NodeSelection,
	RangeSelection,
	RootNode,
} from 'lexical';
import { BeautifulMentionNode } from 'lexical-beautiful-mentions';
import React, { useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { CustomEmojiNode } from './nodes/customEmojiNode';
import CodeHighlightPlugin from './plugins/codeHighlightPlugin';
import DebugPlugin from './plugins/debugPlugin';
import EmojiAutocompletePlugin, { EmojiAutocompletePluginProps } from './plugins/emojiAutocompletePlugin';
import MentionsPlugin, { MentionsPluginProps } from './plugins/mentionsPlugin';
import ToolbarPlugin, { ToolbarPluginProps } from './plugins/toolbarPlugin';
import { StyleWrapper, ToolbarStyles, TypeaheadStyles } from './styles';
import { theme } from './theme';

export type EditorProps = {
	name: string;
	placeholder?: React.ReactNode | null;
	debug?: boolean;
	options?: {
		mentionsPlugin?: MentionsPluginProps;
		toolbarPlugin?: ToolbarPluginProps;
		emojiAutocompletePlugin?: EmojiAutocompletePluginProps;
	};
	onChange?: (data: { root: RootNode; selection: RangeSelection | NodeSelection | GridSelection | null; selectedText: string }) => void;
	onError?: (error: Error, editor: LexicalEditor) => void;
	transformers?: typeof TRANSFORMERS;
};

export const Editor: React.FC<EditorProps> = ({
	name,
	placeholder,
	debug,
	options,
	onChange,
	onError,
	transformers = [...TEXT_FORMAT_TRANSFORMERS, ...TEXT_MATCH_TRANSFORMERS],
}) => {
	const {
		formState: { defaultValues },
		setValue,
	} = useFormContext();

	const onErrorHandler: InitialConfigType['onError'] = useCallback(
		(error, editor) => {
			const handler = onError ?? console.error;
			handler(error, editor);
		},
		[onError],
	);
	const onChangeHandler: (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void = useCallback(
		editorState => {
			editorState.read(() => {
				const root = $getRoot();
				const selection = $getSelection();
				const selectedText = $getTextContent();

				setValue(name, $convertToMarkdownString(transformers));

				if (onChange) {
					onChange({ root, selection, selectedText });
				}
			});
		},
		[name, onChange, setValue, transformers],
	);

	const config: InitialConfigType = useMemo(
		() => ({
			namespace: `RichEditor-${name}`,
			theme,
			onError: onErrorHandler,
			nodes: [CodeNode, CodeHighlightNode, AutoLinkNode, LinkNode, BeautifulMentionNode, CustomEmojiNode],
			editorState: () => $convertFromMarkdownString(defaultValues?.[name] as string, transformers),
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	const globalStyles = useMemo(
		() => (
			<style
				key='dyno-rich-editor--global-styles'
				dangerouslySetInnerHTML={{
					__html: [TypeaheadStyles, ToolbarStyles].join(' '),
				}}
			/>
		),
		[],
	);

	return (
		<StyleWrapper>
			<LexicalComposer initialConfig={config}>
				<ToolbarPlugin {...options?.toolbarPlugin} />
				<RichTextPlugin
					contentEditable={<StyledMultilineEditorInput />}
					placeholder={<div className='editor-placeholder'>{placeholder}</div>}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<OnChangePlugin onChange={onChangeHandler} />
				<HistoryPlugin />
				<CodeHighlightPlugin />
				<LinkPlugin />
				<MentionsPlugin {...options?.mentionsPlugin} />
				<EmojiAutocompletePlugin {...options?.emojiAutocompletePlugin} />
				{debug ? <DebugPlugin /> : <></>}
			</LexicalComposer>
			{globalStyles}
		</StyleWrapper>
	);
};

const StyledMultilineEditorInput = styled(ContentEditable)(({ theme }) => ({
	borderBottomLeftRadius: 10,
	borderBottomRightRadius: 10,
	border: `2px solid ${theme.palette.neutral.darker}`,
	borderTop: 'none',
	padding: 16,
	background: theme.palette.neutral.darkest,
	color: theme.palette.neutral.lightest,
	minHeight: 150,
	resize: 'vertical',
}));
