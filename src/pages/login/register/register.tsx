import styles from '../login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';
import { requestWithRefresh, request } from '../../../utils/request-helper';

export const Register = () => {
	const [passwordValue, setPassportValue] = React.useState('');
	const onChange = (e: any) => {
		setPassportValue(e.target.value);
	};

	const [nameValue, setNameValue] = React.useState('');
	const [emailValue, setEmailValue] = React.useState('');
	const inputRef = React.useRef(null);

	const handleClick = () => {
		const data = requestWithRefresh('auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: emailValue,
				password: passwordValue,
				name: nameValue,
			}),
		})
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
		console.log(data);
	};

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>Регистрация</span>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => setNameValue(e.target.value)}
				value={nameValue}
				ref={inputRef}
				extraClass={'mt-6'}
			/>
			<Input
				type={'text'}
				placeholder={'E-mail'}
				onChange={(e) => setEmailValue(e.target.value)}
				value={emailValue}
				ref={inputRef}
				extraClass={'mt-6'}
			/>
			<PasswordInput
				onChange={onChange}
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
