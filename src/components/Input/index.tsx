import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { FC, useState } from 'react';
import styles from './styles.module.scss';

import { InputProps } from './types';

const Input: FC<InputProps> = ({
	label,
	errorMessage,
	error,
	icon,
	register,
	...props
}) => {
	const [reveal, setReveal] = useState(false);

	const isRevealed = reveal ? 'text' : 'password';

	return (
		<div className={styles.container}>
			{label && <label className={styles.label}>{label}</label>}
			<div className={styles.inputWrapper}>
				{icon && <div className={styles.leadIcon}>{icon}</div>}
				<input
					className={clsx(styles.input, {
						[styles.inputIcon]: !!icon,
						[styles.inputPassword]: props.type === 'password',
						[styles.inputError]: error,
					})}
					{...props}
					type={props.type === 'password' ? isRevealed : props.type}
					{...register}
				/>
				{props.type === 'password' && (
					<button
						type="button"
						className={styles.revealButton}
						onClick={() => setReveal((prev) => !prev)}
					>
						{reveal ? <EyeOpenIcon /> : <EyeNoneIcon />}
					</button>
				)}
			</div>
			{error && <div className={styles.errorMessage}>{errorMessage}</div>}
		</div>
	);
};

export default Input;
