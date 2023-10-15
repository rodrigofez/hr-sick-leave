import clsx from 'clsx';
import { useState } from 'react';
import {
	Link,
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import IconButton from '../../components/IconButton';
import Popover from '../../components/Popover';
import styles from './styles.module.scss';

import {
	ArrowLeftIcon,
	BellIcon,
	DashboardIcon,
	ExitIcon,
	FilePlusIcon,
	HamburgerMenuIcon,
} from '@radix-ui/react-icons';

import Logo from '../../assets/HR.svg';
import { Role, useAuthStore } from '../../stores/authStore';
import Button from '../../components/Button';

const routes = [
	{
		path: '/',
		title: 'Dashboard',
		roles: [Role.HR_ESPECIALIST],
		icon: <DashboardIcon />,
	},
	{
		path: '/applications',
		title: 'Applications',
		roles: [Role.HR_ESPECIALIST, Role.Employee],
		icon: <FilePlusIcon />,
	},
];

const DashboardLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const { pathname } = useLocation();

	const navigate = useNavigate();

	const [accessToken, role, logOut] = useAuthStore((state) => [
		state.accessToken,
		state.role,
		state.logOut,
	]);

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const openMenu = () => {
		setMenuOpen(true);
	};

	const switchCollapsed = () => {
		setCollapsed((prev) => !prev);
	};

	const handleLogout = () => {
		logOut();
		navigate('/auth/login');
	};

	if (!accessToken) return <Navigate to="/auth/login" />;

	return (
		<div className={styles.container}>
			<div
				className={clsx(styles.sideMenuContainer, {
					[styles.sideMenuCollapsedContainer]: collapsed,
					[styles.sideMenuExpandedContainer]: !collapsed,
					[styles.sideMenuOpen]: menuOpen,
					[styles.sideMenuClosed]: !menuOpen,
				})}
			>
				<div className={styles.collapseButton} onClick={switchCollapsed}>
					<IconButton icon={<ArrowLeftIcon />} />
				</div>
				<div className={styles.logoContainer}>
					<img className={styles.logo} src={Logo} alt="logo" />
					{!collapsed && <h3 className={styles.logoText}>SICK LEAVE</h3>}
				</div>
				<div className={styles.menuItemContainer}>
					<div>
						{routes
							.filter((route) => role && route.roles.includes(role))
							.map((route) => (
								<Link
									key={route.path}
									onClick={closeMenu}
									to={route.path}
									className={clsx(styles.menuItem, {
										[styles.menuItemActive]: pathname === route.path,
									})}
								>
									{route.icon}
									<div className={styles.menuItemLabel}>{route.title}</div>
								</Link>
							))}
					</div>
					<div className={styles.footer}>
						<Button variant="danger" onClick={handleLogout}>
							<ExitIcon />
							<div className={styles.logoutLabel}>Logout</div>
						</Button>
					</div>
				</div>
			</div>
			{menuOpen && (
				<div
					onClick={closeMenu}
					className={clsx(styles.backdrop, {
						[styles.backdropOpen]: menuOpen,
						[styles.backdropClosed]: !menuOpen,
					})}
				></div>
			)}
			<div
				className={clsx(styles.contentContainer, {
					[styles.contentContainerCollapsed]: collapsed,
					[styles.contentContainerExpanded]: !collapsed,
				})}
			>
				<div className={styles.headerContainer}>
					<div className={styles.menuIcon}>
						<IconButton icon={<HamburgerMenuIcon />} onClick={openMenu} />
					</div>
					<h3> {routes.find((route) => route.path == pathname)?.title} </h3>
					<Popover content={<div>...</div>}>
						<IconButton icon={<BellIcon />} notificationQuantity={3} />
					</Popover>
				</div>
				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
