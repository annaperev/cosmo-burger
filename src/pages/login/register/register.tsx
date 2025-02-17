import styles from '../login.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link } from 'react-router-dom';

export const Register = () => {
	const [passwordValue, setPassportValue] = React.useState('');
	const onChange = (e: any) => {
		setPassportValue(e.target.value);
	};

	const [value, setValue] = React.useState('');
	const inputRef = React.useRef(null);

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>Регистрация</span>
			<Input
				type={'text'}
				placeholder={'Имя'}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				ref={inputRef}
				extraClass={'mt-6'}
			/>
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
