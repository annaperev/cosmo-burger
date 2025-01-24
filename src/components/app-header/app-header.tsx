import React from 'react';
import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const AppHeader = ({ className }: { className: string }) => {
	return (
		<header className={`${styles.navigation_panel} ${className}`}>
			<nav className={`${styles.left}`}>
				<div className={styles.icon_link}>
					<BurgerIcon type='primary' />
					<p>Конструктор</p>
				</div>
				<div className={styles.icon_link}>
					<ListIcon type='secondary' />
					<p className='text text_type_main-default text_color_inactive'>
						Лента заказов
					</p>
				</div>
			</nav>
			<Logo className={styles.center} />
			<span className={`${styles.right} ${styles.icon_link}`}>
				<ProfileIcon type='secondary' />
				<p className='text text_type_main-default text_color_inactive'>
					Личный кабинет
				</p>
			</span>
		</header>
	);
};

AppHeader.propTypes = {
	className: PropTypes.string.isRequired,
};
