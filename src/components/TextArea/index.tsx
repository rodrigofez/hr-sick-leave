import { ComponentProps, FC } from 'react';

import styles from './styles.module.scss';
import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

type TextAreaProps = ComponentProps<'textarea'> & {
	label?: string;
	errorMessage?: string;
	error?: boolean;
	register: UseFormRegisterReturn;
};

const TextArea: FC<TextAreaProps> = ({
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
				<textarea
					className={clsx(styles.input, {
						[styles.inputError]: error,
					})}
					{...props}
					rows={20}
					{...register}
				/>
			</div>
			{error && <div className={styles.errorMessage}>{errorMessage}</div>}
		</div>
	);
};

export default TextArea;
