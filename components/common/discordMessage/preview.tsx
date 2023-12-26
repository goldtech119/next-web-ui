import React from 'react';
import {
	DiscordMessage,
	DiscordMessages,
} from '@skyra/discord-components-react';
import { useTranslations } from 'next-intl';
import { DiscordPreviewContainer } from './container';

export interface DiscordMessagePreviewProps {}

export const DiscordMessagePreview: React.FC<
  DiscordMessagePreviewProps
> = () => {
	const t = useTranslations();

	return (
		<DiscordPreviewContainer title={t('commons.Preview')}>
			<DiscordMessages>
				<DiscordMessage>Dingus McKrangle</DiscordMessage>
			</DiscordMessages>
		</DiscordPreviewContainer>
	);
};
