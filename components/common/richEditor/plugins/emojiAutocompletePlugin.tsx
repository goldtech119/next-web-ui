import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
	LexicalTypeaheadMenuPlugin,
	MenuOption,
	useBasicTypeaheadTriggerMatch,
} from '@lexical/react/LexicalTypeaheadMenuPlugin';
import {
	$createTextNode,
	$getSelection,
	$isRangeSelection,
	TextNode,
} from 'lexical';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { $createCustomEmojiNode } from '../nodes/customEmojiNode';

class EmojiOption extends MenuOption {
	id: string;
	title: string;
	code: string;
	emoji: React.JSX.Element;
	keywords: Array<string>;
	isCustom: boolean;

	constructor(
		id: string,
		title: string,
		code: string,
		emoji: React.JSX.Element,
		options: {
      keywords?: Array<string>;
      isCustom?: boolean;
    },
	) {
		super(title);
		this.id = id;
		this.title = title;
		this.code = code;
		this.emoji = emoji;
		this.keywords = options.keywords || [];
		this.isCustom = options.isCustom ?? false;
	}
}

const EmojiMenuItem = ({
	index,
	isSelected,
	onClick,
	onMouseEnter,
	option,
}: {
  index: number;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  option: EmojiOption;
}) => (
	<li
		key={option.key}
		tabIndex={-1}
		className={`item${isSelected ? ' selected' : ''}`}
		ref={el => option.setRefElement(el)}
		role='option'
		aria-selected={isSelected}
		id={`typeahead-item-${index}`}
		onMouseEnter={onMouseEnter}
		onClick={onClick}
	>
		<div className='content'>
			{option.emoji}
			<span>{option.title}</span>
		</div>
	</li>
);

export type StandardEmojiMeta = {
  emoji: string;
  description: string;
  category: string;
  aliases: Array<string>;
  tags: Array<string>;
  unicode_version: string;
  ios_version: string;
  skin_tones?: boolean;
};

export type CustomEmojiMeta = {
  id: string;
  name: string;
  animated?: boolean;
};

export type EmojiMeta = StandardEmojiMeta | CustomEmojiMeta;

export type EmojiAutocompletePluginProps = {
  fetchEmojis?: () => Promise<CustomEmojiMeta[]>;
  minimumLengthForCompletion?: number;
  triggerCharacter?: string;
  maxSuggestionCount?: number;
};

const EmojiAutocompletePlugin: React.FC<EmojiAutocompletePluginProps> = ({
	fetchEmojis,
	minimumLengthForCompletion = 1,
	triggerCharacter = ':',
	maxSuggestionCount = 10,
}) => {
	const [editor] = useLexicalComposerContext();
	const [queryString, setQueryString] = useState<string | null>(null);
	const [emojis, setEmojis] = useState<Array<EmojiMeta>>([]);

	useEffect(() => {
		if (fetchEmojis) {
			fetchEmojis()
				.then(emojis => {
					if (Array.isArray(emojis)) {
						setEmojis(x => [...x, ...emojis]);
					}
				})
				.catch(error => {
					console.error(error);
				});
		}

		import('../utils/emoji-list')
			.then(file => {
				setEmojis(x => [...x, ...file.default]);
			})
			.catch(error => {
				console.error(error);
			});
	}, [fetchEmojis]);

	const emojiOptions = useMemo(
		() =>
			emojis !== null && emojis !== undefined
				? emojis.map(emojiMeta => {
					let option;

					if ('id' in emojiMeta) {
						option = new EmojiOption(
							emojiMeta.id,
							emojiMeta.name,
							`:${emojiMeta.name}:`,
							(
								<span>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={`https://cdn.discordapp.com/emojis/${emojiMeta.id}`}
										height={20}
										width={20}
										alt={`${emojiMeta.name} emoji`}
									/>
								</span>
							),
							{
								keywords: [emojiMeta.name],
								isCustom: true,
							},
						);
					} else {
						option = new EmojiOption(
							emojiMeta.emoji,
							emojiMeta.aliases[0],
							`:${emojiMeta.aliases[0]}:`,
							<span>{emojiMeta.emoji}</span>,
							{
								keywords: emojiMeta.aliases,
							},
						);
					}

					return option;
				})
				: [],
		[emojis],
	);

	const checkForTriggerMatch = useBasicTypeaheadTriggerMatch(triggerCharacter, {
		minLength: minimumLengthForCompletion,
	});

	const options: Array<EmojiOption> = useMemo(() => emojiOptions
		.filter((option: EmojiOption) => queryString !== null && queryString !== undefined
			? new RegExp(queryString, 'gi').exec(option.title)
            || (option.keywords !== null && option.keywords !== undefined)
				? option.keywords.some((keyword: string) =>
					new RegExp(queryString, 'gi').exec(keyword),
				)
				: false
			: emojiOptions)
		.slice(0, maxSuggestionCount), [emojiOptions, maxSuggestionCount, queryString]);

	const onSelectOption = useCallback(
		(
			selectedOption: EmojiOption,
			nodeToRemove: TextNode | null,
			closeMenu: () => void,
		) => {
			editor.update(() => {
				const selection = $getSelection();

				if (!$isRangeSelection(selection) || !selectedOption) {
					return;
				}

				if (nodeToRemove) {
					nodeToRemove.remove();
				}

				if (selectedOption.isCustom) {
					selection.insertNodes([
						$createCustomEmojiNode({
							id: selectedOption.id,
							name: selectedOption.title,
						}),
					]);
				} else {
					selection.insertNodes([$createTextNode(selectedOption.id)]);
				}

				closeMenu();
			});
		},
		[editor],
	);

	return (
		<LexicalTypeaheadMenuPlugin
			onQueryChange={setQueryString}
			onSelectOption={onSelectOption}
			triggerFn={checkForTriggerMatch}
			options={options}
			menuRenderFn={(
				anchorElementRef,
				{ selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
			) => {
				if (anchorElementRef.current === null || options.length === 0) {
					return null;
				}

				return anchorElementRef.current && options.length
					? ReactDOM.createPortal(
						<div className='typeahead-popover emoji-menu'>
							<ul>
								{options.map((option: EmojiOption, index) => (
									<div key={option.key}>
										<EmojiMenuItem
											index={index}
											isSelected={selectedIndex === index}
											onClick={() => {
												setHighlightedIndex(index);
												selectOptionAndCleanUp(option);
											}}
											onMouseEnter={() => {
												setHighlightedIndex(index);
											}}
											option={option}
										/>
									</div>
								))}
							</ul>
						</div>,
						anchorElementRef.current,
					)
					: null;
			}}
		/>
	);
};

export default EmojiAutocompletePlugin;
