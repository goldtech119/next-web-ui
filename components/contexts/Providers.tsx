'use client';

import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { SWRConfig } from 'swr';
import { useEffectOnce } from 'usehooks-ts';

import { ApiProvider } from './apiContext';

import { AuthProvider } from '#components/contexts/authContext';
import { ColorModeProvider } from '#components/contexts/colorModeContext';
import { FeatureFlagProvider } from '#components/contexts/featureFlagContext';
import { GuildProvider } from '#components/contexts/guildContext';
import { ThemeProvider } from '#components/contexts/themeContext';
import { ToastProvider } from '#components/contexts/toastContext';
import { globalSwrConfig } from '#helpers/swrHelper';

export function Providers({
	children,
	messages,
	locale,
}: {
	children: React.ReactNode;
	messages: AbstractIntlMessages;
	locale: string;
}) {
	const [loaded, setLoaded] = useState(false);

	useEffectOnce(() => {
		setLoaded(true);
	});

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<SWRConfig value={globalSwrConfig}>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ApiProvider>
						<AuthProvider>
							<FeatureFlagProvider>
								<ToastProvider>
									<GuildProvider>
										{loaded && (
											<ColorModeProvider>
												<ThemeProvider>{children}</ThemeProvider>
											</ColorModeProvider>
										)}
									</GuildProvider>
								</ToastProvider>
							</FeatureFlagProvider>
						</AuthProvider>
					</ApiProvider>
				</NextIntlClientProvider>
			</SWRConfig>
		</LocalizationProvider>
	);
}
