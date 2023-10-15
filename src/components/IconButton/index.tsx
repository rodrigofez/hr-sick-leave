import clsx from 'clsx';
import styles from './styles.module.scss';
import { ComponentProps, FC } from 'react';

type IconButtonProps = ComponentProps<'button'> & {
	icon: React.ReactNode;
	notificationQuantity?: number;
	variant?: 'primary' | 'danger';
	size?: 'sm' | 'md';
};

const IconButton: FC<IconButtonProps> = ({
	icon,
	notificationQuantity,
	size = 'md',
	...props
}) => {
	return (
		<button
			className={clsx(styles.iconButton, {
				[styles.primary]: props.variant === 'primary',
				[styles.danger]: props.variant === 'danger',
				[styles.sm]: size === 'sm',
				[styles.md]: size === 'md',
			})}
			{...props}
		>
			{icon}
			{notificationQuantity && (
				<div className={styles.notificationBadge}>{notificationQuantity}</div>
			)}
		</button>
	);
};

export default IconButton;
