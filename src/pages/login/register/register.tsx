import styles from '../login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch, useAppDispatch } from '../../../services/store';
import { registerUser } from '../../../services/auth/thunk-auth';
import { useForm } from '../../../utils/hooks';

export const Register = () => {
	const [values, onChange] = useForm({ email: '', name: '', password: '' });
	const dispatch: AppDispatch = useAppDispatch();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(registerUser(values.email, values.password, values.name));
	};

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>Регистрация</span>
			<form onSubmit={handleSubmit}>
				<Input
					name='name'
					autoComplete='name'
					placeholder={'Имя'}
					onChange={onChange}
					value={values.name}
					extraClass={'mt-6'}
				/>
				<Input
					name='email'
					autoComplete='email'
					placeholder={'E-mail'}
					onChange={onChange}
					value={values.email}
					extraClass={'mt-6'}
				/>
				<PasswordInput
					name='password'
					autoComplete={'new-password'}
					onChange={onChange}
					value={values.password}
					extraClass={'mt-6'}
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='medium'
					extraClass='mt-6'>
					Зарегистрироваться
				</Button>
			</form>
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
