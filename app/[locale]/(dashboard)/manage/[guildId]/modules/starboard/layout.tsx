'use client';

import { TabProvider } from '#components/contexts/tabContext';
import { ModuleSettingsWrapper } from '#components/pages/dashboard/moduleSettingsWrapper';
import { ReactNode } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

export default function ModuleStarboardLayout({ children }: { children: ReactNode }) {
	const methods = useForm();

	return (
		<ModuleSettingsWrapper moduleId='starboard'>
			<FormProvider {...methods}>
				<TabProvider>{children}</TabProvider>
			</FormProvider>
		</ModuleSettingsWrapper>
	);
}
