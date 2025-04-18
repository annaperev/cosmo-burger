import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { AppDispatch, useAppDispatch } from '../../services/store';
import { logout } from '../../services/auth/thunk-auth';

export const ProfileNavigationPanel = () => {
	const dispatch: AppDispatch = useAppDispatch();
	const handleLogoutClick = () => {
		dispatch(logout());
	};

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
			<span
				className={`${styles.exit_button} text text_type_main-medium text_color_inactive`}
				onClick={handleLogoutClick}
				role='button'
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleLogoutClick();
					}
				}}>
				Выход
			</span>
			<span className='text text_type_main-small text_color_inactive mt-6'>
				В этом разделе вы можете изменить свои персональные данные{' '}
			</span>
		</div>
	);
};
