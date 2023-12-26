import '#styles/globals.css';

import { AbstractIntlMessages } from 'next-intl';
import React from 'react';

import {
	GooglePublisherTag,
	GoogleTagManagerNoScript,
	GoogleTagManagerScript,
} from '#components/GoogleTagManager';
import { Providers } from '#components/contexts/Providers';
import { IbmPlexMonoFont, LexendFont } from 'misc/fonts';
import { notFound } from 'next/navigation';

export default async function RootLayout({
	children,
	params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
	let messages: AbstractIntlMessages = {};
	try {
		messages = (await import(`../../locales/${locale}/index.ts`)).default;
	} catch (error) {
		console.error(`Could not find target locale ${locale}`);
		console.error(error);
		notFound();
	}

	return (
		<html
			lang={locale}
			className={`${LexendFont.className} ${IbmPlexMonoFont.className}`}
		>
			<GoogleTagManagerScript />
			<GooglePublisherTag />
			<body>
				<Providers messages={messages} locale={locale}>
					{children}
				</Providers>
				<GoogleTagManagerNoScript />
			</body>
		</html>
	);
}
