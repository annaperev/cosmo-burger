import React from 'react';
import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
	return (
		<header className={styles.navigation_panel}>
			<nav className={`${styles.left}`}>
				<NavLink to={'/'}>
					{({ isActive }) => (
						<div className={styles.icon_link}>
							<BurgerIcon type={isActive ? 'primary' : 'secondary'} />
							<p
								className={`text text_type_main-default ${
									isActive ? 'text_color_primary' : 'text_color_inactive'
								}`}>
								Конструктор
							</p>
						</div>
					)}
				</NavLink>
				<NavLink to={'/orders'}>
					{({ isActive }) => (
						<div className={styles.icon_link}>
							<ListIcon type={isActive ? 'primary' : 'secondary'} />
							<p
								className={`text text_type_main-default ${
									isActive ? 'text_color_primary' : 'text_color_inactive'
								}`}>
								Лента заказов
							</p>
						</div>
					)}
				</NavLink>
			</nav>
			<Logo className={styles.center} />
			<NavLink to={'/profile'}>
				{({ isActive }) => (
					<span className={`${styles.right} ${styles.icon_link}`}>
						<ProfileIcon type={isActive ? 'primary' : 'secondary'} />
						<p
							className={`text text_type_main-default ${
								isActive ? 'text_color_primary' : 'text_color_inactive'
							}`}>
							Личный кабинет
						</p>
					</span>
				)}
			</NavLink>
		</header>
	);
};

AppHeader.propTypes = {
	className: PropTypes.string.isRequired,
};
