import styles from '../login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../../utils/request-helper';

export const ResetPassword = () => {
	const [passwordValue, setPassportValue] = React.useState('');
	const onChange = (e: any) => {
		setPassportValue(e.target.value);
	};

	const [tokenValue, setTokenValue] = React.useState('');
	const inputRef = React.useRef(null);

	const handleClick = () => {
		const data = request('password-reset/reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password: passwordValue, token: tokenValue }),
		})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
		console.log(data);
	};

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>
				Восстановление пароля
			</span>
			<PasswordInput
				onChange={onChange}
				value={passwordValue}
				placeholder={'Введите новый пароль'}
				extraClass={'mt-6'}
			/>
			<Input
				type={'text'}
				placeholder={'Введите код из письма'}
				onChange={(e) => setTokenValue(e.target.value)}
				value={tokenValue}
				ref={inputRef}
				extraClass={'mt-6'}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				extraClass='mt-6'
				onClick={handleClick}>
				Сохранить
			</Button>
			<div className={'mt-20'} style={{ justifyItems: 'center' }}>
				<span
					className={'text text_type_main-default text_color_inactive mt-20'}>
					Вспомнили пароль?
				</span>
				<Link to={'/login'}> Войти</Link>
				<div />
			</div>
		</div>
	);
};
