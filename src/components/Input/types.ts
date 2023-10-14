import { ComponentProps, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = ComponentProps<'input'> & {
	label?: string;
	errorMessage?: string;
	error?: boolean;
	icon?: ReactNode;
	register?: UseFormRegisterReturn;
};
