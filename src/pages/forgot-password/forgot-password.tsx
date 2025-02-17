import styles from '../login/login.module.css';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

export const ForgotPassword = () => {
	const [value, setValue] = React.useState('');
	const inputRef = React.useRef(null);

	return (
		<div className={styles.container}>
			<span className={'text text_type_main-medium'}>
				Восстановление пароля
			</span>
			<Input
				type={'text'}
				placeholder={'Укажите e-mail'}
				onChange={(e) => setValue(e.target.value)}
				value={value}
				ref={inputRef}
				extraClass={'mt-6'}
			/>
			<Button htmlType='button' type='primary' size='medium' extraClass='mt-6'>
				Восстановить
			</Button>
			<div className={'mt-20'} style={{ justifyItems: 'center' }}>
				<span
					className={'text text_type_main-default text_color_inactive mt-20'}>
					Вспомнили пароль?
				</span>
				<a> Войти</a>
				<div />
			</div>
		</div>
	);
};
