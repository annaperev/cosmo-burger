import styles from './login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

export const Login = () => {
	const [passwordValue, setPassportValue] = React.useState('');
	const onChange = (e: any) => {
		setPassportValue(e.target.value);
	};

	const [value, setValue] = React.useState('');
	const inputRef = React.useRef(null);

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>Вход</span>
			<Input
				type={'text'}
				placeholder={'E-mail'}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				ref={inputRef}
				extraClass={'mt-6'}
			/>
			<PasswordInput
				onChange={onChange}
				value={passwordValue}
				name={'password'}
				extraClass={'mt-6'}
			/>
			<Button htmlType='button' type='primary' size='medium' extraClass='mt-6'>
				Войти
			</Button>
			<div className={'mt-20'} style={{ justifyItems: 'center' }}>
				<span
					className={'text text_type_main-default text_color_inactive mt-20'}>
					Вы — новый пользователь?
				</span>
				<a> Зарегистрироваться </a>
				<div />
				<span
					className={'text text_type_main-default text_color_inactive mt-4'}>
					Забыли пароль?
				</span>
				<a> Восстановить пароль</a>
			</div>
		</div>
	);
};
