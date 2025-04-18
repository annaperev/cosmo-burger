import styles from '../login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../../utils/request-helper';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../utils/hooks';

export const ResetPassword = () => {
	const [values, onChange] = useForm({ password: '', token: '' });
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = request('password-reset/reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password: values.password, token: values.token }),
		})
			.then((res) => {
				console.log(res);
				navigate('/login', {});
			})
			.catch((error) => console.log(error));
		console.log(data);
	};

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>
				Восстановление пароля
			</span>
			<form onSubmit={handleSubmit}>
				<PasswordInput
					name='password'
					autoComplete='new-password'
					onChange={onChange}
					value={values.password}
					placeholder={'Введите новый пароль'}
					extraClass={'mt-6'}
				/>
				<Input
					name='token'
					autoComplete='one-time-code'
					placeholder={'Введите код из письма'}
					onChange={onChange}
					value={values.token}
					extraClass={'mt-6'}
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mt-6'>
					Сохранить
				</Button>
			</form>
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
