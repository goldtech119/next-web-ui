export type UnsavedChangesAlertHook = (unsavedChanges: boolean) => void;

import { useTranslations } from 'next-intl';
import Router from 'next/router';
import { useEffect } from 'react';

export const useUnsavedChangesAlert: UnsavedChangesAlertHook = unsavedChanges => {
	const t = useTranslations();
	const message = t('commons.UnsavedChanges');

	useEffect(() => {
		const routeChangeStartHandler = () => {
			// eslint-disable-next-line no-restricted-globals
			if (unsavedChanges && !confirm(message)) {
				Router.events.emit('routeChangeError');
				void Router.replace(Router, Router.asPath, { shallow: true });
			}
		};

		const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
			// eslint-disable-next-line no-restricted-globals
			if (unsavedChanges && !confirm(message)) {
				e.preventDefault();
			}
		};

		window.addEventListener('beforeunload', beforeUnloadHandler);
		Router.events.on('routeChangeStart', routeChangeStartHandler);

		return () => {
			window.removeEventListener('beforeunload', beforeUnloadHandler);
			Router.events.off('routeChangeStart', routeChangeStartHandler);
		};
	}, [message, unsavedChanges]);
};
