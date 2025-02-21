import styles from '../login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../services/store';
import { registerUser } from '../../../services/auth/thunk-auth';

export const Register = () => {
	const [passwordValue, setPassportValue] = React.useState('');
	const [nameValue, setNameValue] = React.useState('');
	const [emailValue, setEmailValue] = React.useState('');

	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(registerUser(emailValue, passwordValue, nameValue));
	};

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>Регистрация</span>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => setNameValue(e.target.value)}
				value={nameValue}
				extraClass={'mt-6'}
			/>
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
				Зарегистрироваться
			</Button>
			<div className={'mt-20'} style={{ justifyItems: 'center' }}>
				<span
					className={'text text_type_main-default text_color_inactive mt-20'}>
					Уже зарегистрированы?
				</span>
				<Link to={'/login'}> Войти</Link>
				<div />
			</div>
		</div>
	);
};
