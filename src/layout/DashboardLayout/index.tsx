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
	ExitIcon,
	FilePlusIcon,
	HamburgerMenuIcon,
	PersonIcon,
} from '@radix-ui/react-icons';

import { useQueryClient } from '@tanstack/react-query';
import Logo from '../../assets/HR.svg';
import Button from '../../components/Button';
import { Auth, Role, useAuthStore } from '../../stores/authStore';

const routes = [
	// {
	// 	path: '/',
	// 	title: 'Dashboard',
	// 	roles: [Role.HR_ESPECIALIST],
	// 	icon: <DashboardIcon />,
	// },
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

	const queryClient = useQueryClient();

	const navigate = useNavigate();

	const {
		accessToken,
		role,
		firstName,
		logOut,
		lastName,
		dui,
		email,
		startDate,
	} = useAuthStore((state) => state);

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
		queryClient.removeQueries();
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
					<Popover
						content={
							<UserCard
								firstName={firstName}
								lastName={lastName}
								role={role}
								email={email}
								startDate={startDate}
								dui={dui}
							/>
						}
					>
						<IconButton icon={<PersonIcon />} />
					</Popover>
				</div>
				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

const UserCard = ({
	firstName,
	lastName,
	role,
	email,
	startDate,
	dui,
}: Partial<Auth>) => {
	return (
		<div className={styles.userMenu}>
			<div className={styles.userMenuItem}>
				<div className={styles.userAvatar}>
					<PersonIcon />
				</div>
				<div className={styles.userMenuItemLabel}>
					{firstName} {lastName}
				</div>
			</div>
			<div className={styles.userMenuItemSubLabel}>
				{role?.replace('_', ' ')}
			</div>
			<div className={styles.userMenuItemSubLabel}>{email}</div>

			{startDate && (
				<div className={styles.userMenuItemSubLabel}>
					Since {new Date(startDate).toDateString()}
				</div>
			)}
			<div className={styles.userMenuItemSubLabel}>DUI: {dui}</div>
		</div>
	);
};

export default DashboardLayout;
