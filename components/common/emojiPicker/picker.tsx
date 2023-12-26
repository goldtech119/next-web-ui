import _EmojiData from '@emoji-mart/data';
import EmojiMartPicker from '@emoji-mart/react';
import { init } from 'emoji-mart';
import { useTranslations } from 'next-intl';
import React from 'react';

const EmojiData = _EmojiData as EmojiMartDataType;

init({ data: EmojiData }).catch(console.error);

export type PickerProps = {
  customEmojisMeta: CustomEmojiMeta[];
  onEmojiSelect: (
    emoji: EmojiMartCustomEmojiMeta | EmojiMartEmojiMeta,
    event: unknown
  ) => void;
  onClickOutside?: () => void;
};

export const Picker: React.FC<PickerProps> = ({
	customEmojisMeta,
	onEmojiSelect,
	onClickOutside,
}) => {
	const t = useTranslations();
	const customEmojis = customEmojisMeta?.map(
		customEmojiMetaToEmojiMartCustomEmojiMeta,
	);

	return (
		<EmojiMartPicker
			custom={
				customEmojisMeta
					? [
						{
							id: 'custom',
							name: t('commons.CustomServerEmotes'),
							emojis: customEmojis,
						},
					]
					: undefined
			}
			onEmojiSelect={onEmojiSelect}
			onClickOutside={onClickOutside}
		/>
	);
};

type EmojiMartDataType = {
  aliases: Record<string, string>;
  categories: { id: string; emojis: string[] }[];
  emojis: Record<string, EmojiMartEmojiMeta>;
  emoticons: Record<string, string>;
  natives: Record<string, string>;
  originalCategories: { id: string; emojis: string[] }[];
  sheet: { cols: number; rows: number };
};

export type CustomEmojiMeta = {
  id: string;
  name: string;
  animated?: boolean;
};

export type EmojiMartEmojiMeta = {
  id: string;
  name: string;
  search: string;
  keywords: string[];
  skins: { unified: string; native: string; shortcodes: string }[];
  version: number;
  native: string | undefined;
};

export type EmojiMartCustomEmojiMeta = {
  id: string;
  name: string;
  keywords: string[];
  skins: { src: string }[];
  search: string;
};

export type EmojiMartCustomEmojiCategory = {
  id: string;
  name: string;
  emojis: EmojiMartCustomEmojiMeta[];
};

const customEmojiMetaToEmojiMartCustomEmojiMeta = (
	emoji: CustomEmojiMeta,
): EmojiMartCustomEmojiMeta | undefined =>
	emoji?.id
		? {
			id: emoji.id,
			name: emoji.name,
			keywords: [emoji.name],
			search: emoji.name,
			skins: [
				{
					src: `https://cdn.discordapp.com/emojis/${emoji.id}.${
						emoji.animated ? 'gif' : 'png'
					}`,
				},
			],
		}
		: undefined;

export const isCustomEmoji = (
	emoji: EmojiMartEmojiMeta | EmojiMartCustomEmojiMeta,
): emoji is EmojiMartCustomEmojiMeta =>
	(emoji as EmojiMartEmojiMeta).native === undefined;
