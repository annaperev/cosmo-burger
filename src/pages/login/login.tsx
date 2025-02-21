import styles from './login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { login } from '../../services/auth/thunk-auth';

export const Login = () => {
	const [passwordValue, setPassportValue] = React.useState('');
	const [emailValue, setEmailValue] = React.useState('');

	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(login(emailValue, passwordValue));
	};

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>Вход</span>
			<Input
				type={'text'}
				placeholder={'E-mail'}
				onChange={(e) => setEmailValue(e.target.value)}
				value={emailValue}
				extraClass={'mt-6'}
			/>
			<PasswordInput
				onChange={(e) => setPassportValue(e.target.value)}
				value={passwordValue}
				name={'password'}
				extraClass={'mt-6'}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				extraClass='mt-6'
				onClick={handleClick}>
				Войти
			</Button>
			<div className={'mt-20'} style={{ justifyItems: 'center' }}>
				<span
					className={'text text_type_main-default text_color_inactive mt-20'}>
					Вы — новый пользователь?
				</span>
				<Link to={'/register'}> Зарегистрироваться </Link>
				<div />
				<span
					className={'text text_type_main-default text_color_inactive mt-4'}>
					Забыли пароль?
				</span>
				<Link to={'/forgot-password'}> Восстановить пароль</Link>
			</div>
		</div>
	);
};
