import { FC } from 'react';
import styles from './styles.module.scss';

const ErrorMessage: FC = () => {
	return (
		<div className={styles.errorMessage}>
			<h1>Error</h1>
			<p>There was an error while trying to load this screen</p>
		</div>
	);
};

export default ErrorMessage;
