import { FC } from 'react';
import styles from './styles.module.scss';

const NotFound: FC = () => {
	return (
		<div className={styles.notFound}>
			<h1>404 - Not Found</h1>
			<p>The page you are looking for does not exist.</p>
		</div>
	);
};

export default NotFound;
