import { defaultFetcher } from '#helpers/swrHelper';
import type { Meta, StoryObj } from '@storybook/react';
import { RichEditor } from '.';
import { EditorProps } from './editor';
import { CustomEmojiMeta } from './plugins/emojiAutocompletePlugin';

const meta: Meta<typeof RichEditor> = {
	title: 'Common/Rich Editor',
	component: RichEditor,
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RichEditor>;

const options: EditorProps['options'] = {
	mentionsPlugin: {
		onSearch(trigger, query) {
			console.log('MentionsPlugin.onSearch', { trigger, query });
			return new Promise(r => {
				switch (trigger) {
					case '@': {
						r(['aaaa-role', 'bbbb-role', 'cccc-role', 'dddd-role']);
						break;
					}

					case '#': {
						r(['aaaa-channel', 'bbbb-channel', 'cccc-channel', 'dddd-channel']);
						break;
					}

					case '{': {
						r(['aaaa-var', 'bbbb-var', 'cccc-var', 'dddd-var']);
						break;
					}

					default: {
						break;
					}
				}
			});
		},
		triggers: ['@', '#', '{'],
	},
	emojiAutocompletePlugin: {
		async fetchEmojis() {
			const url = `${process.env.API_URL}/api/modules/258788884777795584/sandbox`;
			const emojis = await defaultFetcher<{ emojis: CustomEmojiMeta[] }>(url)
				.then(data => data.emojis)
				.catch(e => {
					console.error(e);
					return null;
				});

			return emojis ?? [];
		},
	},
	toolbarPlugin: {
		customEmojisMeta: await (async () => {
			const url = `${process.env.API_URL}/api/modules/258788884777795584/sandbox`;
			const emojis = await defaultFetcher<{ emojis: CustomEmojiMeta[] }>(url)
				.then(data => data.emojis)
				.catch(e => {
					console.error(e);
					return null;
				});

			return emojis ?? [];
		})(),
	},
};

export const DefaultProps: Story = {
	args: {},
};

export const SingleLine: Story = {
	args: {
		options,
		debug: true,
	},
};

export const MultiLine: Story = {
	args: {
		options,
		debug: true,
	},
};

export const MultiLineWithToolbar: Story = {
	args: {
		options,
		debug: true,
	},
};
