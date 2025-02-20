import React, { FC } from 'react';
import styles from './profile.module.css';
import {
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const Profile: FC = () => {
	const [nameValue, setNameValue] = React.useState('Марк');
	const [emailValue, setEmailValue] = React.useState('mark@stellar.burgers');
	const [passwordValue, setPassportValue] = React.useState('blablabla');

	return (
		<div className={styles.profile}>
			<Input
				placeholder={'Имя'}
				value={nameValue}
				onChange={(e) => setNameValue(e.target.value)}
				icon={'EditIcon'}
			/>
			<Input
				placeholder={'Логин'}
				value={emailValue}
				onChange={(e) => setEmailValue(e.target.value)}
				icon={'EditIcon'}
			/>
			<PasswordInput
				placeholder={'Пароль'}
				value={passwordValue}
				onChange={(e) => setPassportValue(e.target.value)}
				icon={'EditIcon'}
			/>
		</div>
	);
};
