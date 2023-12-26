'use client';

import { ModuleSettingsWrapper } from '#components/pages/dashboard/moduleSettingsWrapper';
import { ReactNode } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

export default function ModuleAutoResponderLayout({ children }: { children: ReactNode }) {
	const methods = useForm();

	return (
		<ModuleSettingsWrapper moduleId='automessage'>
			<FormProvider {...methods}>
				{children}
			</FormProvider>
		</ModuleSettingsWrapper>
	);
}
