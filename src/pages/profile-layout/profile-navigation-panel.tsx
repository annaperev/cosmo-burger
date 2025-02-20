import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';

export const ProfileNavigationPanel: FC = () => {
	return (
		<div className={`${styles.navigation_panel} text text_type_main-medium `}>
			<NavLink
				to={'/profile/profile'}
				className={({ isActive }) =>
					isActive ? 'text_color_primary' : 'text_color_inactive'
				}>
				Профиль
			</NavLink>
			<NavLink
				to={'/profile/orders'}
				className={({ isActive }) =>
					isActive ? 'text_color_primary' : 'text_color_inactive'
				}>
				История заказов
			</NavLink>
			<span className='text_color_inactive'>Выход</span>
			<span className='text text_type_main-small text_color_inactive mt-6'>
				В этом разделе вы можете изменить свои персональные данные{' '}
			</span>
		</div>
	);
};
