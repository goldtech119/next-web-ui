import { styled } from '@mui/material';
import { DecoratorNode, LexicalNode, NodeKey } from 'lexical';
import { ReactNode } from 'react';
import { CustomEmojiMeta } from '../plugins/emojiAutocompletePlugin';

export class CustomEmojiNode extends DecoratorNode<ReactNode> {
	meta: CustomEmojiMeta;
	code: string;

	constructor(meta: CustomEmojiMeta, key?: NodeKey) {
		super(key);
		this.meta = meta;
		this.code = `:${this.meta.name}:`;
	}

	static getType(): string {
		return 'customEmoji';
	}

	getTextContent(): string {
		return this.code;
	}

	getTextContentSize(): number {
		return this.code.length;
	}

	static clone(node: CustomEmojiNode): CustomEmojiNode {
		return new CustomEmojiNode(node.meta, node.__key);
	}

	createDOM(): HTMLElement {
		return document.createElement('span');
	}

	updateDOM(): false {
		return false;
	}

	decorate(): ReactNode {
		if (!this.meta) {
			return null;
		}

		return (
			<StyledEmoji
				src={`https://cdn.discordapp.com/emojis/${this.meta.id}`}
				alt={this.meta.name}
				height={24}
				width={24}
			/>
		);
	}
}

export const $createCustomEmojiNode = (
	meta: CustomEmojiMeta,
): CustomEmojiNode => new CustomEmojiNode(meta);

export const $isCustomEmojiNode = (
	node: LexicalNode | null | undefined,
): node is CustomEmojiNode => node instanceof CustomEmojiNode;

const StyledEmoji = styled('img')``;
