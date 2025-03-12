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
import { useForm } from '../../utils/hooks';

export const Login = () => {
	const [values, onChange] = useForm({ email: '', password: '' });
	const dispatch = useAppDispatch();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(login(values.email, values.password));
	};

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>Вход</span>
			<form onSubmit={handleSubmit}>
				<Input
					name='email'
					autoComplete='email'
					placeholder={'E-mail'}
					onChange={onChange}
					value={values.email}
					extraClass={'mt-6'}
				/>
				<PasswordInput
					onChange={onChange}
					value={values.password}
					name={'password'}
					extraClass={'mt-6'}
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mt-6'>
					Войти
				</Button>
			</form>
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
