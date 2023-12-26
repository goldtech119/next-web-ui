import { defaultFetcher } from '#helpers/swrHelper';
import type { Meta, StoryObj } from '@storybook/react';
import { EmojiPicker } from '.';
import { CustomEmojiMeta } from './picker';

const meta: Meta<typeof EmojiPicker> = {
	title: 'Common/Emoji Picker',
	component: EmojiPicker,
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EmojiPicker>;

const getCustomEmojis = async (): Promise<CustomEmojiMeta[]> => {
	const url = `${process.env.API_URL}/api/modules/258788884777795584/sandbox`;
	const emojis = await defaultFetcher<{ emojis: CustomEmojiMeta[] }>(url)
		.then(data => data.emojis)
		.catch(e => {
			console.error(e);
			return null;
		});

	return emojis ?? [];
};

export const WithCustomEmojis: Story = {
	args: {
		onEmojiSelect: console.log,
		customEmojisMeta: await getCustomEmojis(),
	},
};
