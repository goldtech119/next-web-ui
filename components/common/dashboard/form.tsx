import { Box, SxProps } from '@mui/material';
import React from 'react';
import { FieldValues, Form, FormProps, FormProvider, UseFormProps, useForm, useFormContext } from 'react-hook-form';

import { useTranslations } from 'next-intl';
import Button from '../button';
import { UnsavedChangesPrompt } from '../prompt/unsavedChanges';

export interface DashboardFormProps extends React.PropsWithChildren {
	formProps: FormProps<FieldValues>;
	formOptions: UseFormProps;
	buttonSx?: SxProps
}

export const DashboardForm: React.FC<DashboardFormProps> = ({ children, formProps, formOptions, buttonSx }) => {
	const methods = useForm(formOptions);

	return (
		<FormProvider {...methods}>
			<UnsavedChangesPrompt />
			<Form {...formProps}>
				<Box>{children}</Box>
				<Box sx={{ paddingTop: 4 }}>
					<FormFooter buttonSx={buttonSx} />
				</Box>
			</Form>
		</FormProvider>
	);
};

const FormFooter: React.FC<{buttonSx?: SxProps}> = ({ buttonSx }) => {
	const t = useTranslations();
	const {
		formState: { isSubmitting },
	} = useFormContext();

	return (
		<Button type='submit' disabled={isSubmitting} sx={{ paddingX: 6, paddingY: 1.5, ...buttonSx }}>
			{t('commons.Save')}
		</Button>
	);
};
