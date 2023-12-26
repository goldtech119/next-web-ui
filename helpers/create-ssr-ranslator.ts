import { createTranslator } from 'next-intl';

export const createSsrTranslator = async (locale: string) => {
	const messages = (await import(`../locales/${locale}/index.ts`)).default as unknown as IntlMessages;
	return createTranslator({ locale, messages });
};
