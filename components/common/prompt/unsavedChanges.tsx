import { useUnsavedChangesAlert } from '#hooks/useUnsavedChangesAlert';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const UnsavedChangesPrompt: React.FC = () => {
	const { formState } = useFormContext();
	useUnsavedChangesAlert(formState.isDirty);
	return <></>;
};
