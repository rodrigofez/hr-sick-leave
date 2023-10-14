import { ComponentProps, FC } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type ButtonProps = ComponentProps<'button'> & {
	variant?: 'primary' | 'danger';
	isLoading?: boolean;
};

const Button: FC<ButtonProps> = ({ isLoading, variant, ...props }) => {
	return (
		<button
			className={clsx(styles.button, {
				[styles.primary]: variant === 'primary',
				[styles.danger]: variant === 'danger',
			})}
			disabled={isLoading}
			{...props}
		>
			{props.children}
			{isLoading && <span className={styles.loader}></span>}
		</button>
	);
};

export default Button;
