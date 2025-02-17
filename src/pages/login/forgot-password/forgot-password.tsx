import styles from '../login.module.css';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../../utils/request-helper';

export const ForgotPassword = () => {
	const [emailValue, setEmailValue] = React.useState('');
	const inputRef = React.useRef(null);
	const handleClick = () => {
		const data = request('password-reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: emailValue }),
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
			<Input
				type={'text'}
				placeholder={'Укажите e-mail'}
				onChange={(e) => setEmailValue(e.target.value)}
				value={emailValue}
				ref={inputRef}
				extraClass={'mt-6'}
			/>
			<Button
				htmlType='button'
				type='primary'
				size='medium'
				extraClass='mt-6'
				onClick={handleClick}>
				Восстановить
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
