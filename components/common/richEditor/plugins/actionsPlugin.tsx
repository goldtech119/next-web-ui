import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
	AlternateEmailOutlined,
	InsertEmoticonOutlined,
} from '@mui/icons-material';
import { styled } from '@mui/material';
import { $getRoot, $isParagraphNode, LexicalEditor } from 'lexical';
import React, { useEffect, useState } from 'react';

type ActionsPluginProps = {
  validateEditorState?: (editor: LexicalEditor) => Promise<void>;
};

const ActionsPlugin: React.FC<ActionsPluginProps> = ({
	validateEditorState,
}) => {
	const [editor] = useLexicalComposerContext();
	const [isEditable, setIsEditable] = useState(() => editor.isEditable());
	const [isEditorEmpty, setIsEditorEmpty] = useState(true);

	useEffect(() => editor.registerEditableListener(editable => {
		setIsEditable(editable);
	}), [editor]);

	useEffect(() => editor.registerUpdateListener(({ dirtyElements, tags }) => {
		// If we are in read only mode, send the editor state
		// to server and ask for validation if possible.
		if (
			!isEditable
        && dirtyElements.size > 0
        && !tags.has('historic')
        && !tags.has('collaboration')
        && validateEditorState
		) {
			void validateEditorState(editor);
		}

		editor.getEditorState().read(() => {
			const root = $getRoot();
			const children = root.getChildren();

			if (children.length > 1) {
				setIsEditorEmpty(false);
			} else if ($isParagraphNode(children[0])) {
				const paragraphChildren = children[0].getChildren();
				setIsEditorEmpty(paragraphChildren.length === 0);
			} else {
				setIsEditorEmpty(false);
			}
		});
	}), [editor, isEditable, validateEditorState]);

	return (
		<StyledActions>
			<StyledActionButton
				onClick={console.log}
				title='Insert Emoji'
				aria-label='Insert Emoji'
			>
				<InsertEmoticonOutlined />
			</StyledActionButton>
			<StyledActionButton
				onClick={console.log}
				title='Insert Role Mention'
				aria-label='Insert Role Mention'
			>
				<AlternateEmailOutlined />
			</StyledActionButton>
		</StyledActions>
	);
};

const StyledActions = styled('div')`
  position: absolute;
  text-align: right;
  margin: 10px;
  bottom: 0;
  right: 0;

  &.tree-view {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const StyledActionButton = styled('button')`
  background-color: #eee;
  border: 0;
  padding: 8px 12px;
  position: relative;
  margin-left: 5px;
  border-radius: 15px;
  color: #222;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
    color: #000;
  }

  &:disabled {
    opacity: 0.6;
    background: #eee;
    cursor: not-allowed;
  }
`;

export default ActionsPlugin;
