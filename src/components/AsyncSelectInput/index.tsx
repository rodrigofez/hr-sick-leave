import { StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';

import styles from './styles.module.scss';
import { ComponentProps, FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type SelectInputProps = ComponentProps<typeof AsyncSelect> & {
	label?: string;
	errorMessage?: string;
	error?: boolean;
	register?: UseFormRegisterReturn;
};

const stylesConfig: StylesConfig = {
	control: (baseStyles) => ({
		...baseStyles,
		borderColor: 'var(--color-neutral-200)',
		backgroundColor: 'var(--color-neutral-50)',
		color: 'var(--color-neutral-contrast)',
	}),
	input: (baseStyles) => ({
		...baseStyles,
		color: 'var(--color-neutral-contrast)',
	}),
	placeholder: (baseStyles) => ({
		...baseStyles,
		color: 'var(--color-neutral-contrast)',
	}),
	valueContainer: (baseStyles) => ({
		...baseStyles,
		borderColor: 'var(--color-neutral-200)',
		backgroundColor: 'var(--color-neutral-50)',
		color: 'var(--color-neutral-contrast)',
	}),
	singleValue: (baseStyles) => ({
		...baseStyles,
		borderColor: 'var(--color-neutral-200)',
		backgroundColor: 'var(--color-neutral-50)',
		color: 'var(--color-neutral-contrast)',
	}),
	option: (baseStyles, { isSelected, isFocused, isDisabled }) => ({
		...baseStyles,
		backgroundColor: isDisabled
			? undefined
			: isSelected
			? 'var(--color-primary)'
			: isFocused
			? 'var(--color-neutral-100)'
			: undefined,
		color: isSelected
			? 'var(--color-primary-contrast)'
			: 'var(--color-neutral-contrast)',
		':active': {
			backgroundColor: 'var(--color-neutral-200)',
			color: 'var(--color-neutral-contrast)',
		},
	}),
	menu: (baseStyles) => ({
		...baseStyles,
		borderColor: 'var(--color-neutral-400)',
		backgroundColor: 'var(--color-neutral)',
		color: 'var(--color-neutral-contrast)',
	}),
};

const AsyncSelectInput: FC<SelectInputProps> = ({
	label,
	error,
	errorMessage,
	register,
	...props
}) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>{label}</label>
			<div className={styles.inputWrapper}>
				<AsyncSelect
					name={register?.name}
					styles={stylesConfig}
					ref={register?.ref}
					{...props}
				/>
			</div>
			{error && <div className={styles.errorMessage}>{errorMessage}</div>}
		</div>
	);
};

export default AsyncSelectInput;
