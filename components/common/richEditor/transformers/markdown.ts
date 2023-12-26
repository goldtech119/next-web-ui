import {
	ELEMENT_TRANSFORMERS,
	TEXT_FORMAT_TRANSFORMERS,
	TEXT_MATCH_TRANSFORMERS,
	TextMatchTransformer,
	Transformer,
} from '@lexical/markdown';
import { $createTextNode } from 'lexical';
import emojiList from '../utils/emoji-list';

export const EMOJI: TextMatchTransformer = {
	dependencies: [],
	export: () => null,
	importRegExp: /:([a-z\d_]+):/,
	regExp: /:([a-z\d_]+):/,
	replace(textNode, [, name]) {
		const emoji = emojiList.find(e => e.aliases.includes(name))?.emoji;
		if (emoji) {
			textNode.replace($createTextNode(emoji));
		}
	},
	trigger: ':',
	type: 'text-match',
};

export const MARKDOWN_TRANSFORMERS: Array<Transformer> = [
	EMOJI,
	...ELEMENT_TRANSFORMERS,
	...TEXT_FORMAT_TRANSFORMERS,
	...TEXT_MATCH_TRANSFORMERS,
];
