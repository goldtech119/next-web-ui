import { computePosition } from '@floating-ui/dom';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
	FormatBold,
	FormatItalic,
	FormatShapes,
	FormatStrikethrough,
	FormatUnderlined,
} from '@mui/icons-material';
import { styled } from '@mui/material';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePointerInteractions } from '../hooks/usePointerInteractions';

type FloatingMenuCoords = { x: number; y: number } | undefined;

type FloatingMenuState = {
  isBold: boolean;
  isCode: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
};

type FloatingMenuProps = {
  editor: ReturnType<typeof useLexicalComposerContext>[0];
  coords: FloatingMenuCoords;
};

const FloatingMenu = forwardRef<HTMLDivElement, FloatingMenuProps>(
	({ editor, coords }, ref) => {
		const shouldShow = coords !== undefined;

		const [state, setState] = useState<FloatingMenuState>({
			isBold: false,
			isCode: false,
			isItalic: false,
			isStrikethrough: false,
			isUnderline: false,
		});

		useEffect(() => {
			const unregisterListener = editor.registerUpdateListener(
				({ editorState }) => {
					editorState.read(() => {
						const selection = $getSelection();
						if (!$isRangeSelection(selection)) {
							return;
						}

						setState({
							isBold: selection.hasFormat('bold'),
							isCode: selection.hasFormat('code'),
							isItalic: selection.hasFormat('italic'),
							isStrikethrough: selection.hasFormat('strikethrough'),
							isUnderline: selection.hasFormat('underline'),
						});
					});
				},
			);
			return unregisterListener;
		}, [editor]);

		return (
			<StyledFloatingMenu
				ref={ref}
				aria-hidden={!shouldShow}
				shouldShow={shouldShow}
				coords={coords}
				className='toolbar toolbar--floating'
			>
				<button
					aria-label='Format text as bold'
					onClick={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
					}}
					className={'toolbar-item spaced ' + (state.isBold ? 'active' : '')}
				>
					<FormatBold />
				</button>
				<button
					// Icon="italic"
					aria-label='Format text as italics'
					// Active={state.isItalic}
					onClick={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
					}}
					className={'toolbar-item spaced ' + (state.isItalic ? 'active' : '')}
				>
					<FormatItalic />
				</button>
				<button
					// Icon="underline"
					aria-label='Format text to underlined'
					// Active={state.isUnderline}
					onClick={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
					}}
					className={
						'toolbar-item spaced ' + (state.isUnderline ? 'active' : '')
					}
				>
					<FormatUnderlined />
				</button>
				<button
					// Icon="strike"
					aria-label='Format text with a strikethrough'
					// Active={state.isStrikethrough}
					onClick={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
					}}
					className={
						'toolbar-item spaced ' + (state.isStrikethrough ? 'active' : '')
					}
				>
					<FormatStrikethrough />
				</button>
				<button
					// Icon="code"
					aria-label='Format text with inline code'
					// Active={state.isCode}
					onClick={() => {
						editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
					}}
					className={'toolbar-item spaced ' + (state.isCode ? 'active' : '')}
				>
					<FormatShapes />
				</button>
			</StyledFloatingMenu>
		);
	},
);
FloatingMenu.displayName = 'FloatingMenu';

const StyledFloatingMenu = styled('div')<{
  coords: FloatingMenuCoords;
  shouldShow: boolean;
}>`
  position: absolute;
  top: ${({ coords }) => `${coords?.y}px`};
  left: ${({ coords }) => `${coords?.x}px`};
  visibility: ${({ shouldShow }) => (shouldShow ? 'visible' : 'hidden')};
  opacity: ${({ shouldShow }) => (shouldShow ? 1 : 0)};
`;

const FloatingMenuPlugin = () => {
	const ref = useRef<HTMLDivElement>(null);
	const [coords, setCoords] = useState<FloatingMenuCoords>();
	const [editor] = useLexicalComposerContext();

	const { isPointerDown, isPointerReleased } = usePointerInteractions();

	const calculatePosition = useCallback(() => {
		const domSelection = getSelection();
		const domRange
      = domSelection?.rangeCount !== 0 && domSelection?.getRangeAt(0);

		if (!domRange || !ref.current || isPointerDown) {
			return setCoords(undefined);
		}

		computePosition(domRange, ref.current, { placement: 'top' })
			.then(pos => {
				setCoords({ x: pos.x, y: pos.y - 10 });
			})
			.catch(() => {
				setCoords(undefined);
			});
	}, [isPointerDown]);

	const $handleSelectionChange = useCallback(() => {
		if (
			editor.isComposing()
      || editor.getRootElement() !== document.activeElement
		) {
			setCoords(undefined);
			return;
		}

		const selection = $getSelection();

		if ($isRangeSelection(selection) && !selection.anchor.is(selection.focus)) {
			calculatePosition();
		} else {
			setCoords(undefined);
		}
	}, [editor, calculatePosition]);

	useEffect(() => {
		const unregisterListener = editor.registerUpdateListener(
			({ editorState }) => {
				editorState.read(() => $handleSelectionChange());
			},
		);
		return unregisterListener;
	}, [editor, $handleSelectionChange]);

	const show = coords !== undefined;

	useEffect(() => {
		if (!show && isPointerReleased) {
			editor.getEditorState().read(() => $handleSelectionChange());
		}
		// Adding show to the dependency array causes an issue if
		// a range selection is dismissed by navigating via arrow keys.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPointerReleased, $handleSelectionChange, editor]);

	return createPortal(
		<FloatingMenu ref={ref} editor={editor} coords={coords} />,
		document.body,
	);
};

export default FloatingMenuPlugin;
