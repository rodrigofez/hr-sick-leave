import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';

import Logo from '../../assets/HR.svg';

const AuthLayout = () => {
	return (
		<div className={styles.authLayout}>
			<div className={styles.content}>
				<Outlet />
			</div>
			<div className={styles.divider}>
				<div className={styles.logo}>
					<img src={Logo} alt="logo" />
					<h1>SICK LEAVE</h1>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
