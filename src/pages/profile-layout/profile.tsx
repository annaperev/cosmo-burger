import React, { FC } from 'react';
import styles from './profile.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserProfile } from '../../services/auth/thunk-auth';
import { getUser } from '../../services/selectors';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Profile: FC = () => {
	const user = useAppSelector(getUser);
	const dispatch = useAppDispatch();

	const [nameValue, setNameValue] = React.useState(user.name);
	const [emailValue, setEmailValue] = React.useState(user.email);
	const [passwordValue, setPassportValue] = React.useState('blablabla');

	const handleSaveClick = () => {
		dispatch(updateUserProfile(nameValue, emailValue));
	};

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
			<div className={styles.profile_buttons}>
				<Button htmlType='button' type='secondary' size='large'>
					Отмена
				</Button>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleSaveClick}>
					Сохранить
				</Button>
			</div>
		</div>
	);
};
