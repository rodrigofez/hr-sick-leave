import Select, { StylesConfig } from 'react-select';

import styles from './styles.module.scss';
import { ComponentProps, FC } from 'react';
import { RefCallBack, UseFormRegisterReturn } from 'react-hook-form';

type SelectInputProps = ComponentProps<typeof Select> & {
	label?: string;
	errorMessage?: string;
	error?: boolean;
	register?: UseFormRegisterReturn;
	innerRef?: RefCallBack;
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

const SelectInput: FC<SelectInputProps> = ({
	innerRef,
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
				<Select
					name={register?.name}
					styles={stylesConfig}
					ref={innerRef}
					{...props}
				/>
			</div>
			{error && <div className={styles.errorMessage}>{errorMessage}</div>}
		</div>
	);
};

export default SelectInput;
