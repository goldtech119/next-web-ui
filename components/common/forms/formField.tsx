import { Box, SxProps, Theme, Typography } from '@mui/material';
import React, { JSXElementConstructor, ReactElement, ReactNode } from 'react';
import {
	RegisterOptions,
	UseFormRegisterReturn,
	useFormContext,
} from 'react-hook-form';
import { PremiumBadge } from '../badge/premium';

type ChildrenElement = ReactElement<any, string | JSXElementConstructor<any>>;

export interface FormFieldProps {
  label: string;
  name: string;
  children:
    | ChildrenElement
    | ((_props: { registerOptions: UseFormRegisterReturn }) => ChildrenElement);
  options?: RegisterOptions;
  dontRegister?: boolean;
  containerSx?: SxProps<Theme>;
  inputSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  isPremium?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
	children,
	label,
	name,
	options,
	dontRegister,
	containerSx,
	inputSx,
	labelSx,
	isPremium,
}) => {
	const { register } = useFormContext();

	const renderChildren = () => {
		if (dontRegister) {
			return children as ReactNode;
		}

		return typeof children === 'function'
			? children({ registerOptions: register(name, options) })
			: React.cloneElement(children, register(name, options));
	};

	return (
		<Box sx={containerSx}>
			<Typography
				fontSize={12}
				fontWeight={500}
				marginBottom={1}
				color='neutral.light'
				display='inline-block'
				sx={labelSx}
			>
				{label}
			</Typography>
			{options?.required && (
				<Typography color='error' marginLeft='0.5ch' display='inline-block'>
          *
				</Typography>
			)}
			{isPremium && (<PremiumBadge sx={{ ml: 2.5 }} />)}
			<Box sx={inputSx}>
				{renderChildren()}
			</Box>
		</Box>
	);
};
