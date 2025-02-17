import React, { FC } from 'react';
import styles from './profile.module.css';
import {
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

export const Profile: FC = () => {
	const [nameValue, setNameValue] = React.useState('Марк');
	const [emailValue, setEmailValue] = React.useState('mark@stellar.burgers');
	const [passwordValue, setPassportValue] = React.useState('blablabla');

	return (
		<div className={`${styles.container} mt-20`}>
			<div className={`${styles.navigation_panel} text text_type_main-medium `}>
				<NavLink
					to={'/profile'}
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
			<div className={styles.profile}>
				<Input
					placeholder={'Имя'}
					value={nameValue}
					onChange={(e) => setNameValue(e.target.value)}
					icon={'EditIcon'}
				/>
				<Input
					placeholder={'Логин'}
					value={emailValue}
					onChange={(e) => setEmailValue(e.target.value)}
					icon={'EditIcon'}
				/>
				<PasswordInput
					placeholder={'Пароль'}
					value={passwordValue}
					onChange={(e) => setPassportValue(e.target.value)}
					icon={'EditIcon'}
				/>
			</div>
		</div>
	);
};
